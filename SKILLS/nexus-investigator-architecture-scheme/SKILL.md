---
name: nexus-investigator-architecture-scheme
description: 用于 `Investigator` 产出任务级架构方案。
---
# 适用场景
当 Nexus 契约中写明：
- `Requested Research Artifact: Architecture Scheme`
或当前阶段明确需要任务级方向选择时，读取本 skill。
---
# 目标
架构级方案负责：
- 任务整体方向选择
- 多方案比较
- 推荐方案
- 用户决策点
- 功能拆分建议
- 影响半径判断
- breaking change 风险判断
- UI 依赖识别
---
# 输出位置
输出到：
- `.Nexus/1-research/`
---
# 研究要求
## 1. 必须覆盖整体链路
尽可能覆盖：
- 入口点
- 核心模块
- 上下游依赖
- 数据流
- 状态流
- 错误传播
- 外部接口
- 外部字段
- 旧路径
- 可能重复实现
## 2. 必须给出多个方案
每个方案都要写清：
- 方案概述
- 适用前提
- 主要改动范围
- 优点
- 缺点
- 风险
- 复杂度
- 对用户体验和产品一致性的影响
- 对后续功能拆分的影响
若实际上只有一条可行方案，也必须说明：
- 为什么其他路线不成立
- 为什么不应采用
## 3. 必须给出推荐方案
推荐方案必须说明：
- 为什么推荐
- 为什么比其他方案更好
- 为什么对用户价值更好，而不只是实现更简单
- 是否默认不保留兼容层
- 需要用户接受哪些取舍
## 4. 必须明确用户决策点
只有真正需要用户输入的内容才交给用户。
必须写清：
- 哪些决策需要用户输入
- 为什么需要用户输入
- 每个选择的后续影响
- 是否涉及 breaking change
- 是否涉及产品体验口径
不得把本应由研究补齐的不确定性直接留给用户。
## 5. 必须提出功能拆分建议
需要给出：
- Feature Split Proposal
- 每个 feature 的目标
- 每个 feature 的依赖
- 每个 feature 是否涉及 UI
- 哪些 feature 需要功能级预研
- 哪些 feature 可能需要步骤文档
## 6. 若涉及 UI
必须写：
- UI Dependency Notes
- UI 是否应作为单独 feature
- UI 应在何时启动
- UI 所需上游接口、字段、状态、错误语义
- 为什么 UI 必须最后落地
---
# 正文模板
架构级方案正文至少包含：
- Title
- Research Type: Architecture Scheme
- Task Goal
- Scope / Non-Goals
- Fact Sources
- Code Sources Read，若有
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
- Option C，若有
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
---
# 合格标准
一份合格的架构级方案必须满足：
- 用户读完能看懂有哪些路线可走
- 用户能理解为什么推荐其中一条
- 用户能明确自己到底要决定什么
- 下游能据此拆成功能级预研
- 不需要再回头追问大量基础背景
- 没有把本应由研究补齐的关键细节甩给用户
- UI 不会被错误提前