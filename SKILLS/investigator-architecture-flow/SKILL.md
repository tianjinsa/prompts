---
name: investigator-architecture-flow
description: Investigator 架构级方案流程。用于任务整体方向选择、多方案比较、推荐方案、用户决策点与功能拆分建议。
---

# 目标

该 skill 规范 `Investigator` 的架构级方案产出。

架构级方案负责：
- 任务整体方向选择
- 多方案比较
- 推荐方案
- 用户决策点
- 功能拆分建议
- 影响半径判断

# 输入要求

Nexus 应提供：
- Task ID
- Goal
- Current Stage
- Scope
- Non-Goals
- Relevant Fact Paths
- Relevant Nexus Artifacts
- Branch Context
- Need User Decision
- Reason

# 读取规则

必须：
1. 先读相关 `.Nexus/0-fact/`
2. fact 不足时，再读必要真实代码
3. 若需要外部资料，调用 `WebSearcher`
4. 不得跳过 fact 直接大范围扫描源码

# 研究原则

必须：
- 尽可能覆盖主要模块和调用链
- 从用户价值和产品一致性角度比较方案
- 不只从技术实现便利出发
- 主动补齐用户未明确但会影响方案质量的关键细节
- 只把真实产品偏好、范围取舍、breaking change 接受度交给用户
- 若只有一条可行方案，也说明其他路线为什么不成立

不得：
- 写实现代码
- 输出补丁
- 把猜测写成事实
- 把研究应解决的问题甩给用户

# 报告头格式

所有架构级方案顶部必须包含：

<!-- NEXUS_HANDOFF
status: [PASS / BLOCKED / NEEDS_USER_DECISION]
artifact_path: [report path]
next_agent: [Nexus / DocWriter / Investigator / UI_Investigator]
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
- Option B
  - Summary
  - Applicability
  - Main Change Scope
  - Pros
  - Cons
  - Risks
  - Complexity
  - User/Product Impact
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

# 合格标准

一份合格架构级方案必须满足：

- 用户读完能看懂有哪些路线可走
- 用户能理解为什么推荐其中一条
- 用户能明确自己到底要决定什么
- 下游能据此拆成功能级预研
- 不需要再回头追问大量基础背景
- 没有把本应由研究补齐的关键细节甩给用户

# 返回要求

必须返回：
- Status
- Report
- Type: Architecture Scheme
- Summary
- Decision Needed
- Need Step Plan
- UI Last-Step Required