---
name: nexus-investigator-feature-step-plan
description: 该 skill 定义了 Investigator 产出复杂功能步骤文档时的正文结构、成熟度要求与判断标准。
---

## 何时使用

仅当契约要求：
- `Requested Research Artifact: Feature Step Plan`

## 产物目标

功能级步骤文档负责：
- 把复杂功能拆成可独立实现、评审、提交的顺序步骤
- 明确每一步的输入、输出、完成信号、风险
- 若涉及 UI，UI 必须位于最后一步

输出到：
- `.Nexus/2-Scheme/`

## 何时必须产出步骤文档

满足以下任一情况时，应产出步骤文档，而不是只停留在功能级预研：
- 涉及超过 3 个模块
- 依赖链明确且存在先后顺序
- 无法安全一次性实现
- 同时包含接口 / 状态 / UI 多层联动
- 存在“逻辑先完成、UI 最后收口”的明显阶段关系
- 一次性交给 `Generalist` 实现会导致范围过大或 review 风险过高

## 功能级步骤文档的合格标准

一份合格的步骤文档必须满足：
- `Nexus` 能据此按步创建 todo 和流程
- `Generalist` 能明确当前只实现哪一步
- `Reviewer` 知道每一步该验什么
- 每一步都具有明确完成信号
- UI 不会被错误提前
- 功能整体可按步骤闭环，而不是依赖最后一次大爆炸集成

## 每一步必须写清的内容

当你写功能步骤文档时，每一步必须至少包含：
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

## 正文模板

### 功能级步骤文档
正文至少包含：

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