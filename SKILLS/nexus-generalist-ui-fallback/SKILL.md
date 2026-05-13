---
name: nexus-generalist-ui-fallback
description: 用于 `Generalist` 在 Nexus 明确指定 `UI Fallback Mode true` 时接管 UI 实现。
---
# 适用场景
仅当 Nexus 契约明确写明：
- `UI Fallback Mode: true`
才允许读取并使用本 skill。
---
# fallback 来源
## 1. UI_Coder 失败
可 fallback 的前提：
- 已有确认后的 UI scheme
- UI scheme 路径由 Nexus 提供
- 上游逻辑接口已完成
- 字段、状态、错误语义清晰
- 当前确实是 UI 最后收口阶段
## 2. UI_Investigator 失败
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
若以上不完整，必须返回 `BLOCKED`。
---
# 你仍不是 UI 研究者
UI fallback 不是让 Generalist 发明 UI 方案。
你不得：
- 发明视觉方向
- 发明业务字段
- 发明交互契约
- 改写用户已确认方案
- 把业务逻辑塞进 UI 组件
- 越过上游接口未完成的问题
---
# 必须读取的 skill
在 UI Fallback Mode 下必须同时遵守：
- `SKILL:nexus-ui-scheme-gate`
- `SKILL:design-ui`
- `SKILL:nexus-implementation-fact-sync-protocol`
- `SKILL:nexus-implementation-report-protocol`
---
# 实现要求
必须做到：
- 按已确认 UI scheme 或清晰功能方案实现
- 保持状态完整
- 保持响应式可读
- 保持无障碍安全
- 清理 scope 内旧 UI 兼容层
- 不新增业务规则
- 不发明字段映射
- 实现后同步 UI 相关 fact
- 实现报告写明 `Implementation Mode: UI Fallback`
---
# 必须阻塞的情况
出现以下任一情况必须 `BLOCKED`：
- 没有确认 UI scheme，且功能方案也不够清晰
- 上游接口未完成
- 字段语义不清
- 状态语义不清
- 错误语义不清
- 需要业务逻辑才能让 UI 工作
- 视觉目标需要用户选择
- scope 不足以清理旧 UI
- 无法同步 fact
---
# 实现报告额外要求
必须写：
- Fallback Source
- Confirmed UI Scheme Path，若有
- UI Boundary Completeness
- Upstream Logic Ready
- Target Components / Pages
- State Coverage
- Responsive Coverage
- Accessibility Coverage
- Fact Files Updated
- Manual Visual Review Required: Yes
---
# 后续流程
UI fallback 实现完成后仍必须：
1. Reviewer 审查
2. Reviewer PASS
3. Nexus 请求用户手动确认 UI
4. 用户确认后 Nexus 才能提交