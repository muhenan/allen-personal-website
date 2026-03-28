---
title: "一文讲透 github 12,000+星项目 xiaohongshu-mcp 核心设计思想"
date: "2025/10/27"
description: "有幸参与了 github 12,000+星项目 xiaohongshu-mcp 的开发，本文分MCP Server 设计和浏览器自动化技术两个大的部分，详细解读该项目的核心设计思想。"
---



💡

有幸参与了 github 12,000+星项目 xiaohongshu-mcp 的开发，本文分MCP Server 设计和浏览器自动化技术两个大的部分，详细解读该项目的核心设计思想。


github: [https://github.com/xpzouying/xiaohongshu-mcp](https://github.com/xpzouying/xiaohongshu-mcp)

# 📊 Go MCP Server 设计解析

---

## 1️⃣ 核心库使用

**MCP 官方 SDK：**

`github.com/modelcontextprotocol/go-sdk v0.7.0`

> MCP 官方提供的 Go 实现，支持完整协议。
> 

主要 API：

- `mcp.NewServer()` — 创建服务器实例
- `mcp.AddTool()` — 注册工具（类似 REST 的 endpoint）
- `mcp.NewStreamableHTTPHandler()` — HTTP 传输层

其他关键依赖：

- `gin-gonic/gin` — HTTP 框架（REST + HTTP 传输）
    - 这里提一句，如果只是单纯实现 MCP Server 项目可以完全不用 gin
- `go-rod/rod` — 浏览器自动化（Chromium 控制）
- `sirupsen/logrus` — 日志系统

---

## 2️⃣ MCP Server 设计架构

**核心初始化（mcp_server.go:80-96）：**

```go
server := mcp.NewServer(
    &mcp.Implementation{
        Name:    "xiaohongshu-mcp",
        Version: "2.0.0",
    },
    nil,
)
```

**工具注册：**

```go
mcp.AddTool(server,
    &mcp.Tool{
        Name:        "publish_content",
        Description: "发布小红书图文内容",
    },
    handler,
)
```

**HTTP 传输层（routes.go:27-36）：**

```go
mcpHandler := mcp.NewStreamableHTTPHandler(
    func(r *http.Request) *mcp.Server {
        return appServer.mcpServer
    },
    &mcp.StreamableHTTPOptions{
        JSONResponse: true,
    },
)
router.Any("/mcp", gin.WrapH(mcpHandler))
```

**错误恢复机制（mcp_server.go:98-128）：**

```go
func withPanicRecovery[T any](toolName string,
    handler func(...) (*mcp.CallToolResult, any, error)) {
    // defer recover() 捕获 panic
    // 返回格式化的错误响应
}
```

---

## 3️⃣ MCP vs REST API 对比

| 维度 | MCP | REST API |
| --- | --- | --- |
| 协议 | JSON-RPC over HTTP | HTTP/JSON |
| 端点 | 单一 `/mcp` | 多端点 `/api/v1/*` |
| 方法标识 | `tool_name` 参数 | HTTP Method + Path |
| 发现机制 | 工具列表查询 | 无标准（需文档） |

**请求示例：**

**MCP 方式：**

```bash
POST /mcp
Content-Type: application/json
{
  "jsonrpc": "2.0",
  "method": "tools/call",
  "params": {
    "name": "publish_content",
    "arguments": {
      "title": "标题",
      "content": "内容"
    }
  }
}
```

**REST 方式：**

```bash
POST /api/v1/publish
Content-Type: application/json
{
  "title": "标题",
  "content": "内容"
}
```

**实现对比：**

```go
// MCP 工具注册
mcp.AddTool(server,
    &mcp.Tool{Name: "publish_content", Description: "发布内容"},
    handler,
)

// REST 路由注册
api.POST("/publish", appServer.publishHandler)
```

---

### 💡 JSON-RPC、REST、RPC 的层级关系说明

在系统架构中，**JSON-RPC、REST、gRPC 等都属于同一层级——它们都是 API 通信协议（或称通信风格）**，用于定义“客户端与服务端如何交互”。这些协议之下是 **HTTP、WebSocket、TCP 等传输层**，负责“数据如何传输”；而在它们之上则是**业务逻辑层**，处理具体功能（如登录、下单、发帖等）。

与 REST 相比，**JSON-RPC 更偏向函数调用风格（Function-Oriented）**，而 REST 是资源导向（Resource-Oriented）。

- REST 通常使用 HTTP 动词（GET、POST、PUT...）表达动作。
- JSON-RPC 和 gRPC 则通过 `"method": "publish_content"` 这样的字段直接调用远程函数。

## 4️⃣ MCP 的核心优势

**① 工具发现 (Tool Discovery)**

自动暴露 11 个工具，无需文档：

```go
registerTools(server, appServer)
```

**② 类型安全**

编译期检查 + 自动验证：

```go
type PublishContentArgs struct {
    Title  string   `json:"title"`
    Images []string `json:"images"`
}
```

**③ 多模态内容支持**

```go
Content: []mcp.Content{
    &mcp.TextContent{Text: "结果"},
    &mcp.ImageContent{MIMEType: "image/png"},
}
```

**④ 统一错误处理**

```go
&CallToolResult{IsError: true}
```

---

## 5️⃣ 项目设计的巧妙之处

**双协议支持（routes.go:26-52）：**

```go
router.Any("/mcp", ...)  // MCP 协议
api.POST("/publish", ...) // REST API
```

两种协议共享同一业务逻辑层 `XiaohongshuService`。

**参数适配器（mcp_server.go:162-172）：**

```go
argsMap := map[string]interface{}{
    "title":  args.Title,
    "images": convertStringsToInterfaces(args.Images),
}
result := appServer.handlePublishContent(ctx, argsMap)
```

---

## 6️⃣ 数据流对比

**MCP 流程：**

```
客户端 → /mcp → StreamableHTTPHandler → MCP Server → Handler → XiaohongshuService → go-rod → 小红书网站
```

**REST 流程：**

```
客户端 → /api/v1/* → Gin 路由 → API Handler → XiaohongshuService → go-rod → 小红书网站
```

---

## ✅ 总结

这个项目展现了 MCP 作为 **AI 原生协议** 的设计理念：

1. 面向工具调用 — LLM 可自动发现调用
2. 强类型 Schema — 参数定义即文档
3. 多模态优先 — 支持文本/图片混合
4. 统一错误处理 — 标准化响应格式

**对比：**

- ✅ MCP 更适合 AI Agent（自动发现、类型安全）
- ✅ REST 更通用（Web 集成）

**结论：**

MCP 是 AI 时代对 REST 的补充，而非替代。

# 🤖 基于 Go-Rod 的小红书浏览器自动化技术深度解析

---

## 一、技术栈与架构选型

### 1.1 核心库：go-rod

**为什么选择 go-rod？**

`github.com/go-rod/rod v0.116.2`

**go-rod 的优势：**

- ✅ 纯 Go 实现 — 无需 Selenium / WebDriver 中间层
- ✅ 直接控制 Chromium — 基于 Chrome DevTools Protocol (CDP)
- ✅ 高性能 — 无 HTTP 往返延迟
- ✅ 类型安全 — Go 编译时检查
- ✅ 轻量级 — 比 Selenium 更轻

---

### 1.2 浏览器管理架构

```
headless_browser (自定义封装)
    ↓
go-rod (CDP 协议)
    ↓
Chromium / Chrome (浏览器内核)

```

---

## 二、浏览器生命周期管理

### 2.1 浏览器初始化流程（browser/browser.go:21-46）

```go
func NewBrowser(headless bool, options ...Option) *headless_browser.Browser {
    cfg := &browserConfig{}
    for _, opt := range options {
        opt(cfg)
    }

    opts := []headless_browser.Option{
        headless_browser.WithHeadless(headless),
    }

    if cfg.binPath != "" {
        opts = append(opts, headless_browser.WithChromeBinPath(cfg.binPath))
    }

    cookiePath := cookies.GetCookiesFilePath()
    cookieLoader := cookies.NewLoadCookie(cookiePath)

    if data, err := cookieLoader.LoadCookies(); err == nil {
        opts = append(opts, headless_browser.WithCookies(string(data)))
        logrus.Debugf("loaded cookies from file successfully")
    }

    return headless_browser.New(opts...)
}

```

**关键设计点：**

1. **Headless 模式控制**
    
    ```go
    var useHeadless = true
    func InitHeadless(h bool) { useHeadless = h }
    
    ```
    
    - `headless=true`：后台运行，无 UI
    - `headless=false`：可视化调试
2. **Cookie 持久化机制**
    
    ```go
    func GetCookiesFilePath() string {
        oldPath := filepath.Join(os.TempDir(), "cookies.json")
        if _, err := os.Stat(oldPath); err == nil {
            return oldPath
        }
        path := os.Getenv("COOKIES_PATH")
        if path == "" { path = "cookies.json" }
        return path
    }
    
    ```
    

---

### 2.2 Cookie 会话管理

**接口设计：**

```go
type Cookier interface {
    LoadCookies() ([]byte, error)
    SaveCookies(data []byte) error
}

```

**实现：**

```go
type localCookie struct { path string }

func (c *localCookie) LoadCookies() ([]byte, error) {
    return os.ReadFile(c.path)
}

func (c *localCookie) SaveCookies(data []byte) error {
    return os.WriteFile(c.path, data, 0644)
}

```

**意义：**

- 一次登录，长期使用
- 避免频繁扫码
- 模拟真实用户行为

---

## 三、登录流程的技术实现

### 3.1 登录状态检测（login.go:19-35）

```go
func (a *LoginAction) CheckLoginStatus(ctx context.Context) (bool, error) {
    pp := a.page.Context(ctx)
    pp.MustNavigate("https://www.xiaohongshu.com/explore").MustWaitLoad()
    time.Sleep(1 * time.Second)
    exists, _, err := pp.Has(`.main-container .user .link-wrapper .channel`)
    if err != nil || !exists {
        return false, errors.New("login status element not found")
    }
    return true, nil
}

```

**关键技术点：**

- DOM 元素检测
- CSS 选择器：`.main-container .user .link-wrapper .channel`
- 页面等待机制

---

### 3.2 二维码获取

```go
func (a *LoginAction) FetchQrcodeImage(ctx context.Context) (string, bool, error) {
    pp := a.page.Context(ctx)
    pp.MustNavigate("https://www.xiaohongshu.com/explore").MustWaitLoad()
    time.Sleep(2 * time.Second)

    if exists, _, _ := pp.Has(".main-container .user .link-wrapper .channel"); exists {
        return "", true, nil
    }

    src, err := pp.MustElement(".login-container .qrcode-img").Attribute("src")
    if err != nil || src == nil {
        return "", false, errors.New("qrcode src is empty")
    }
    return *src, false, nil
}

```

**亮点：**

- 自动触发登录弹窗
- 提取 `<img src="data:image/png;base64,...">`
- 已登录自动跳过

---

### 3.3 等待扫码完成

```go
func (a *LoginAction) WaitForLogin(ctx context.Context) bool {
    pp := a.page.Context(ctx)
    ticker := time.NewTicker(500 * time.Millisecond)
    defer ticker.Stop()
    for {
        select {
        case <-ctx.Done():
            return false
        case <-ticker.C:
            el, err := pp.Element(".main-container .user .link-wrapper .channel")
            if err == nil && el != nil {
                return true
            }
        }
    }
}

```

**设计要点：**

- 轮询检测 + Context 控制
- 非阻塞式结构

---

## 四、发布内容的 DOM 操作技术

### 4.1 发布流程

1. 导航到发布页
2. 切换 Tab
3. 上传图片
4. 填写标题和正文
5. 输入话题标签
6. 点击发布按钮

---

### 4.2 页面导航与 Tab 切换

```go
pp.MustNavigate(urlOfPublic).MustWaitIdle().MustWaitDOMStable()
mustClickPublishTab(page, "上传图文")

```

- `MustWaitIdle()` — 等待网络空闲
- `MustWaitDOMStable()` — 等待 DOM 稳定

---

### 4.3 遮挡检测黑科技

```go
func isElementBlocked(elem *rod.Element) (bool, error) {
    result, err := elem.Eval(`() => {
        const rect = this.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        const target = document.elementFromPoint(x, y);
        return !(target === this || this.contains(target));
    }`)
    return result.Value.Bool(), nil
}

```

**原理：**

- 获取元素中心坐标
- 判断最上层元素是否为自身

---

### 4.4 图片上传与验证

```go
uploadInput := page.MustElement(".upload-input")
uploadInput.MustSetFiles(validPaths...)
waitForUploadComplete(page, len(validPaths))

```

**亮点：**

- 批量上传
- 轮询检测上传状态
- 超时控制

---

### 4.5 富文本编辑器与标签输入

```go
titleElem.MustInput(title)
contentElem.MustInput(content)
inputTag(contentElem, "#旅行")

```

**标签输入策略：**

- 模拟真人打字 (`50ms/字符`)
- 使用官方联想下拉
- 随机延迟

---

## 五、数据提取技术

### 5.1 Feeds 列表提取

```go
result := page.MustEval(`() => {
    return JSON.stringify(window.__INITIAL_STATE__.feed.feeds);
}`).String()

```

- **核心：** 直接读取前端全局状态
- **优势：** 绕过 API，完整获取页面数据

---

### 5.2 详情页数据提取

```go
page.MustNavigate(makeFeedDetailURL(feedID, xsecToken))
page.MustWaitDOMStable()

```

**技巧：**

- 构造 URL：`/explore/<feedID>?xsec_token=...`
- 从 `window.__INITIAL_STATE__.note.noteDetailMap` 解析笔记数据

---

## 六、交互操作（点赞、收藏、评论）

### 6.1 点赞状态检测

```go
result := page.MustEval(`() => {
    return JSON.stringify(window.__INITIAL_STATE__.note.noteDetailMap);
}`).String()

```

解析出：

```go
Interacts: {
    Liked: true,
    Collected: false
}

```

---

### 6.2 点赞执行逻辑

- 幂等性：多次调用不重复操作
- 验证机制：执行点击后再读取状态
- 自动重试：失败后重试一次

---

### 6.3 评论发布

```go
elem.MustClick()
elem2.MustInput(content)
submitButton.MustClick()

```

4 步完成评论发布，简洁高效。

---

## 七、反爬虫对抗策略

### 7.1 使用真实浏览器

| 特征 | requests/httpx | go-rod |
| --- | --- | --- |
| User-Agent | 可伪造 | 真实 Chrome |
| JS 执行 | 不支持 | ✅ 完整支持 |
| 指纹识别 | 易被检测 | ✅ 一致性强 |

---

### 7.2 Cookie 持久化

```go
opts = append(opts, headless_browser.WithCookies(string(data)))
cookieLoader.SaveCookies(data)

```

保持会话连续性，减少登录触发风控。

---

### 7.3 人类行为模拟

```go
time.Sleep(50 * time.Millisecond)
page.Mouse.MustMoveTo(x, y).MustClick()

```

- 随机坐标点击
- 逐字符输入
- 延迟思考时间

---

### 7.4 使用官方 UI 流程

✅ 模拟 UI 操作

❌ 不直接调用后端 API

优势：

- 自动生成安全令牌
- 符合用户行为轨迹

---

### 7.5 智能等待机制

```go
page.MustWaitLoad()
page.MustWaitIdle()
page.MustWaitDOMStable()
element.MustWaitVisible()

```

基于真实状态判断，而非固定延迟。

---

### 7.6 错误恢复与重试

- 循环重试机制
- 遮挡检测与弹窗移除
- 超时退出控制

---

## 八、核心技术要点总结

### 8.1 go-rod 常用 API

| API | 功能 | 示例 |
| --- | --- | --- |
| `page.MustNavigate()` | 页面跳转 | 访问发布页 |
| `MustElement()` | 查找元素 | 定位输入框 |
| `MustEval()` | 执行 JS | 提取状态 |
| `MustSetFiles()` | 上传文件 | 上传图片 |
| `MustInput()` | 输入文本 | 标题/内容 |
| `MustClick()` | 点击 | 按钮操作 |

---

### 8.2 数据流转链路

```
请求 → 创建浏览器 → 加载 Cookie → 导航页面
→ 等待 DOM 稳定 → 执行操作 → 提取数据 → 解析 JSON
→ 返回结构化结果

```

---

### 8.3 关键设计模式

- **Action 模式**：每个操作独立封装
- **Context 控制**：统一超时与取消
- **幂等设计**：操作可重复调用
- **错误恢复**：自动重试

---

### 8.4 性能优化技巧

- 并发控制（Context 超时）
- 元素复用（缓存引用）
- 智能等待（DOM 稳定检测）
- 批量上传（一次多文件）

---

## 🎯 总结

本项目展示了 **工业级浏览器自动化的最佳实践：**

✅ **技术选型** — go-rod 提供高性能、类型安全控制

✅ **会话管理** — Cookie 持久化实现免登录

✅ **智能操作** — 遮挡检测、状态验证与自动重试

✅ **数据提取** — 利用 `window.__INITIAL_STATE__` 绕过 API 限制

✅ **反爬对抗** — 真实浏览器 + 行为模拟 + 官方 UI 流程

> 相比传统爬虫，浏览器自动化在现代反爬机制下具备压倒性优势，是自动化操作与数据交互的终极解决方案。
>