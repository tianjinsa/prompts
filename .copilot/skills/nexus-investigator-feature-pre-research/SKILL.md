---
name: nexus-investigator-feature-pre-research
description: 该 skill 定义了 Investigator 产出功能级预研方案时的正文结构、成熟度要求与判断标准。当功能复杂且必须分阶段落地时，步骤规划必须内嵌在同一份功能级预研文档中，不再单独产出 Feature Step Plan。
---

## 何时使用

仅当契约要求：
- `Requested Research Artifact: Feature Pre-Research`

## 产物目标

功能级预研方案负责：
- 单个 feature 的边界、依赖、风险、外部接口 / 字段影响
- 是否需要 UI 模块
- 是否可直接进入实现
- 是否必须按步骤推进
- 若必须按步骤推进，则在同一份文档中直接给出步骤规划

输出到：
- `.Nexus/1-research/`

## 核心要求

- 必须明确：
	- 当前 feature 的目标行为
	- 当前 feature 的非目标范围
	- 它依赖谁
	- 它会影响谁
	- 是否可直接进入实现
	- 是否必须按步骤推进
	- 是否需要 UI 模块
- 必须主动补齐：
	- 模块职责归属
	- 上下游依赖
	- 外部字段语义
	- 错误 / 边界情况
	- 是否需要新增对外接口
- 若涉及 UI：
	- 必须显式写 `Need UI Module: Yes`
	- 必须列出 UI 所需字段、状态、回调、错误语义
	- 若 `Need Step Plan: Yes`，必须明确 UI 应在最后一步
- 若只有一条可行路线，也必须说明为什么其他路线不成立
- 若满足复杂条件：
	- 不得只写 `Need Step Plan: Yes`
	- 必须在同一份预研文档内补齐完整步骤规划
	- 步骤必须按高内聚原则分组为不同 `Phase`

## 何时必须在预研文档中内嵌步骤规划

满足以下任一情况时，应在功能级预研正文中直接包含步骤规划，而不是再单独产出步骤文档：
- 涉及超过 3 个模块
- 依赖链明确且存在先后顺序
- 无法安全一次性实现
- 同时包含接口 / 状态 / UI 多层联动
- 存在“逻辑先完成、UI 最后收口”的明显阶段关系
- 一次性交给 `Generalist` 实现会导致范围过大或 review 风险过高

## 功能级预研方案的合格标准

一份合格的功能级预研方案必须满足：
- `Nexus` 能判断是否可直接进入实现
- `Nexus` 能判断是否必须按步骤推进
- 若必须按步骤推进，`Nexus` 能直接根据同一文档内的步骤规划创建 todo 和流程
- `Nexus` 能判断是否需要 UI 专项链路
- `Generalist` 不需要重新发明功能边界
- `Reviewer` 知道应重点审查什么
- 若涉及 UI，下游知道 UI 不应提前开工

## 内嵌步骤规划的合格标准

当 `Need Step Plan: Yes` 时，同一份功能级预研方案还必须满足：
- `Nexus` 能据此按步创建 todo 和流程
- `Generalist` 能明确当前只实现哪一步
- `Reviewer` 知道每一步该验什么
- 每一步都具有明确完成信号
- UI 不会被错误提前
- 功能整体可按步骤闭环，而不是依赖最后一次大爆炸集成

## 每一步必须写清的内容

当 `Need Step Plan: Yes` 时，每一步必须至少包含：
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

## UI 步骤规则

若功能涉及 UI 且 `Need Step Plan: Yes`：
- UI 必须单独成为最后一步
- 必须明确 UI 步骤依赖：
	- 哪些上游接口
	- 哪些字段
	- 哪些状态
	- 哪些错误 / 空状态语义
- 必须说明为什么不能提前做 UI

## 正文模板

### 功能级预研方案
正文至少包含：

- Title
- Research Type: Feature Pre-Research
- Parent Feature Scheme {若有}
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
- If Need Step Plan: Yes
	- Overall Step Strategy
	- Step Order Rationale
	- Phase List
	- For each Phase:
		- Phase ID / Phase Name
		- Phase Goal
		- Why This Phase Exists
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
- Risks
- Suggested Next Step