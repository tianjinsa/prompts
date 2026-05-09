---
name: nexus-investigator-research-protocol
description: 定义 Investigator 的架构级方案、功能级预研方案、复杂功能步骤文档的统一研究协议。
---

# 目标

该 skill 规范 `Investigator` 的研究产物。

覆盖：
- 架构级方案
- 功能级预研方案
- 功能级步骤文档
- 阻塞文档

不覆盖：
- UI 专项设计方案
- 实现代码
- 业务代码修改
- `.Nexus/0-fact/` 写入

# 文档总纲

## 架构级方案负责

- 任务整体方向选择
- 多方案比较
- 推荐方案
- 用户决策点
- 功能拆分建议

## 功能级预研方案负责

- 单个 feature 的边界、依赖、风险、外部接口 / 字段影响
- 是否需要 UI 模块
- 是否需要继续拆成步骤文档

## 功能级步骤文档负责

- 把复杂功能拆成可独立实现、评审、提交的顺序步骤
- 明确每一步输入、输出、完成信号、风险
- 若涉及 UI，UI 必须位于最后一步

# 通用研究原则

必须：
- 优先读取 `.Nexus/0-fact/`
- 必要时读取真实代码核对
- 明确事实、未知、受控假设
- 不写实现代码
- 不把猜测写成事实
- 不把研究应解决的问题甩给用户
- 只把真实产品偏好、范围取舍、breaking change 接受度交给用户

# 报告头格式

所有研究文档顶部必须包含：

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

# 架构级方案

用于整个任务级别的方向选择。

必须：
- 覆盖主要模块和调用链
- 给出多个方案选项
- 每个方案写清：
  - 方案概述
  - 适用前提
  - 主要改动范围
  - 优点
  - 缺点
  - 风险
  - 复杂度
  - 对用户体验和产品一致性的影响
  - 对后续功能拆分的影响
- 给出推荐方案
- 写明推荐理由
- 以用户视角完善方案
- 考虑用户决策点
- 若只有一条可行方案，也说明其他路线为什么不成立

输出到：
- `.Nexus/1-research/`

## 架构级方案正文模板

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

# 功能级预研方案

用于单个 feature。

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

若涉及 UI：
- 必须显式写 `Need UI Module: Yes`
- 必须列出 UI 所需字段、状态、回调、错误语义
- 必须明确 UI 应在最后一步

输出到：
- `.Nexus/1-research/`

## 功能级预研方案正文模板

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

# 功能级步骤文档

仅当功能明显过大、过复杂、依赖链明确时才写。

输出到：
- `.Nexus/2-Scheme/`

步骤文档必须把复杂功能拆成多个可独立推进的步骤。

每一步都必须尽量做到：
- 目标单一
- 边界清晰
- 可独立实现
- 可独立评审
- 可独立提交

## 何时必须产出步骤文档

满足以下任一情况时，应产出步骤文档：

- 涉及超过 3 个模块
- 依赖链明确且存在先后顺序
- 无法安全一次性实现
- 同时包含接口 / 状态 / UI 多层联动
- 存在“逻辑先完成、UI 最后收口”的明显阶段关系
- 一次性交给 `Generalist` 实现会导致范围过大或 review 风险过高

## 每一步必须写清

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

若功能涉及 UI：

- UI 必须单独成为最后一步
- 必须明确 UI 步骤依赖：
  - 哪些上游接口
  - 哪些字段
  - 哪些状态
  - 哪些错误 / 空状态语义
- 必须说明为什么不能提前做 UI

## 功能级步骤文档正文模板

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

# 成熟度标准

## 架构级方案合格标准

- 用户读完能看懂有哪些路线可走
- 用户能理解为什么推荐其中一条
- 用户能明确自己到底要决定什么
- 下游能据此拆成功能级预研
- 不需要再回头追问大量基础背景
- 没有把本应由研究补齐的关键细节甩给用户

## 功能级预研方案合格标准

- `Nexus` 能判断是否可直接进入实现
- `Nexus` 能判断是否必须拆步骤
- `Nexus` 能判断是否需要 UI 专项链路
- `Generalist` 不需要重新发明功能边界
- `Reviewer` 知道应重点审查什么
- 若涉及 UI，下游知道 UI 不应提前开工

## 功能级步骤文档合格标准

- `Nexus` 能据此按步创建 todo 和流程
- `Generalist` 能明确当前只实现哪一步
- `Reviewer` 知道每一步该验什么
- 每一步具有明确完成信号
- UI 不会被错误提前
- 功能整体可按步骤闭环，而不是依赖最后一次大爆炸集成