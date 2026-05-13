---
name: nexus-investigator-feature-pre-research
description: 用于 `Investigator` 产出功能级预研方案。
---
# 适用场景
当 Nexus 契约中写明：
- `Requested Research Artifact: Feature Pre-Research`
或当前阶段明确需要研究单个 feature 的边界、依赖、风险和实现可行性时，读取本 skill。
---
# 目标
功能级预研方案负责：
- 单个 feature 的目标行为
- 非目标范围
- 模块边界
- 上下游依赖
- 风险
- 外部接口 / 字段影响
- 是否需要旧路径清理
- 是否可能 breaking change
- 是否需要 UI 模块
- 是否需要继续拆成步骤文档
---
# 输出位置
输出到：
- `.Nexus/1-research/`
---
# 研究要求
## 1. 必须明确 feature 目标和边界
必须写清：
- 当前 feature 要解决什么
- 不解决什么
- 输入是什么
- 输出是什么
- 谁依赖它
- 它依赖谁
## 2. 必须主动补齐模块职责归属
包括：
- 哪些模块应该负责核心逻辑
- 哪些模块只是调用方
- 哪些旧路径应被清理
- 是否存在重复实现
- 是否需要统一入口
## 3. 必须明确外部接口和字段影响
必须写：
- New / Changed External Interfaces
- New / Changed External Fields
- Field Meaning
- Nullable
- Consumer
- Error Semantics
- Backward Compatibility Position
若默认不兼容旧路径，也要明确说明。
## 4. 必须评估边界和错误情况
包括：
- null / undefined
- 空集合
- 异步失败
- 外部调用失败
- 权限 / 状态不满足
- 幂等性
- 重试语义
- 数据不一致
## 5. 必须判断是否可以直接实现
必须明确：
- 是否可直接进入 Generalist 实现
- 是否必须拆成步骤文档
- 是否需要 UI 专项链路
- Reviewer 应重点审查什么
## 6. 若涉及 UI
必须显式写：
- `Need UI Module: Yes`
- UI 所需字段
- UI 所需状态
- UI 所需回调
- UI 错误语义
- loading / empty / disabled 条件
- UI 应在最后一步
- 是否需要 `UI_Investigator`
不得把 UI 混入逻辑实现步骤提前完成。
---
# 正文模板
功能级预研方案正文至少包含：
- Title
- Research Type: Feature Pre-Research
- Feature Goal
- Scope / Non-Goals
- Fact Sources
- Code Sources Read，若有
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
  - Loading / Empty / Disabled Conditions
- Need Step Plan: Yes / No
- Reviewer Focus
- Risks
- Suggested Next Step
---
# 何时必须建议步骤文档
满足以下任一情况时，应写：
- `Need Step Plan: Yes`
条件：
- 涉及超过 3 个模块
- 依赖链明确且存在先后顺序
- 无法安全一次性实现
- 同时包含接口 / 状态 / UI 多层联动
- 存在“逻辑先完成、UI 最后收口”的明显阶段关系
- 一次性交给 `Generalist` 实现会导致范围过大或 review 风险过高
---
# 合格标准
一份合格的功能级预研方案必须满足：
- `Nexus` 能判断是否可直接进入实现
- `Nexus` 能判断是否必须拆步骤
- `Nexus` 能判断是否需要 UI 专项链路
- `Generalist` 不需要重新发明功能边界
- `Reviewer` 知道应重点审查什么
- 若涉及 UI，下游知道 UI 不应提前开工