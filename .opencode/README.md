# OpenCode Agent 配置

本目录包含适用于 OpenCode 的 agent 配置文件。

## 快速开始

### 安装 OpenCode

```bash
# 使用 npm 安装
npm install -g opencode

# 或使用 homebrew (macOS)
brew install opencode
```

### 安装 Agent 与 Skill 文件

将 `agent/` 和 `skills/` 文件夹放到以下任一位置：

**全局安装（推荐）：**

```bash
# Windows
%USERPROFILE%\.opencode\   ← 放 skills/ 与 .opencode/agent 文件夹

# macOS / Linux
~/.opencode/
```

**项目级安装：**

```bash
# 在项目根目录下
.opencode/              ← 放 skills/ 与 .opencode/agent 文件夹
```

> 全局安装后所有项目都可使用 Nexus；项目级安装则只在该项目中生效。

### 配置模型（可选）

```bash
# 使用提供的示例配置
cp .opencode/opencode.json.example opencode.json
```

### 开始使用

```bash
# 在项目目录启动 OpenCode
opencode

# 调用 Nexus agent
@Nexus 帮我实现一个用户认证功能
```

## 目录结构

```
.opencode/
├── agent/
│   ├── Nexus.md          # 主编排器
│   ├── Generalist.md     # 通用实现者
│   ├── Investigator.md   # 研究者
│   ├── Reviewer.md       # 评审者
│   ├── DocWriter.md      # 文档编写者
│   ├── UI_Investigator.md # UI 研究者
│   ├── UI_Coder.md       # UI 实现者
│   └── WebSearcher.md    # Web 搜索专家
└── README.md             # 本文件
```

## Agent 说明

### Nexus (主编排器)
- **角色**: Master Orchestrator Agent
- **职责**: 分诊、委派、分支管理、todo 跟踪、计划维护、归档协调与最终交付
- **模式**: primary
- **特点**: 自身不研究源码、不读取业务代码、不修改业务代码

### Generalist (通用实现者)
- **角色**: 通用高质量多面手 agent
- **职责**: 根据已确认方案直接编写代码，负责非 UI 功能实现
- **模式**: subagent
- **特点**: 完成编码时同步 `.Nexus/0-fact/`

### Investigator (研究者)
- **角色**: 研究者
- **职责**: 研究当前情况，产出架构级方案、功能级预研方案、功能级方案步骤
- **模式**: subagent
- **特点**: 优先从 `.Nexus/0-fact` 获取事实

### Reviewer (评审者)
- **角色**: 独立 QA 守门人
- **职责**: 根据实现情况文档审查真实代码，可新增或修改自动化测试
- **模式**: subagent
- **特点**: 评审时必须校验 `.Nexus/0-fact` 与真实代码一致

### DocWriter (文档编写者)
- **角色**: 文档编写与管理者
- **职责**: 用户确认方案落盘、研究文档归档、doc/ 与 README.md 更新
- **模式**: subagent
- **特点**: 不负责写入 `.Nexus/0-fact/`

### UI_Investigator (UI 研究者)
- **角色**: UI/视觉层专项研究者
- **职责**: UI 功能研究、界面设计方案、布局结构、状态覆盖
- **模式**: subagent
- **特点**: 只研究呈现层，不实现业务逻辑

### UI_Coder (UI 实现者)
- **角色**: 高品质 UI 呈现层实现者
- **职责**: 布局、样式、视觉层次、响应式、交互反馈与无障碍呈现
- **模式**: subagent
- **特点**: 完成 UI 编码后必须同步 `.Nexus/0-fact/`

### WebSearcher (Web 搜索专家)
- **角色**: 唯一的 Web 搜索与信息检索专家
- **职责**: 系统中所有网络搜索都必须通过此 agent 执行
- **模式**: subagent
- **特点**: 负责过滤噪音、交叉验证并结构化返回高价值信息

## 使用方式

### 1. 直接使用 Markdown 文件

将 `.opencode/agent/` 目录放在项目根目录，OpenCode 会自动识别：

```bash
# 在 OpenCode 中调用
@Nexus 帮我实现一个用户认证功能
```

### 2. 使用配置文件（可选）

将 `opencode.json.example` 重命名为 `opencode.json`，并根据需要修改：

```bash
cp opencode.json.example opencode.json
```

### 3. 调用特定 Agent

```bash
# 调用主编排器
@Nexus 帮我实现一个用户认证功能

# 调用研究者
@Investigator 分析这个模块的架构

# 调用通用实现者
@Generalist 修复这个 bug
```

## 配置说明

每个 agent 文件包含：
- **YAML frontmatter**: 配置元数据
  - `description`: agent 描述
  - `mode`: primary/subagent/all
  - `model`: 使用的模型
  - `permission`: 工具权限配置
- **Markdown 内容**: agent 的系统提示和行为规范

## 注意事项

1. **权限配置**: 每个 agent 只拥有完成其职责所需的最小权限
2. **模型选择**: 根据任务复杂度选择合适的模型
3. **Skill Routing**: agent 会根据任务类型动态加载相关 skill
4. **终局返回**: 所有 agent 都必须返回明确的终局状态

## 相关文档

- [OpenCode 官方文档](https://opencode.ai/docs/)
- [OpenCode Agent 文档](https://opencode.ai/docs/agents/)
- [OpenCode 配置文档](https://opencode.ai/docs/config/)
- [从 GitHub Copilot 迁移到 OpenCode](MIGRATION.md)
- [配置示例](opencode.json.example)
- [Nexus 项目主页](https://github.com/tianjinsa/Nexus)
