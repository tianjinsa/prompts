# OpenCode Agent 配置总结

## 创建的文件

本目录包含适用于 OpenCode 的 agent 配置文件，已从 VS Code 格式迁移完成。

### 目录结构

```
.opencode/
├── agent/                    # Agent 配置目录
│   ├── Nexus.md              # 主编排器
│   ├── Generalist.md         # 通用实现者
│   ├── Investigator.md       # 研究者
│   ├── Reviewer.md           # 评审者
│   ├── DocWriter.md          # 文档编写者
│   ├── UI_Investigator.md    # UI 研究者
│   ├── UI_Coder.md           # UI 实现者
│   └── WebSearcher.md        # Web 搜索专家
├── README.md                 # 目录说明
├── MIGRATION.md              # 迁移指南
├── opencode.json.example     # 配置示例
├── SUMMARY.md                # 本文件
└── .gitignore                # Git 忽略配置
```

## Agent 清单

| Agent | 模式 | 模型 | 主要职责 |
|-------|------|------|----------|
| Nexus | primary | copilot/gpt-4o | 主编排器，负责分诊、委派、流程控制 |
| Generalist | subagent | oaicopilot/mimo-v2.5-pro | 通用实现者，负责非 UI 功能实现 |
| Investigator | subagent | oaicopilot/mimo-v2.5-pro | 研究者，负责架构方案和功能预研 |
| Reviewer | subagent | oaicopilot/mimo-v2.5-pro | 评审者，负责代码审查和测试验证 |
| DocWriter | subagent | oaicopilot/mimo-v2.5 | 文档编写者，负责方案落盘和文档更新 |
| UI_Investigator | subagent | copilot/gpt-4o | UI 研究者，负责 UI 设计方案 |
| UI_Coder | subagent | oaicopilot/mimo-v2.5 | UI 实现者，负责 UI 呈现层实现 |
| WebSearcher | subagent | oaicopilot/mimo-v2.5 | Web 搜索专家，负责信息检索 |

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

## 权限配置

每个 agent 都配置了最小权限：

- **Nexus**: 只能读写 `.Nexus/` 目录和配置文件
- **Generalist**: 可以读写代码文件和 `.Nexus/` 目录
- **Investigator**: 只能写入研究文档和方案目录
- **Reviewer**: 可以修改测试文件和评审文档
- **DocWriter**: 可以写入文档目录
- **UI_Investigator**: 只能写入研究文档
- **UI_Coder**: 可以修改 UI 文件和 `.Nexus/` 目录
- **WebSearcher**: 只能写入缓存目录

## 与 VS Code Agent 的差异

| 项目 | VS Code | OpenCode |
|------|---------|----------|
| 文件位置 | `agents/*.agent.md` | `.opencode/agent/*.md` |
| 调用方式 | `@agent-name` | `@agent-name` 或 `task` 工具 |
| 权限配置 | `tools` 字段 | `permission` 字段 |
| 模型配置 | 数组格式 | 单个模型字符串 |
| Agent 模式 | `user-invocable` | `mode` 字段 |

## 迁移说明

如需从 VS Code 迁移到 OpenCode，请参考：

- [MIGRATION.md](MIGRATION.md) - 详细迁移指南
- [opencode.json.example](opencode.json.example) - 配置文件示例

## 注意事项

1. **权限最小化**: 每个 agent 只拥有完成其职责所需的最小权限
2. **模型选择**: 根据任务复杂度选择合适的模型
3. **Skill 兼容性**: 原有的 skill 文件可以直接使用
4. **终局返回**: 保持原有的终局返回格式，便于追踪

## 相关资源

- [OpenCode 官方文档](https://opencode.ai/docs/)
- [OpenCode Agent 文档](https://opencode.ai/docs/agents/)
- [OpenCode 配置文档](https://opencode.ai/docs/config/)

## 更新日志

- 2026-05-13: 初始版本，从 VS Code agent 迁移到 OpenCode 格式
