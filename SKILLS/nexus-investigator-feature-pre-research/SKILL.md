---
name: nexus-investigator-feature-pre-research
description: 当 Investigator 需要产出功能级预研方案时读取。定义功能边界、依赖、风险、外部接口/字段影响，以及是否需要 UI 模块和步骤文档。
---

# 技能：功能级预研方案

## 适用时机
- 当 Nexus 要求产出功能级预研方案时读取
- 当需要定义单个 feature 的边界、依赖、实施策略时使用

## 方案目标
聚焦单个 feature，明确边界、依赖、风险、外部接口/字段影响，判断是否可直接进入实现、是否需要拆成步骤文档、是否需要 UI 模块。

## 方案要求
- 不写代码，但要明确：模块、依赖、边界、风险、外部接口/字段影响、是否存在旧路径清理、是否可能 breaking change
- 必须主动补齐：模块职责归属、上下游依赖、外部字段语义、错误/边界情况、是否需要新增对外接口
- 若涉及 UI：必须显式写 `Need UI Module: Yes`，列出 UI 所需字段、状态、回调、错误语义，明确 UI 应在最后一步

## 正文结构

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

## 合格标准
- `Nexus` 能判断是否可直接进入实现
- `Nexus` 能判断是否必须拆步骤
- `Nexus` 能判断是否需要 UI 专项链路
- `Generalist` 不需要重新发明功能边界
- `Reviewer` 知道应重点审查什么
- 若涉及 UI，下游知道 UI 不应提前开工