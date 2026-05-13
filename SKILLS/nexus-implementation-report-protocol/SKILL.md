---
name: nexus-implementation-report-protocol
description: 该 skill 定义了 .Nexus/3-implement/ 中实现情况文档的编写协议，新增 Fact Coverage Matrix、Doc Impact 和 CHANGELOG Notes 字段。
---

## 目标

`.Nexus/3-implement/` 中的实现情况文档目标是：
- 让 `Reviewer` 无需重新推测实现意图
- 让后续 agent 快速理解改了什么、为什么改、新增接口/字段、大致流程变化
- 提供 Fact Coverage Matrix 便于 Reviewer 验证 fact 一致性
- 提供 Doc Impact 和 CHANGELOG Notes 供后续文档更新使用

## 适用对象

- `Generalist`
- `UI_Coder`

## 一条功能 / 一步实现，只维护一个实现文档

- 初次实现时创建
- review 修复轮时更新原文档
- 不新建第二份

## 路径建议

- 功能实现：`.Nexus/3-implement/[yymmdd]_[feature-slug].md`
- 步骤实现：`.Nexus/3-implement/[yymmdd]_[feature-slug]_step-[n].md`
- UI 功能实现：`.Nexus/3-implement/UI-[yymmdd]_[feature-slug].md`

## 文档头

<!-- NEXUS_HANDOFF
status: [PASS / BLOCKED]
artifact_path: [.Nexus/3-implement/...]
next_agent: [Reviewer / Nexus]
user_decision_required: [true / false]
blocker_type: [NONE / CONTRACT_GAP / SCOPE_GAP / IMPLEMENTATION_CONFLICT]
fact_updated: [true / false]
fact_paths:
	- [paths or none]
fact_sync_scope: [FULL / PARTIAL / NONE]
fact_known_gaps:
	- [if any]
modified_files:
	- [path or none]
reports_consumed:
	- [.Nexus/2-Scheme/...]
	- [.Nexus/0-fact/...]
acceptance_coverage: [FULL / PARTIAL]
manual_test_required: false
manual_ui_review_required: [true / false]
doc_impact: [None / Needed / User Requested]
changelog_candidate: [brief note or none]
ui_fallback_mode: [true / false]
-->

## 通用正文结构

# Implementation Report: [Feature Summary]

## Contract Inputs
- Task ID / Goal / Scope / Scheme Used / Step Context

## Fact Inputs
- 使用了哪些 fact
- 哪些部分补读了真实代码

## Files Modified
- 每个文件的修改目的

## Fact Coverage Matrix
| Real Code File | Changed? | Fact File | Fact Updated? | Known Gaps |
|---|---:|---:|---:|
| `path` | Yes/No | `path` | Yes/No | None / ... |

## New Interfaces
- Name / Kind / File / Signature / Purpose / Inputs / Outputs / Notes

## New External Fields
- Field Name / Owner / Meaning / Nullable / Default / Consumer

## Logic Summary
- 主流程 / 分支逻辑 / 错误路径 / 边界处理 / 删除的旧路径

## Behavior Summary
- 最终行为 / 与旧行为变化 / 是否 breaking change

## Tests / Validation
- 命令与结果摘要

## Divergence From Scheme
- 无 / 或有：说明分歧、原因、风险

## Doc Impact
- None / Needed / User Requested
- Suggested Doc Paths
- Doc Notes

## CHANGELOG Candidate
- User-visible Change / Internal-only / Breaking
- 简要建议条目

## Reviewer Focus
## Follow-up

## UI 实现扩展

若实现者是 `UI_Coder`，补充：
- Logic Interfaces Consumed
- External Fields Consumed
- UI Structure Summary
- Visual State Coverage
- Responsive & Accessibility
- Legacy UI Cleanup
- Manual Visual Review Needed: Yes