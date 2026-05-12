---
name: investigator-step-plan-flow
description: Investigator 复杂功能步骤文档流程。用于把复杂功能拆成可独立实现、评审、提交的顺序步骤，UI 必须位于最后一步。
---

# 目标

该 skill 规范复杂功能步骤文档。

步骤文档负责：
- 把复杂功能拆成多个可独立推进的步骤
- 降低每次 Generalist / UI_Coder 的实现量
- 降低 Reviewer 风险
- 明确每一步输入、输出、完成信号、风险
- 若涉及 UI，强制 UI 最后一步

# 输入要求

Nexus 应提供：
- Task ID
- Goal
- Current Stage
- Parent Feature Scheme
- Feature Scope
- Non-Goals
- Relevant Fact Paths
- Relevant Scheme Paths
- Branch Context
- Reason

# 输出位置

步骤文档输出到：

- `.Nexus/2-Scheme/`

注意：
- 步骤文档虽由 Investigator 写入 `.Nexus/2-Scheme/`
- 但它必须基于已确认的功能方案
- 不得绕过用户确认生成新的功能方向

# 何时必须产出步骤文档

满足以下任一情况时，应产出步骤文档：

- 涉及超过 3 个模块
- 依赖链明确且存在先后顺序
- 无法安全一次性实现
- 同时包含接口 / 状态 / UI 多层联动
- 存在“逻辑先完成、UI 最后收口”的明显阶段关系
- 一次性交给 `Generalist` 实现会导致范围过大或 review 风险过高

# 拆分原则

每一步都必须尽量做到：
- 目标单一
- 边界清晰
- 可独立实现
- 可独立评审
- 可独立提交

不得：
- 把多个大功能混在一步
- 把 UI 放在逻辑前
- 留下“最后统一补齐”的模糊大尾巴
- 让某一步没有明确完成信号

# UI 步骤规则

若功能涉及 UI：

- UI 必须单独成为最后一步
- 必须明确 UI 步骤依赖：
  - 哪些上游接口
  - 哪些字段
  - 哪些状态
  - 哪些错误 / 空状态语义
- 必须说明为什么不能提前做 UI

# 报告头格式

步骤文档顶部必须包含：

<!-- NEXUS_HANDOFF
status: [PASS / BLOCKED / NEEDS_USER_DECISION]
artifact_path: [.Nexus/2-Scheme/...]
next_agent: [Nexus / Generalist / UI_Investigator]
user_decision_required: [true / false]
blocker_type: [NONE / FACT_GAP / SCOPE_GAP / CONTRACT_GAP / TOOL_FAILURE]
modified_files:
	- none
reports_consumed:
	- [fact/report path or none]
acceptance_coverage: [PARTIAL / N/A]
manual_test_required: false
-->

# 正文模板

- Title
- Research Type: Feature Step Plan
- Parent Feature Scheme
- Scope / Non-Goals
- Fact Sources
- Overall Step Strategy
- Step Order Rationale
- Step List
- For each Step:
  - Step ID / Step Name
  - Goal
  - Why This Step Exists
  - Modules
  - Depends On
  - Inputs Required
  - Outputs Produced
  - External Interface / Field Impact
  - Done Signal
  - Reviewer Focus
  - Risks
  - Independent Commit: Yes / No
  - Next Step Dependency
- UI Step Placement
- Regression Concerns
- Step Validation Notes
- Final Integration Notes

# 每一步必须写清

- Step ID / Step Name
- Step Goal
- Why This Step Exists
- Modules Involved
- Depends On
- Inputs Required
- Outputs Produced
- 是否会新增外部接口
- 是否会新增外部字段
- Done Signal
- Reviewer Focus
- Risks
- Can Commit Independently: Yes / No
- Next Step Dependency

# 合格标准

一份合格步骤文档必须满足：

- `Nexus` 能据此按步创建 todo 和流程
- `Generalist` 能明确当前只实现哪一步
- `Reviewer` 知道每一步该验什么
- 每一步具有明确完成信号
- UI 不会被错误提前
- 功能整体可按步骤闭环，而不是依赖最后一次大爆炸集成

# 返回要求

必须返回：
- Status
- Report
- Type: Feature Step Plan
- Summary
- Decision Needed
- Need Step Plan
- UI Last-Step Required