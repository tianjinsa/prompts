---
name: nexus-implementation-report-protocol
description: 该 skill 定义了 `.Nexus/3-implement/` 中实现情况文档的编写协议，以确保每条功能/每步实现都有清晰、结构化、事实性的记录，方便 Reviewer 审查实现、校验 fact，并方便 Nexus 与 DocWriter 后续处理 changelog/doc。
---
## 目标
`.Nexus/3-implement/` 中的实现情况文档不是流水账。
它的目标是：
- 让 `Reviewer` 无需重新推测实现意图
- 让 `Reviewer` 能审查：
  - 实现是否符合方案
  - 测试是否真实执行
  - `.Nexus/0-fact/` 是否已由实现者同步
  - fact 是否需要进一步核验
- 让 `Nexus` 能判断当前实现是否可进入 Review
- 让 `DocWriter` 在任务完成阶段能提取：
  - CHANGELOG 候选内容
  - doc/ 更新素材
  - README 更新素材，若被明确要求
- 让后续 agent 快速理解：
  - 改了什么
  - 为什么改
  - 新接口是什么
  - 新字段是什么
  - 大致流程如何变化
  - fact 更新覆盖了哪些文件
注意：
- `.Nexus/0-fact/` 不再由 `DocWriter` 根据实现文档更新。
- `.Nexus/0-fact/` 由 `Generalist` / `UI_Coder` 在实现完成后同步。
- 实现文档必须记录 fact 更新路径，供 `Reviewer` 校验。
- 实现文档 PASS 不等于可提交，必须等待 `Reviewer PASS`。
---
## 适用对象
- `Generalist`
- `UI_Coder`
---
## 一条功能 / 一步实现，只维护一个实现文档
规则：
- 初次实现时创建文档
- review 修复轮时更新原文档
- 不新建第二份实现文档
- 保持该文档成为当前功能 / 步骤的 canonical 实现记录
- `Reviewer PASS` 后由 `Reviewer` 将该实现文档归档到 `.Nexus/3-implement/.old/`
---
## 路径建议
- 功能实现：
  - `.Nexus/3-implement/[yymmdd]_[feature-slug].md`
- 步骤实现：
  - `.Nexus/3-implement/[yymmdd]_[feature-slug]_step-[n].md`
- UI 功能实现：
  - `.Nexus/3-implement/UI-[yymmdd]_[feature-slug].md`
若是修复轮，必须继续更新原路径。
---
## 文档头
每份实现文档顶部必须包含：
<!-- NEXUS_HANDOFF
status: [PASS / BLOCKED]
artifact_path: [.Nexus/3-implement/...]
next_agent: [Reviewer / Nexus]
user_decision_required: [true / false]
blocker_type: [NONE / CONTRACT_GAP / SCOPE_GAP / TOOL_FAILURE / FACT_SYNC_FAILED / IMPLEMENTATION_CONFLICT]
modified_files:
  - [code/test/fact/doc path or none]
reports_consumed:
  - [.Nexus/2-Scheme/... or none]
  - [.Nexus/0-fact/... or none]
  - [.Nexus/4-review/... or none]
implementation_mode: [Normal / Simple / Review Fix / UI Fallback]
acceptance_coverage: [FULL / PARTIAL / UNKNOWN]
manual_test_required: [true / false]
fact_updated: [true / false]
fact_paths:
  - [.Nexus/0-fact/... or none]
fact_sync_scope: [FULL / PARTIAL / NONE]
fact_known_gaps:
  - [gap or none]
needs_review: true
review_required_for_commit: true
manual_ui_review_required: [true / false]
-->
---
## 通用正文结构
所有实现文档至少包含：
# Implementation Report: [Feature Summary]
## Contract Inputs
- Task ID
- Goal
- Current Stage
- Task Type
- Scope
- Non-Goals
- Branch Context
- Implementation Mode
- Scheme Used
- Step Context，若适用
- Review Fix Source，若是修复轮
## Fact Inputs
- 使用了哪些 `.Nexus/0-fact/`
- 哪些 fact 缺失
- 哪些 fact 明显过期
- 哪些部分补读了真实代码
- 本轮是否更新 fact
## Files Modified
按类型列出：
### Code Files
- `path` — 修改目的
### Test Files
- `path` — 修改目的
### Fact Files
- `path` — 对应代码文件 / 更新内容摘要
### Other Files
- `path` — 修改目的
---
## Implementation Details
说明：
- 主流程如何实现
- 哪些模块被调整
- 哪些调用方被迁移
- 哪些旧路径被删除或收口
- 是否存在兼容层
- 若保留兼容层，必须写明合同依据
---
## New Interfaces
若无新增接口，写 `None`。
如有新增或修改，逐项写：
- Name
- Kind
- File
- Signature
- Purpose
- Inputs
- Outputs
- Error Semantics
- Notes
---
## Changed Interfaces
若无接口变化，写 `None`。
如有变化，逐项写：
- Interface Name
- Before
- After
- Breaking Change: Yes / No
- Consumers Updated
- Remaining Consumers，若有
---
## New External Fields
若无新增字段，写 `None`。
如有新增字段，逐项写：
- Field Name
- Owner Type / Module
- Meaning
- Nullable: Yes / No
- Default / Fallback
- Consumer
- Error / Empty Semantics
---
## Changed External Fields
若无字段语义变化，写 `None`。
如有变化，逐项写：
- Field Name
- Before
- After
- Nullable Change
- Consumer Impact
- Breaking Change: Yes / No
---
## Logic Summary
- 主流程
- 分支逻辑
- 错误路径
- 边界处理
- 删除 / 收口的旧路径
- 仍保留的路径及原因
---
## Behavior Summary
- 最终功能行为
- 与旧行为相比的变化
- 用户可见变化
- 内部行为变化
- 是否可能是 breaking change
---
## Tests / Validation
必须记录真实执行或明确说明未执行原因：
- `command`
  - Result
  - Summary
