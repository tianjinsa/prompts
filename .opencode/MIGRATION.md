# 从 GitHub Copilot Agent 迁移到 OpenCode Agent

本指南帮助你将现有的 GitHub Copilot agent 配置迁移到 OpenCode 格式。

## 快速开始

### 1. 安装 OpenCode

```bash
# 使用 npm 安装
npm install -g opencode

# 或使用 homebrew (macOS)
brew install opencode
```

### 2. 复制 Agent 与 Skill 文件

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

### 3. 配置模型（可选）

```bash
# 使用提供的示例配置
cp .opencode/opencode.json.example opencode.json

# 或手动创建
cat > opencode.json << EOF
{
  "agent": {
    "Nexus": {
      "description": "主编排器",
      "mode": "primary",
      "model": "copilot/gpt-4o"
    }
  }
}
EOF
```

### 4. 开始使用

```bash
# 启动 OpenCode
opencode

# 调用 Nexus
@Nexus 帮我实现一个用户认证功能
```

## 主要差异

### 1. 文件格式

| 项目 | GitHub Copilot | OpenCode |
|------|----------------|----------|
| 文件位置 | `agents/*.agent.md` | `.opencode/agent/*.md` |
| 文件扩展名 | `.agent.md` | `.md` |
| 配置格式 | YAML frontmatter | YAML frontmatter |
| 配置字段 | `name`, `description`, `tools`, `model` | `description`, `mode`, `model`, `permission` |

### 2. 配置字段映射

#### GitHub Copilot 字段 → OpenCode 字段

```yaml
# GitHub Copilot
---
name: Nexus
description: 主编排器
tools: [vscode/memory, vscode/newWorkspace, vscode/runCommand, vscode/askQuestions, vscode/toolSearch, execute, read, agent, edit, search, todo]
model: [mimo-v2.5-pro (oaicopilot), deepseek-v4-pro (oaicopilot)]
agents: [Investigator, Generalist, Reviewer, DocWriter, UI_Investigator, UI_Coder, WebSearcher]
---

# OpenCode
---
description: 主编排器
mode: primary
model: copilot/gpt-4o
permission:
  bash:
    "": ask
  write:
    .Nexus/**: allow
  edit:
    .Nexus/**: allow
---
```

### 3. 工具权限配置

#### GitHub Copilot 工具 → OpenCode 权限

| GitHub Copilot 工具 | OpenCode 权限 |
|---------------------|---------------|
| `vscode/runCommand` | `bash` |
| `execute` | `bash` |
| `read` | `read` (默认允许) |
| `edit` | `edit` |
| `search` | `search` (默认允许) |
| `agent` | 自动支持 |

#### 权限配置示例

```yaml
# GitHub Copilot
tools: [vscode/runCommand, execute, read, edit, search]

# OpenCode
permission:
  bash:
    "": ask  # 默认询问
  write:
    "**/*.ts": allow  # 允许写入 TypeScript 文件
  edit:
    "**/*.ts": allow  # 允许编辑 TypeScript 文件
```

### 4. Agent 模式

#### GitHub Copilot

GitHub Copilot 使用 `user-invocable` 和 `disable-model-invocation` 字段：

```yaml
user-invocable: false
disable-model-invocation: false
```

#### OpenCode

OpenCode 使用 `mode` 字段：

```yaml
mode: primary      # 主要 agent，可被用户直接调用
mode: subagent     # 子 agent，只能被其他 agent 调用
mode: all          # 两种模式都支持
```

### 5. 模型配置

#### GitHub Copilot

```yaml
model: [mimo-v2.5-pro (oaicopilot), deepseek-v4-pro (oaicopilot)]
```

#### OpenCode

```yaml
model: oaicopilot/mimo-v2.5-pro  # 单个模型
# 或
model: copilot/gpt-4o            # 使用 Copilot 模型
```

## 迁移步骤

### 步骤 1：创建目录结构

```bash
mkdir -p .opencode/agent
```

### 步骤 2：转换 Agent 文件

对于每个 VS Code agent 文件：

1. 复制文件到 `.opencode/agent/` 目录
2. 重命名：去掉 `.agent` 后缀
   - `Nexus.agent.md` → `Nexus.md`
   - `Generalist.agent.md` → `Generalist.md`
   - 等等

3. 更新 YAML frontmatter：
   - 移除 `name` 字段（OpenCode 使用文件名作为 agent 名称）
   - 移除 `user-invocable` 和 `disable-model-invocation` 字段
   - 添加 `mode` 字段
   - 更新 `model` 字段格式
   - 将 `tools` 转换为 `permission`

### 步骤 3：配置权限

根据 agent 的职责配置最小权限：

