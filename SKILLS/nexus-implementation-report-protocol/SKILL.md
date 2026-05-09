---
name: nexus-implementation-report-protocol
description: 定义 `.Nexus/3-implement/` 中实现情况文档的编写协议，确保每条功能或每步实现都有清晰、结构化、事实性的记录，方便 Reviewer 审查并与 fact 对照。
---

# 目标

`.Nexus/3-implement/` 中的实现情况文档不是流水账。

它的目标是：
- 让 `Reviewer` 无需重新推测实现意图
- 让 `Reviewer` 对照真实代码、方案与 fact 做审查
- 让 `Nexus` 能判断当前阶段是否可进入 review 或提交
- 让后续 agent 快速理解：
  - 改了什么
  - 为什么改
  - 新接口是什么
  - 新字段是什么
  - 大致流程如何变化
  - 哪些 fact 已同步

# 适用对象

- `Generalist`
- `UI_Coder`

# 一条功能 / 一步实现，只维护一个实现文档

规则：
- 初次实现时创建文档
- review 修复轮时更新原文档
- 不新建第二份实现文档
- 保持该文档成为当前功能 / 步骤的 canonical 实现记录

# 路径建议

- 功能实现：
  - `.Nexus/3-implement/[yymmdd]_[feature-slug].md`
- 步骤实现：
  - `.Nexus/3-implement/[yymmdd]_[feature-slug]_step-[n].md`
- UI 功能实现：
  - `.Nexus/3-implement/UI-[yymmdd]_[feature-slug].md`

# 生命周期

实现文档在 Reviewer PASS 后由 `Reviewer` 归档到：

- `.Nexus/3-implement/.old/`

实现者不得自行归档实现文档。

# 文档头

每份实现文档顶部必须包含：

<!-- NEXUS_HANDOFF
status: [PASS / BLOCKED]
artifact_path: [.Nexus/3-implement/...]
next_agent: [Reviewer / Nexus]
user_decision_required: [true / false]
blocker_type: [NONE / CONTRACT_GAP / SCOPE_GAP / IMPLEMENTATION_CONFLICT / FACT_SYNC_FAILED]
modified_files:
	- [path or none]
fact_files_updated:
	- [.Nexus/0-fact/... or none]
fact_sync_status: [PASS / BLOCKED / PENDING_REVIEW / SIMPLE_ACCEPTED]
reports_consumed:
	- [.Nexus/2-Scheme/...]
	- [.Nexus/0-fact/...]
	- [.Nexus/4-review/... or none]
acceptance_coverage: [FULL / PARTIAL]
manual_test_required: [true / false]
-->

# 通用正文结构

所有实现文档至少包含：

# Implementation Report: [Feature Summary]

## Contract Inputs

- Task ID
- Goal
- Scope
- Non-Goals
- Scheme Used
- Step Context {若适用}
- Review Fix Context {若适用}

## Fact Inputs

- 使用了哪些 `.Nexus/0-fact/`
- 哪些 fact 缺失
- 哪些部分补读了真实代码

## Fact Sync Output

- Updated Fact Files
- Fact Sync Status
- Review State Written
- Known Fact Limitations

## Files Modified

- `path` — 修改目的
- `path` — 修改目的

## New Interfaces

- Name
- Kind
- File
- Signature
- Purpose
- Inputs
- Outputs
- Notes

若无新增接口，写：

- None

## Changed Interfaces

- Name
- File
- Before
- After
- Breaking Change: Yes / No
- Consumer Impact

若无变更，写：

- None

## New External Fields

- Field Name
- Owner Type / Module
- Meaning
- Nullable: Yes / No
- Default / Fallback
- Consumer

若无新增字段，写：

- None

## Changed External Fields

- Field Name
- Owner Type / Module
- Before Meaning
- After Meaning
- Nullable Change
- Consumer Impact

若无变更，写：

- None

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
- 结果摘要

若未运行，必须说明：
- 为什么未运行
- 风险
- 建议 Reviewer 如何验证

## Divergence From Scheme

- None

或：

- Divergence
- Reason
- Risk
- Reviewer Focus

## Reviewer Focus

- 建议重点检查点
- 关键风险
- 需要特别对照的 fact

## Follow-up

- None

或后续事项。

# Review 修复轮扩展要求

若当前是修复轮，必须新增或更新：

## Review Fix Summary

- Review Report
- Issues Addressed
- Files Changed in Fix
- Fact Files Re-Synced
- Validation Re-Run
- Remaining Risks

不得创建新实现文档。

# UI 实现扩展要求

若实现者是 `UI_Coder` 或 `Generalist` UI fallback，需补充：

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

# 事实性要求

实现文档必须能回答：

- 改了哪些文件？
- 每个文件改什么？
- 新增了哪些对外接口？
- 改了哪些对外接口？
- 新增了哪些外部字段？
- 字段语义是否变化？
- 大致流程怎么变了？
- fact 更新了哪些？
- 验证做了什么？
- 与方案是否偏离？

若这些问题无法从文档中回答，视为实现文档不合格。