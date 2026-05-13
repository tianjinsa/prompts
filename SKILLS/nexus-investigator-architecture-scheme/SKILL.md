---
name: nexus-investigator-architecture-scheme
description: 该 skill 定义了 Investigator 产出架构级方案时的正文结构、成熟度要求与判断标准。
---

## 何时使用

仅当契约要求：
- `Requested Research Artifact: Architecture Scheme`

## 产物目标

架构级方案负责：
- 任务整体方向选择
- 多方案比较
- 推荐方案
- 用户决策点
- 功能拆分建议

输出到：
- `.Nexus/1-research/`

## 核心要求

- 必须给出多个方案选项
- 每个方案都要写清：
	- 方案概述
	- 适用前提
	- 主要改动范围
	- 优点
	- 缺点
	- 风险
	- 复杂度
	- 对用户体验和产品一致性的影响
	- 对后续功能拆分的影响
- 必须给出推荐方案
- 必须写明推荐理由
- 必须以用户视角完善方案，而不是只从技术实现便利出发
- 必须考虑用户决策点
- 必须主动补齐用户未明确但会影响方案质量的关键信息和细节
- 若实际上只有一条可行方案，也必须说明：
	- 为什么其他路线不成立
	- 为什么不应采用

## 架构级方案的合格标准

一份合格的架构级方案必须满足：
- 用户读完能看懂有哪些路线可走
- 用户能理解为什么推荐其中一条
- 用户能明确自己到底要决定什么
- 下游能据此拆成功能级预研
- 不需要再回头追问大量基础背景
- 没有把本应由研究补齐的关键细节甩给用户

## 正文模板

### 架构级方案
正文至少包含：

- Title
- Research Type: Architecture Scheme
- Task Goal
- Scope / Non-Goals
- Fact Sources
- Code Sources Read {若有}
- Contract Status
- Confirmed Facts
- Blocking Unknowns
- Controlled Assumptions
- Current System View
- Problem Statement
- Option A
	- Summary
	- Applicability
	- Main Change Scope
	- Pros
	- Cons
	- Risks
	- Complexity
	- User / Product Impact
- Option B
	- Summary
	- Applicability
	- Main Change Scope
	- Pros
	- Cons
	- Risks
	- Complexity
	- User / Product Impact
- Option C {若有}
- Option Comparison Summary
- Recommended Scheme
	- Why Recommended
	- Why Better Than Alternatives
	- Why Better For User Value, Not Just Easier To Implement
- User Decision Points
	- Which decisions require user input
	- Why user input is needed
	- Downstream impact of each choice
- Impact Radius
	- Directly Affected Modules
	- Indirectly Affected Modules
	- Breaking Change Possibility
- Feature Split Proposal
- UI Dependency Notes
- Risks & Constraints
- Suggested Next Step