---
name: nexus-implementation-report-protocol
description: 该 skill 定义了 `.Nexus/3-implement/` 中实现情况文档的编写协议，以确保每条功能 / 每步实现都有清晰、结构化、事实性的记录，方便 Reviewer 验证代码与 fact，并让后续文档流程快速消费。
---

## 目标

`.Nexus/3-implement/` 中的实现情况文档不是流水账。
它的目标是：
- 让 `Reviewer` 无需重新推测实现意图
- 让 `Reviewer` 能快速核对代码与 `.Nexus/0-fact/`
- 让后续 agent 快速理解：
	- 改了什么
	- 为什么改
	- 新接口是什么
	- 新字段是什么
	- 大致流程如何变化
	- 哪些 fact 已被同步

它也可为后续 `DocWriter` 更新 `doc/`、`README.md`、`CHANGELOG.md` 提供来源，但**不再承担“交给 DocWriter 更新 fact”的职责**。

## 适用对象

- `Generalist`
- `UI_Coder`

## 一条功能 / 一步实现，只维护一个实现文档

规则：
- 初次实现时创建文档
- review 修复轮时更新原文档
- 不新建第二份实现文档
- 保持该文档成为当前功能 / 步骤的 canonical 实现记录

## 路径建议

- 功能实现：
	- `.Nexus/3-implement/[yymmdd]_[feature-slug].md`
- 步骤实现：
	- `.Nexus/3-implement/[yymmdd]_[feature-slug]_step-[n].md`
- UI 功能实现：
	- `.Nexus/3-implement/UI-[yymmdd]_[feature-slug].md`

## 文档头

每份实现文档顶部必须包含：

<!-- NEXUS_HANDOFF
status: [PASS / BLOCKED]
artifact_path: [.Nexus/3-implement/...]
next_agent: [Reviewer / Nexus]
user_decision_required: [true / false]
blocker_type: [NONE / CONTRACT_GAP / SCOPE_GAP / IMPLEMENTATION_CONFLICT]
modified_files:
	- [path or none]
reports_consumed:
	- [.Nexus/2-Scheme/...]
	- [.Nexus/0-fact/...]
acceptance_coverage: [FULL / PARTIAL]
manual_test_required: false
fact_updated: [true / false]
fact_paths:
	- [.Nexus/0-fact/... or none]
fact_sync_scope: [FULL / PARTIAL / NONE]
ui_fallback_mode: [true / false]
manual_ui_review_required: [true / false]
-->

## 通用正文结构

所有实现文档至少包含：

# Implementation Report: [Feature Summary]

## Contract Inputs
- Task ID
- Goal
- Scope
- Scheme Used
- Step Context {若适用}
- UI Fallback Mode {true / false}

## Fact Inputs
- 使用了哪些 `.Nexus/0-fact/`
- 哪些部分补读了真实代码

## Files Modified
- `path` — 修改目的
- `path` — 修改目的

## Fact Sync
- Fact Updated: Yes / No
- Fact Paths
- Fact Sync Scope: FULL / PARTIAL / NONE
- Fact Summary
- Known Fact Gaps
- Why Any Gap Exists

## Fact Coverage Matrix
- Code File:
	- Changed: Yes / No
	- Fact File:
	- Fact Updated: Yes / No
	- Notes:

## New Interfaces
- Name
- Kind
- File
- Signature
- Purpose
- Inputs
- Outputs
- Notes

## New External Fields
- Field Name
- Owner Type / Module
- Meaning
- Nullable: Yes / No
- Default / Fallback
- Consumer

## Logic Summary
- 主流程
- 分支逻辑
- 错误路径
- 边界处理
- 删除 / 收口的旧路径

## Behavior Summary
- 最终功能行为
- 与旧行为相比的变化
- 是否可能是 breaking change

## Tests / Validation
- `command`
- `command`
- 结果摘要

## Divergence From Scheme
- None
- 或：
	- Divergence
	- Reason
	- Risk

## Reviewer Focus
- 建议重点检查点
- 建议重点核对的 fact

## Doc Impact
- None / Needed / User Requested / Unsure
- Suggested Doc Paths
- Notes

## CHANGELOG Candidate
- User-visible Change
- Internal-only Change
- Breaking Change: Yes / No
- Suggested Summary Line

## Follow-up
- None
- 或后续事项

## UI 实现的扩展要求

若实现者是 `UI_Coder`，或 `Generalist` 处于 `UI Fallback Mode`，需在通用结构基础上补充或替换为以下 UI 相关内容：

## Logic Interfaces Consumed
- Interface Name
- Kind {hook / props / callback / state / type / selector / adapter result}
- Source File
- Inputs Expected
- Outputs Consumed
- Notes

## External Fields Consumed
- Field Name
- Source Owner
- Meaning
- Nullable: Yes / No
- Empty / Null Fallback
- Used In

## UI Structure Summary
- 页面 / 组件层级
- 主要分区
- 合并 / 删除的旧区块
- 复用的基础组件

## Visual State Coverage
- loading:
- empty:
- error:
- disabled:
- success:
- retry:
- null / undefined fallback:

## Responsive & Accessibility
- small screen rules
- focus handling
- aria / semantic handling
- keyboard usage notes
- no layout shift strategy

## Legacy UI Cleanup
- 删除 / 合并了哪些旧组件、旧 props、旧样式入口
- 若仍保留，为什么

## Manual Visual Review Needed
- Yes
- Reason: UI changes require user visual confirmation after Reviewer PASS.

## 事实性要求

实现文档必须能回答：
- 改了哪些文件？
- 每个文件改什么？
- 更新了哪些 fact？
- 哪些代码文件尚未完成 fact 同步？
- 新增了哪些对外接口？
- 新增了哪些外部字段？
- 字段语义是否变化？
- 大致流程怎么变了？
- 验证做了什么？
- 与方案是否偏离？

若这些问题无法从文档中回答，视为实现文档不合格。