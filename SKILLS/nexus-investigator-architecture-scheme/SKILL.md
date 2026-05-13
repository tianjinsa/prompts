---
name: nexus-investigator-architecture-scheme
description: 当 Investigator 需要产出架构级方案时读取。定义架构方案的多方案比较、推荐逻辑、用户决策点与功能拆分建议。
---

# 技能：架构级方案研究

## 适用时机
- 当 Nexus 要求产出架构级方案时读取
- 当任务需要整体方向选择和功能拆分时使用

## 方案目标
为整个任务提供方向选择，覆盖完整调用链和主要模块，给出多方案比较和推荐。

## 方案要求
- 不写代码，但要明确：模块、依赖、边界、风险、影响半径
- 必须给出多个方案选项（若实际只有一条可行路线，必须说明为什么其他路线不成立）
- 每个方案都要写清：概述、适用前提、主要改动范围、优点、缺点、风险、复杂度、对用户体验和产品一致性的影响、对后续功能拆分的影响
- 必须给出推荐方案并写明推荐理由
- 必须以用户视角完善方案，而不是只从技术实现便利出发
- 必须主动补齐用户未明确但会影响方案质量的关键信息和细节
- 不得把本应由研究补齐的不确定性直接留给用户

## 方案必须明确的用户决策点
- 哪些选项必须由用户输入才能决定
- 不同选择会带来的后续影响

## 正文结构

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
	- User/Product Impact
- Option B（同上）
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

## 合格标准
- 用户读完能看懂有哪些路线可走
- 用户能理解为什么推荐其中一条
- 用户能明确自己到底要决定什么
- 下游能据此拆成功能级预研
- 不需要再回头追问大量基础背景
- 没有把本应由研究补齐的关键细节甩给用户