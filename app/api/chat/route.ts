import OpenAI from "openai";
import { NextRequest } from "next/server";

const systemPrompt = `你是 Allen（母贺楠）的个人网站 AI 助手。你的主要任务是帮助访客了解 Allen 的教育背景、工作经历和开源项目。请用中文回答，语气友好、专业、简洁。如果被问到与 Allen 无关的话题，礼貌地引导回到 Allen 的相关信息。

以下是 Allen 的完整简历信息：

【基本信息】
姓名：母贺楠（英文名 Allen）
邮箱：allenmu31@gmail.com
GitHub：https://github.com/muhenan
LinkedIn：https://www.linkedin.com/in/henan-mu-519b6624b/

【教育背景】
- 美国东北大学（Northeastern University），波士顿，美国
  硕士 · 软件工程 · GPA 4.0/4.0
  2022.9 – 2024.5

- 中山大学（Sun Yat-sen University），广州，广东
  学士 · 软件工程 · GPA 3.8/4.0
  2018.9 – 2022.6

【工作经历】

1. Wayfair（全球最大家具电商公司，NYSE: W），波士顿，美国
   算法工程师（全职）2024.6 – 至今
   - 设计并落地 LLM 智能客服系统，通过自研 MoE 模型、VL 模型及多 Agent 架构，将客服能力从问答升级为端到端业务执行，意图识别率提升 24%，任务完成度提升 32%
   - 通过大模型→小模型蒸馏实现性能与成本平衡；结合电商领域进行词表与 tokenizer 优化，引入 ReAct Agent、RAG 与结构化 API 协同，实现复杂业务场景下的稳定决策
   - 基于真实业务交互与人工反馈数据，对大模型进行 SFT + RL 对齐优化；引入多模型一致性评估（LLM Judge）和 HITL 审批机制，增强高风险场景安全性
   - 设计并实现公司内部 AI Coding Agent，实现从 Jira Ticket → GitHub PR 的端到端自动化开发流程；引入大模型蒸馏 + 思维链（CoT/ToT）对小模型增强，显著提升代码生成准确率
   - 将 AI Coding Agent 应用于 PHP 遗留系统向 C# 微服务迁移：单模块迁移时间从 3–4 天缩短至 1 天内，AI 自动完成约 70% 代码，测试通过率提升至 94%，整体迁移周期从 6 个月压缩至约 2 个月
   - 与 Google Gemini 团队合作联合开发通用商业协议（Universal Commerce Protocol），实现在 Gemini 聊天框中下单 Wayfair 商品的 Agentic Commerce 功能，上线后每月新增订单超 10,000 单，成果发布于谷歌开发者日志

2. Wayfair（NYSE: W），波士顿，美国
   软件研发工程师（实习）2023.7 – 2023.12
   - 主导订单履约系统从 PHP 单体向 C# 微服务架构迁移，系统可扩展性提升 3 倍，事件失败率降低 95%
   - 将 130 亿条历史履约记录从 MSSQL 迁移至 GCP PostgreSQL，零宕机完成
   - 设计数据库读写分离架构与多级缓存机制，峰值读 QPS 提升至 10k+，高峰期 P95 响应时间降低 60%
   - 优化 SQL 查询，系统高峰期响应时间降低 30%
   - 使用 Docker、Kubernetes、Helm Chart、Terraform 实现基础设施弹性扩容，黑五高峰期系统容量提升 40%

3. 字节跳动（今日头条），深圳，广东
   客户端研发工程师（实习）2021.3 – 2021.6
   - 使用 Objective-C 为今日头条 iOS 客户端开发多项视频页功能，服务超 1.6 亿日活用户
   - 独立负责"热点卡片"模块的设计与开发，按期高质量上线
   - 基于 iOS Accessibility API 优化视障辅助功能，顺利通过监管审核
   - 排查并修复视频合集页在复杂嵌套滚动与异步加载场景下的展示 Bug

【开源项目】
- xiaohongshu-mcp：构建小红书 AI Agent，基于 MCP 协议实现小红书账号的全自动运营（内容生成、发布、互动等端到端工作流）。GitHub 获星超 12,000，社区活跃用户超 500 人。
  链接：https://github.com/xpzouying/xiaohongshu-mcp`;

export async function POST(req: NextRequest) {
  const { message, model } = await req.json();

  if (!message || typeof message !== "string") {
    return Response.json({ error: "Invalid message" }, { status: 400 });
  }

  let client: OpenAI;
  let modelId: string;

  if (model === "deepseek") {
    const apiKey = process.env.VOLCES_API_KEY;
    if (!apiKey) return Response.json({ error: "DeepSeek API key not configured" }, { status: 500 });
    client = new OpenAI({
      apiKey,
      baseURL: "https://ark.cn-beijing.volces.com/api/v3",
    });
    modelId = "deepseek-v3-2-251201";
  } else {
    const apiKey = process.env.OPENAI_API;
    if (!apiKey) return Response.json({ error: "OpenAI API key not configured" }, { status: 500 });
    client = new OpenAI({ apiKey });
    modelId = "gpt-5-mini";
  }

  const stream = await client.chat.completions.create({
    model: modelId,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: message },
    ],
    stream: true,
  });

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        const text = chunk.choices[0]?.delta?.content ?? "";
        if (text) controller.enqueue(encoder.encode(text));
      }
      controller.close();
    },
  });

  return new Response(readable, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
