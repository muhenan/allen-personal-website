---
title: "ZeRO vs FSDP：大模型分布式训练的显存算账与通信拆解"
date: "2026-03-28"
description: "从 16N 显存公式出发，逐级拆解 ZeRO-1/2/3 的切分逻辑，再对比 PyTorch 原生 FSDP 在工程实现上的核心差异。"
---

## 1. 引言：传统 DP 的显存瓶颈与切分逻辑

在训练大模型时，单卡 OOM（Out of Memory）是常态。为了弄清楚如何切分模型，必须先明确训练时的显存究竟被什么占据。

假设训练一个参数量为 $N$ 的模型，采用混合精度训练（Mixed Precision，FP16/BF16），模型状态（Model States）的显存占用如下：

- **FP16 权重（Parameters）**：$2N$ bytes
- **FP16 梯度（Gradients）**：$2N$ bytes
- **Adam 优化器状态（Optimizer States）**：为了防止精度丢失，优化器需在 FP32 下更新。这包含 FP32 的主权重（Master Weights, $4N$）、一阶矩（Momentum, $4N$）和二阶矩（Variance, $4N$），共计 $12N$ bytes。

**总计**：仅维持模型状态的基础显存就需要 $16N$ bytes。对于 70B 模型，这高达 **1.12 TB**，远超单张 80G A100/H100 的容量。

传统的 Data Parallelism (DP) 要求每张卡保留完整的 $16N$ 状态，产生极大冗余。ZeRO 和 FSDP 的核心思路就是打破 DP 的限制，将这 $16N$ 的显存开销切片并分摊到集群的多个 GPU 上。

---

## 2. ZeRO 1/2/3：从优化器到权重的逐级切分

DeepSpeed 提出的 ZeRO（Zero Redundancy Optimizer）通过三个阶段逐步切分模型状态，核心在于显存与通信带宽的 Trade-off。

### ZeRO-1：切分优化器状态（Optimizer States Partitioning）

**机制**：权重和梯度依然每卡保留全量（各 $2N$），但将最占显存的 Adam 状态（$12N$）切成若干份。卡 $i$ 只负责更新属于自己的那一块权重。

**显存占用**：

$$2N + 2N + \frac{12N}{\text{GPUs}}$$

**通信逻辑**：反向传播（Backward）计算完全量梯度后，卡 $i$ 取出自己负责的梯度进行参数更新。更新完成后，触发一次 **AllGather** 操作，将所有卡更新后的局部权重广播，拼接成最新的完整权重。

---

### ZeRO-2：切分梯度（Gradient Partitioning）

**机制**：既然卡 $i$ 只负责更新特定部分的权重，它也就只需要保留该部分的梯度，无需存储全量梯度。

**显存占用**：

$$2N + \frac{2N}{\text{GPUs}} + \frac{12N}{\text{GPUs}}$$

**通信逻辑**：Backward 过程中，每计算出一层的梯度，立即执行一次 **ReduceScatter**。将属于卡 $i$ 的梯度归约并发送给卡 $i$，同时释放其他卡上的这部分梯度显存。

---

### ZeRO-3：切分权重（Parameter Partitioning）

**机制**：将 FP16 的权重也进行切分。每张卡平时只保留 $\frac{1}{\text{GPUs}}$ 的模型状态。

**显存占用**：

$$\frac{16N}{\text{GPUs}}$$

**通信逻辑**：

- **Forward 阶段**：计算某一层前，触发 AllGather 从其他卡拉取该层完整权重；计算完毕立即释放，只保留自己的切片。
- **Backward 阶段**：同样先触发 AllGather 拉取完整权重计算梯度；算完释放权重，并对计算出的梯度执行 ReduceScatter 归约给对应的卡。

---

## 3. FSDP：PyTorch 原生方案与系统调度差异

FSDP（Fully Sharded Data Parallel）是 PyTorch 原生的切分方案。宏观上，FSDP 的切分逻辑等价于 ZeRO-3（切分参数、梯度和优化器），但其在工程实现和系统调度上存在显著差异。

### 差异一：拦截层级（Tensor vs Module）

ZeRO-3 在底层的 **Tensor 级别**进行拦截和替换，动态分配显存。

FSDP 建立在 PyTorch 的 `nn.Module` 之上。它通过 `AutoWrapPolicy` 包装原生 Module，将一个 Module 内的参数打平为一维的 `FlatParameter`，并以此为单位进行 Sharding 和通信。

### 差异二：计算与通信的 Overlap

FSDP 能够深度利用 **CUDA Streams** 实现通信与计算的重叠（Overlap）。当 FSDP 计算第 $L$ 层前向传播时，可异步发起第 $L+1$ 层的 AllGather 通信。如果网络带宽充裕，通信耗时会被计算耗时完全掩盖，从而实现极高的 MFU（Model Flops Utilization）。

### 差异三：显存分配的确定性

ZeRO-3 运行时动态拉取和释放参数，在某些复杂网络拓扑下易引发显存碎片化。

FSDP 由于提前按 Module 定义了 Wrap 规则（如按 Transformer Block 包装），显存的分配和释放是**静态且可预测的**，降低了突发 OOM 的风险。

---

## 4. 总结：工业界的排障与选型

在千卡集群的实际训练中：

- 如果使用 **Megatron 体系**，或在构建包含大量高并发采样推理的复杂系统（如强化学习后训练），ZeRO 凭借极高的生态集成度是首选。
- 如果基于**纯 PyTorch** 构建代码库，且对网络切分粒度和计算/通信 Overlap 优化有极高的自定义需求，FSDP 往往能提供更好的调试体验和 MFU 表现。

无论选择哪种架构，集群训练的真正难点在于应对 RDMA 网络抖动导致的 AllGather/ReduceScatter 通信死锁（Deadlock）。如何通过 **Nsight Systems** 对 GPU 的 Timeline 进行精准的 Profile，才是检验底层分布式训练能力的最终标准。