若未运行某类验证，写：
- Not Run
- Reason
- Risk
---
## Fact Sync
必须包含：
### Fact Coverage Matrix
| Code File | Changed? | Fact File | Fact Updated? | Known Fact Gaps | Reviewer Should Verify |
|---|---:|---|---:|---|---|
| path | Yes / No | path or None | Yes / No | gap or None | item |
### Updated Fact Files
- `.Nexus/0-fact/...` — 更新内容摘要
### Known Fact Gaps
- None
- 或列出无法覆盖的原因
注意：
- 如果主要代码文件被修改但未更新 fact，必须解释原因。
- 若无法给出可接受原因，应返回 `BLOCKED`，不得返回 `PASS`。
---
## Divergence From Scheme
- None
- 或：
  - Divergence
  - Reason
  - Risk
  - Why Safe
  - Reviewer Should Verify
---
## Reviewer Focus
列出建议 Reviewer 重点检查点，例如：
- 外部接口语义
- 字段可空性
- 旧路径是否收口
- 错误路径
- 边界输入
- fact 是否准确
- 测试是否足够
---
## Doc Impact
必须写：
- Doc Impact: None / Needed / User Requested / Unsure
- Suggested Doc Paths
- Doc Notes
说明是否建议后续由 `DocWriter` 更新：
- `doc/**/*`
- `README.md`
- 其他项目文档
实现者默认不得直接更新 doc，除非 Nexus 契约明确要求。
---
## CHANGELOG Candidate
必须写：
- User-visible Change
- Internal-only Change
- Breaking Change: Yes / No
- Suggested Entry
DocWriter 最终决定如何追加 `CHANGELOG.md`。
---
## Risks / Follow-up
- None
- 或：
  - Risk
  - Impact
  - Suggested Owner
  - Blocking: Yes / No
---
## Final Status
- PASS
- 或 BLOCKED
若 BLOCKED，必须写清：
- Why Blocked
- What Was Changed
- What Was Not Changed
- Required Next Action
- Suggested Next Agent
- Whether User Decision Is Needed
---
# UI 实现的扩展要求
若实现者是 `UI_Coder`，或 `Generalist` 处于 `UI Fallback Mode`，需在通用结构基础上补充以下内容。
## Confirmed UI Scheme
- Scheme Path
- Source: UI_Investigator / Confirmed Feature Scheme / Other
- User Confirmed: Yes / No
- UI Last Step Ready: Yes / No
## Logic Interfaces Consumed
- Interface Name
- Kind: hook / props / callback / state / type / selector / adapter result
- Source File
- Inputs Expected
- Outputs Consumed
- Error Semantics
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
- 新增组件
- 删除组件
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
- touch target notes，若适用
## Legacy UI Cleanup
- 删除 / 合并了哪些旧组件、旧 props、旧样式入口
- 若仍保留，为什么
- 是否有兼容层
- 兼容层是否有合同依据
## Manual Visual Review Needed
- Yes
- Reason: UI changes require user visual confirmation after Reviewer PASS.
---
# 修复轮要求
若是 Review Fix：
必须更新原实现文档，并新增或更新以下章节：
## Review Fix Summary
- Previous Review Report
- Failed Items Addressed
- Code Fixes
- Fact Fixes
- Tests Re-run
- Remaining Risks
不得新建实现文档。
---
# 事实性要求
实现文档必须能回答：
- 改了哪些文件？
- 每个文件改什么？
- 新增了哪些对外接口？
- 修改了哪些接口？
- 新增了哪些外部字段？
- 字段语义是否变化？
- 大致流程怎么变了？
- 验证做了什么？
- 与方案是否偏离？
- `.Nexus/0-fact/` 更新了哪些？
- 哪些 fact 需要 Reviewer 重点核验？
- 是否需要 doc / changelog 更新？
若这些问题无法从文档中回答，视为实现文档不合格。
---
# 与 Reviewer 的关系
实现文档返回 PASS 后，下一步必须是 `Reviewer`。
`Reviewer` 将验证：
- 代码是否符合方案
- 测试是否真实执行
- fact 是否与真实代码一致
- 实现文档是否准确
- 是否可以 PASS
`Reviewer PASS` 后，由 `Reviewer` 归档该实现文档到：
- `.Nexus/3-implement/.old/`
实现者不得自行归档实现文档。