---
name: nexus-investigator-feature-step-plan
description: 当 Investigator 需要产出复杂功能的步骤文档时读取。定义步骤拆分规则、每步输入输出、UI 最后一步约束。
---

# 技能：功能级步骤文档

## 适用时机
- 当功能满足以下任一情况时读取并产出步骤文档：
	- 涉及超过 3 个模块
	- 依赖链明确且存在先后顺序
	- 无法安全一次性实现
	- 同时包含接口/状态/UI 多层联动
	- 存在“逻辑先完成、UI 最后收口”的明显阶段关系
	- 一次性交给 `Generalist` 实现会导致范围过大或 review 风险过高

## 文档目标
把复杂功能拆成多个可独立推进、实现、评审、提交的步骤。

## 拆分规则
- 每一步都必须尽量做到：目标单一、边界清晰、可独立实现、可独立评审、可独立提交
- 每一步都必须写清：输入、输出、依赖、完成信号、风险、是否暴露新的外部接口或字段
- 若涉及 UI：UI 必须单独成为最后一步，明确 UI 步骤依赖哪些上游接口、字段、状态、错误/空状态语义，说明为什么不能提前做 UI

## 正文结构

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

## 合格标准
- `Nexus` 能据此按步创建 todo 和流程
- `Generalist` 能明确当前只实现哪一步
- `Reviewer` 知道每一步该验什么
- 每一步都具有明确完成信号
- UI 不会被错误提前
- 功能整体可按步骤闭环，而不是依赖最后一次大爆炸集成