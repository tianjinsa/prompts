---
name: nexus-investigator-feature-pre-research
description: 该 skill 定义了 Investigator 产出功能级预研方案时的正文结构、成熟度要求与判断标准。
---

## 何时使用

仅当契约要求：
- `Requested Research Artifact: Feature Pre-Research`

## 产物目标

功能级预研方案负责：
- 单个 feature 的边界、依赖、风险、外部接口 / 字段影响
- 是否需要 UI 模块
- 是否需要继续拆成步骤文档

输出到：
- `.Nexus/1-research/`

## 核心要求

- 必须明确：
	- 当前 feature 的目标行为
	- 当前 feature 的非目标范围
	- 它依赖谁
	- 它会影响谁
	- 是否可直接进入实现
	- 是否必须拆成步骤文档
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
	- 必须明确 UI 应在最后一步
- 若只有一条可行路线，也必须说明为什么其他路线不成立

## 功能级预研方案的合格标准

一份合格的功能级预研方案必须满足：
- `Nexus` 能判断是否可直接进入实现
- `Nexus` 能判断是否必须拆步骤
- `Nexus` 能判断是否需要 UI 专项链路
- `Generalist` 不需要重新发明功能边界
- `Reviewer` 知道应重点审查什么
- 若涉及 UI，下游知道 UI 不应提前开工

## 正文模板

### 功能级预研方案
正文至少包含：

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