```yaml
permission:
  bash:
    "": ask  # 默认询问，或 "allow" / "deny"
  write:
    .Nexus/**: allow
    "**/*.ts": allow
  edit:
    .Nexus/**: allow
    "**/*.ts": allow
```

### 步骤 4：创建配置文件（可选）

如果需要全局配置，创建 `opencode.json`：

```json
{
  "agent": {
    "Nexus": {
      "description": "主编排器",
      "mode": "primary",
      "model": "copilot/gpt-4o"
    }
  }
}
```

## 完整迁移示例

### VS Code 版本 (Nexus.agent.md)

```yaml
---
name: Nexus
description: 主编排器。负责分诊、委派、分支管理、todo 跟踪、计划维护、归档协调与最终交付。
user-invocable: true
disable-model-invocation: true
tools: [vscode/memory, vscode/newWorkspace, vscode/runCommand, vscode/askQuestions, vscode/toolSearch, execute, read, agent, edit, search, todo]
agents: [Investigator, Generalist, Reviewer, DocWriter, UI_Investigator, UI_Coder, WebSearcher]
---

# 角色
...
```

### OpenCode 版本 (Nexus.md)

```yaml
---
description: 主编排器。负责分诊、委派、分支管理、todo 跟踪、计划维护、归档协调与最终交付。自身不研究源码、不读取业务代码、不修改业务代码。
mode: primary
model: copilot/gpt-4o
permission:
  bash:
    "": ask
  write:
    .Nexus/**: allow
    AGENTS.md: allow
    CLAUDE.md: allow
  edit:
    .Nexus/**: allow
    AGENTS.md: allow
    CLAUDE.md: allow
---

# 角色
...
```

## 常见问题

### Q: 如何调用子 agent？

**VS Code**: 使用 `@agent-name` 或通过 agent 字段声明

**OpenCode**: 使用 `task` 工具或 `@mention`

```markdown
# 在 OpenCode 中调用子 agent
请使用 Investigator 研究这个问题。
```

### Q: 如何配置工具权限？

**VS Code**: 在 `tools` 字段列出所有工具

**OpenCode**: 使用 `permission` 字段配置细粒度权限

```yaml
permission:
  bash:
    "git status": allow
    "npm test": allow
    "": ask  # 其他命令需要询问
```

### Q: 如何选择模型？

**VS Code**: 在 `model` 字段列出多个模型

**OpenCode**: 在 `model` 字段指定单个模型

```yaml
# 推荐模型选择
model: copilot/gpt-4o          # 复杂任务
model: oaicopilot/mimo-v2.5-pro # 一般任务
model: oaicopilot/mimo-v2.5     # 简单任务
```

### Q: 如何处理 Skill？

**GitHub Copilot**: 使用 `Skill Routing` 部分定义

**OpenCode**: 相同方式，agent 会在运行时动态加载

## 验证迁移

1. 启动 OpenCode
2. 使用 `@Nexus` 测试主 agent
3. 检查 agent 是否能正常调用子 agent
4. 验证权限配置是否正确
5. 测试完整工作流

## 故障排除

### 问题：Agent 无法调用

**症状**: 使用 `@Nexus` 没有反应

**解决方案**:
1. 检查 `.opencode/agent/` 目录是否存在
2. 检查 agent 文件是否有正确的 YAML frontmatter
3. 检查 `mode` 字段是否设置正确

### 问题：权限被拒绝

**症状**: Agent 执行命令时提示权限不足

**解决方案**:
1. 检查 `permission` 配置
2. 确保 `bash` 权限设置为 `ask` 或 `allow`
3. 检查文件路径模式是否匹配

### 问题：模型调用失败

**症状**: Agent 返回模型错误

**解决方案**:
1. 检查 `model` 字段格式是否正确
2. 确保模型名称与 OpenCode 支持的模型匹配
3. 尝试使用 `copilot/gpt-4o` 作为默认模型

## 注意事项

1. **权限最小化**: 只授予 agent 完成任务所需的最小权限
2. **模型选择**: 根据任务复杂度选择合适的模型
3. **Skill 兼容性**: 大部分 skill 可以直接使用，无需修改
4. **终局返回**: 保持原有的终局返回格式，便于追踪

## 相关资源

- [OpenCode 官方文档](https://opencode.ai/docs/)
- [OpenCode Agent 文档](https://opencode.ai/docs/agents/)
- [OpenCode 配置文档](https://opencode.ai/docs/config/)
- [OpenCode 多 Agent 设置](https://amirteymoori.com/opencode-multi-agent-setup-specialized-ai-coding-agents/)
- [Nexus 项目主页](https://github.com/tianjinsa/Nexus)
