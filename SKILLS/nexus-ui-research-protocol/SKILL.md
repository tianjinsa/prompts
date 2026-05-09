---
name: nexus-ui-research-protocol
description: 定义 UI_Investigator 的 UI 功能预研与 UI 设计方案输出协议。
---

# 目标

该 skill 用于规范 `UI_Investigator` 的 UI 研究产物。

目标：
- 输出可被用户确认的 UI 方案
- 输出可被 `UI_Coder` 执行的视觉与状态契约
- 明确 UI 所依赖的上游逻辑接口
- 防止 UI 提前实现
- 防止 UI 方案发明业务字段或业务规则

# 产物类型

`UI_Investigator` 产出两类 UI 文档，均写入：

- `.Nexus/1-research/`

## 1. UI 功能预研

用于：
- 明确当前 UI 问题
- 明确 UI 所需上游依赖
- 帮用户理解 UI 方向取舍
- 判断是否可进入 UI 设计方案

## 2. UI 设计方案

用于：
- 明确目标组件或页面范围
- 形成供用户确认的 UI canonical 方案
- 供 `DocWriter` 落盘到 `.Nexus/2-Scheme/`
- 供 `UI_Coder` 实施

# 报告头格式

所有 UI 研究文档顶部必须包含：

<!-- NEXUS_HANDOFF
status: [PASS / BLOCKED / NEEDS_USER_DECISION]
artifact_path: [.Nexus/1-research/...]
next_agent: [Nexus / DocWriter / UI_Coder]
user_decision_required: [true / false]
blocker_type: [NONE / FACT_GAP / CONTRACT_GAP / SCOPE_GAP / TOOL_FAILURE]
modified_files:
	- none
reports_consumed:
	- [.Nexus/0-fact/... or none]
	- [.Nexus/2-Scheme/... or none]
acceptance_coverage: [PARTIAL / N/A]
manual_test_required: false
-->

# UI 功能预研正文模板

- Title
- Research Type: UI Feature Pre-Research
- Fact Sources
- Upstream Scheme Inputs
- Current UI State
- Visual Problems
- Required Logic Inputs
  - Fields
  - States
  - Callbacks
  - Error Semantics
  - Loading Semantics
  - Empty Semantics
  - Disabled Semantics
- Candidate UI Directions
- Recommended Direction
- Risks
- User Decision Points
- Why UI Must Be Last Step
- Can Proceed To UI Design Scheme: Yes / No

# UI 设计方案正文模板

- Title
- Research Type: UI Design Scheme
- Fact Sources
- Upstream Logic Inputs Required
- Dependency Readiness
- Target Files / Components
- Visual Structure
- Layout Rules
- Component Split
- State Coverage
  - loading
  - empty
  - error
  - disabled
  - success
  - retry
  - null / undefined fallback
- Responsive Rules
- Accessibility Requirements
- Visual Acceptance Contract
- Legacy UI Cleanup Direction
- Stop Conditions for UI_Coder
- Manual Visual Review Expectations

# UI 依赖清单要求

必须明确：

- API 数据
- 状态字段
- 错误态
- loading 条件
- empty 条件
- disabled 条件
- callbacks
- 字段 nullable 语义
- fallback 策略

不得猜测。

若缺失：
- 返回 `BLOCKED`

# UI 必须最后一步

文档中必须说明：
- 当前是否已经到 UI 最后收口阶段
- 若尚未到，缺少哪些上游条件
- 为什么 UI 不能提前做

# 用户决策点

只有以下情况才交给用户：

- 多个视觉方向都合理
- 信息密度取舍
- 布局优先级取舍
- 是否接受视觉 breaking change
- 是否接受交互流程调整
- 品牌 / 风格偏好

不得把应由研究补齐的事实问题甩给用户。

# 完成门

只有满足以下条件，才能输出可交给 `UI_Coder` 的方案：

- 已明确 UI 所需上游字段
- 已明确 UI 所需状态与回调
- 已明确目标组件或页面范围
- 已明确状态覆盖
- 已明确响应式要求
- 已明确无障碍要求
- 已明确当前已经到 UI 最后一步
- 已明确 UI_Coder stop conditions

若任一缺失：
- 返回 `BLOCKED`
- 或 `NEEDS_USER_DECISION`