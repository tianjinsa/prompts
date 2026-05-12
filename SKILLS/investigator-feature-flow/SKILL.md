---
name: investigator-feature-flow
description: Investigator 功能级预研流程。用于单个 feature 的边界、依赖、风险、接口字段影响、是否需要 UI、是否需要步骤拆分。
---

# 目标

该 skill 规范 `Investigator` 的功能级预研方案产出。

功能级预研方案负责：
- 单个 feature 的目标行为
- 边界和非目标
- 上下游依赖
- 风险和影响半径
- 外部接口 / 字段影响
- 是否需要 UI 模块
- 是否需要继续拆成步骤文档

# 输入要求

Nexus 应提供：
- Task ID
- Goal
- Current Stage
- Feature Scope
- Non-Goals
- Parent Architecture Scheme {若有}
- Relevant Fact Paths
- Relevant Scheme Paths
- Branch Context
- Reason

# 读取规则

必须：
1. 先读相关 `.Nexus/0-fact/`
2. 再读上游方案
3. fact 与方案不足时，再读必要真实代码
4. 若需要外部资料，调用 `WebSearcher`

# 研究原则

必须明确：
- 当前 feature 的目标行为
- 当前 feature 的非目标范围
- 它依赖谁
- 它会影响谁
- 是否可直接进入实现
- 是否必须拆成步骤文档
- 是否需要 UI 模块
- 外部接口 / 字段影响
- 是否存在旧路径清理
- 是否可能 breaking change

不得：
- 写实现代码
- 替 Generalist 设计具体代码结构
- 把未知字段语义写成事实
- 忽略 UI 依赖

# UI 处理

若涉及 UI：
- 必须显式写 `Need UI Module: Yes`
- 必须列出 UI 所需字段、状态、回调、错误语义
- 必须明确 UI 应在最后一步
- 不得让 UI 与逻辑混成同一步

# 报告头格式

所有功能级预研文档顶部必须包含：

<!-- NEXUS_HANDOFF
status: [PASS / BLOCKED / NEEDS_USER_DECISION]
artifact_path: [report path]
next_agent: [Nexus / DocWriter / Generalist / UI_Investigator]
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
- Research Type: Feature Pre-Research
- Feature Goal
- Scope / Non-Goals
- Fact Sources
- Code Sources Read {若有}
- Confirmed Facts
- Blocking Unknowns
- Controlled Assumptions
- Current State for This Feature
- Target Behavior
- Candidate Approaches
  - 若只有一条可行路线，也必须说明为什么其他路线不成立
- Recommended Feature Scheme
- Module / Dependency Map
- External Interface / Field Notes
  - New / Changed External Interfaces
  - New / Changed External Fields
  - Field Meaning / Nullable / Consumer
- Error / Edge Case Notes
- Legacy Cleanup Direction
- Impact Radius
- Breaking Change Assessment
- Need UI Module: Yes / No
- If Yes, Required UI Inputs
  - Fields
  - States
  - Callbacks
  - Error Semantics
- Need Step Plan: Yes / No
- Risks
- Suggested Next Step

# 何时建议拆步骤

满足以下任一情况时，应建议步骤文档：

- 涉及超过 3 个模块
- 依赖链明确且存在先后顺序
- 无法安全一次性实现
- 同时包含接口 / 状态 / UI 多层联动
- 存在“逻辑先完成、UI 最后收口”的明显阶段关系
- 一次性交给 `Generalist` 实现会导致范围过大或 review 风险过高

# 合格标准

一份合格功能级预研方案必须满足：

- `Nexus` 能判断是否可直接进入实现
- `Nexus` 能判断是否必须拆步骤
- `Nexus` 能判断是否需要 UI 专项链路
- `Generalist` 不需要重新发明功能边界
- `Reviewer` 知道应重点审查什么
- 若涉及 UI，下游知道 UI 不应提前开工

# 返回要求

必须返回：
- Status
- Report
- Type: Feature Pre-Research
- Summary
- Decision Needed
- Need Step Plan
- UI Last-Step Required