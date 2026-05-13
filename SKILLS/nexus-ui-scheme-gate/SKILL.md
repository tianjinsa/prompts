---
name: nexus-ui-scheme-gate
description: 该 skill 定义了 UI 方案门禁协议，确保 UI 实现前有明确方案确认、上游逻辑完成、UI 位于最后一步，并防止无边界 UI fallback。
---
## 目标
该 skill 用于强制执行 UI 流程门禁，防止：
- `Nexus` 直接跳过 `UI_Investigator` 调用 `UI_Coder`
- `UI_Coder` 在没有确认 UI 方案时直接开工
- UI 在上游逻辑接口未完成时提前实现
- UI agent 失败后被无边界回退给 `Generalist`
- UI 实现后未经用户手动确认就提交
---
## 什么算 UI 任务
只要任务包含以下任一内容，就视为 UI 任务：
- 布局调整
- 样式调整
- 视觉层级调整
- 组件结构调整
- 交互呈现调整
- 响应式调整
- 无障碍呈现调整
- loading / empty / error / disabled 等视觉状态调整
- 表单呈现调整
- 页面结构调整
- 用户可见文案调整，且依赖 UI 呈现
- 任何用户可见的呈现层变化
---
## 核心门禁
### 规则 1：`UI_Coder` 绝不能是 first-hop UI agent
`UI_Coder` 的职责是实现已确认 UI 方案，不是发现 UI 方向。
只要任务命中 UI 条件，标准链路必须先经过 UI 研究或等价的已确认 UI 方案。
---
### 规则 2：所有正式 UI 实现前必须先有 UI 研究
标准链路必须是：
- `Investigator`，若是复杂功能，先把 UI 放到最后一步
- 上游逻辑 / API / 状态 / 字段完成
- `UI_Investigator`
- 用户确认 UI 方案
- `DocWriter` 将确认 UI 方案写入 `.Nexus/2-Scheme/`
- `UI_Coder`
---
### 规则 3：没有确认 UI 方案，不得调用 `UI_Coder`
`UI_Coder` 开工前必须同时满足：
- 存在 `.Nexus/2-Scheme/` 下的确认 UI 方案路径
- 该方案来自 `UI_Investigator` 或等价的用户已确认 UI 方案
- 用户已确认该方案
- 当前阶段确实已经轮到 UI 最后收口步骤
- UI 所依赖的上游逻辑接口已完成或已明确可用
- UI 所需字段、状态、回调、错误语义清晰
---
### 规则 4：UI 必须在最后一步
若功能有步骤拆分：
- UI 必须位于最后一步
- 在 UI 之前应先完成：
  - API 接口
  - 状态逻辑
  - 外部字段
  - 错误语义
  - 空状态语义
  - loading / empty / disabled 条件
- 若这些依赖未完成，UI 研究与实现都必须阻塞
---
## Nexus 的执行门
`Nexus` 每次调用 `UI_Coder` 前，必须逐项检查：
- 是否存在确认 UI 方案路径
- 是否来自 `UI_Investigator` 或等价的已确认 UI 方案
- 是否已被用户确认
- 是否已完成 UI 所需上游逻辑接口
- UI 字段、状态、回调、错误语义是否清晰
- 当前是否为最后一个 UI 收口步骤
若任一项无法明确回答“是”：
- 不得调用 `UI_Coder`
- 必须先调用 `UI_Investigator`
- 或等待上游逻辑完成
- 或请求用户决策
---
## UI_Investigator 的执行门
`UI_Investigator` 必须输出：
- UI 所需字段
- UI 所需状态
- UI 所需回调
- 目标页面 / 组件范围
- 状态覆盖
- 响应式规则
- 无障碍要求
- Visual Acceptance Contract
- Manual User Confirmation Points
- Stop Conditions for UI_Coder
- 当前是否已具备进入 `UI_Coder` 的条件
若上述任一项缺失：
- 不得给出看似完成但不可执行的 UI 方案
- 应返回 `BLOCKED` 或 `NEEDS_USER_DECISION`
---
## UI_Coder 的执行门
`UI_Coder` 仅在以下条件满足时可开工：
- 确认 UI 方案存在
- 上游逻辑接口已完成或已明确
- 方案中的组件 / 文件目标可映射到实际工程
- 当前 scope 足以完成必要的 UI 收口
- 不需要新增业务逻辑才能让 UI 工作
否则必须：
- 返回 `BLOCKED`
- 明确指出缺少什么
- 绝不允许沉默或自行发明方案
---
## Generalist UI Fallback
`Generalist` 只有在 Nexus 明确指定：
- `UI Fallback Mode: true`
时才允许接管 UI 实现。
### 情况 A：`UI_Coder` 失败 fallback
可以 fallback，但必须同时满足：
- 已存在确认后的 UI 方案
- UI 方案路径由 Nexus 提供
- 上游逻辑接口已完成
- 字段、状态、错误语义清晰
- 当前确实是 UI 最后收口阶段
- fallback scope 明确
若任一项不满足，`Generalist` 必须 `BLOCKED`。
---
### 情况 B：`UI_Investigator` 失败 fallback
不能无条件 fallback。
只有当已确认功能方案已经足够明确以下内容时，才可 fallback：
- UI 范围
- 目标组件 / 页面
- 依赖字段
- 依赖状态
- 回调
- 错误语义
- loading / empty / disabled 条件
- 视觉边界
- 用户手动确认点
若最小 UI 边界不存在：
- 不得让 `Generalist` 凭空设计 UI
- Nexus 应请求用户介入
- 或重试 UI 研究
- 或委派 `Investigator` 补齐最小 UI 边界后再判断
---
## Reviewer 的检查门
当评审 UI 改动时，`Reviewer` 必须额外检查：
- 是否存在对应确认 UI 方案文档
- 该方案是否来自 `UI_Investigator` 或等价已确认方案
- 当前 UI 实现是否发生在上游逻辑完成之后
- 是否存在字段 / 状态语义不清却强行实现的情况
- UI fact 是否准确记录状态、响应式、无障碍、旧 UI 清理
- 是否需要用户手动确认 UI
若缺失上述前置：
- 视为流程违规
- 至少记为 `MEDIUM`
- 若造成契约不清或运行风险，记为 `HIGH`
---
## UI 提交门
UI 实现不得在以下条件满足前提交：
- `Reviewer PASS`
- `Reviewer` 明确 `Manual UI Review Needed: Yes`
- `Nexus` 请求用户手动查看 UI
- 用户明确确认 UI 效果
- Nexus 将确认记录到 `.Nexus/plan.md`
若用户不满意：
- 不得提交
- 必须进入 UI 修复轮
- 修复后仍需重新 Review