---
name: nexus-investigator-feature-step-plan
description: 用于 `Investigator` 产出复杂功能步骤文档。
---
# 适用场景
当 Nexus 契约中写明：
- `Requested Research Artifact: Feature Step Plan`
或功能级预研明确 `Need Step Plan: Yes` 时，读取本 skill。
---
# 目标
功能级步骤文档负责：
- 把复杂功能拆成可独立实现、评审、提交的顺序步骤
- 降低单次 Generalist / UI_Coder 实现范围
- 降低 Reviewer 审查复杂度
- 明确每一步的输入、输出、完成信号、风险
- 保证 UI 位于最后一步
---
# 输出位置
输出到：
- `.Nexus/2-Scheme/`
注意：
- 这是复杂功能步骤文档，允许由 `Investigator` 直接写入 `.Nexus/2-Scheme/`
- 不代表用户未确认的架构方案可以直接落盘
---
# 步骤拆分原则
每一步都必须尽量做到：
- 目标单一
- 边界清晰
- 可独立实现
- 可独立评审
- 可独立提交
- 不依赖未来步骤才能通过 Review
- 不把 UI 提前到逻辑前面
---
# 每一步必须写清
每一步至少包含：
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
---
# UI 步骤规则
若功能涉及 UI：
- UI 必须单独成为最后一步
- 必须明确 UI 步骤依赖：
  - 哪些上游接口
  - 哪些字段
  - 哪些状态
  - 哪些错误 / 空状态语义
  - 哪些 loading / empty / disabled 条件
- 必须说明为什么不能提前做 UI
- 必须说明何时可调用 `UI_Investigator`
- 必须说明何时可调用 `UI_Coder`
---
# 正文模板
功能级步骤文档正文至少包含：
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
---
# 独立提交判断
`Independent Commit: Yes` 的步骤必须满足：
- 本步完成后代码可运行
- 本步完成后测试可通过
- 本步完成后 fact 可被实现者同步
- 本步完成后 Reviewer 可独立验证
- 不需要后续步骤才能使当前改动保持一致
若不满足，必须写：
- `Independent Commit: No`
- 为什么不能独立提交
- 应与哪一步合并评审或提交
---
# 合格标准
一份合格的步骤文档必须满足：
- `Nexus` 能据此按步创建 todo 和流程
- `Generalist` 能明确当前只实现哪一步
- `UI_Coder` 不会被提前调用
- `Reviewer` 知道每一步该验什么
- 每一步都具有明确完成信号
- UI 不会被错误提前
- 功能整体可按步骤闭环，而不是依赖最后一次大爆炸集成