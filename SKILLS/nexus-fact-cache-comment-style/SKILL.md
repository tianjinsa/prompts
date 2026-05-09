---
name: nexus-fact-cache-comment-style
description: 定义 `.Nexus/0-fact/` 代码事实缓存层的注释式编写风格和结构，以便后续 agent 快速理解代码文件职责、输入输出、流程、字段与依赖。
---

# 目标

`.Nexus/0-fact/` 是代码事实缓存层。

它的存在目标是：
- 避免后续 agent 反复读取大段真实代码
- 快速理解类的大致工作原理
- 快速理解函数的输入 / 输出与主要流程
- 快速理解字段语义与消费者
- 快速理解本次任务造成的事实变化
- 用“注释式摘要”精炼信息，而不是逐行翻译源码

# 写入责任

`.Nexus/0-fact/` 由实际实现者在完成编码时写入或更新：

- `Generalist`
- `UI_Coder`

`DocWriter` 不写入、不更新 `.Nexus/0-fact/`。

`Reviewer` 负责校验 fact 与真实代码一致。
必要时，Reviewer 可记录 fact 一致性问题，但不得替实现者重写行为事实。

# 懒建立原则

`0-fact` 采用懒建立：

- 只为当前任务涉及的代码文件建立或更新 fact
- 缺失 fact 不是 blocker
- 若 fact 不存在，有权限的实现或研究 agent 可先读取真实代码完成当前任务
- 完成编码后由实现者补齐或更新当前任务涉及文件的 fact
- 不要求一次性覆盖整个仓库

# 文件映射规则

每个实际代码文件对应一个 fact 文档。

示例：

- 实际文件：
  - `src/foo/bar.ts`
- fact 文件：
  - `.Nexus/0-fact/src/foo/bar.ts.md`

规则：
- 保留相同相对路径
- 保留相同文件名
- 末尾追加 `.md`

# 编写风格

`0-fact` 应该像：

- 文件注释
- 类注释
- 函数注释
- 字段注释
- 流程注释
- 变更摘要

而不是：

- 逐行复述源码
- 大段散文
- 伪 API 全量手册
- 靠猜测补行为
- 实现者主观辩解

# 推荐结构

每个 fact 文档建议使用以下块结构。

不是每个块都必须存在，但能写的尽量写。

# Fact: [relative/path/to/file]

@meta
- source_file:
- task_id:
- synced_by:
- synced_at:
- implementation_report:
- review_report:
- review_state: [SIMPLE_ACCEPTED / PENDING_REVIEW / REVIEWED_PASS / REVIEW_FAILED / UNKNOWN]
- cache_status: [ACTIVE / PARTIAL / STALE]
- last_synced_from:

@file
- path:
- role:
- main responsibility:
- depends_on:
- used_by:
- public_surface:
- side_effects:
- lifecycle_notes:

@imports
- 只列关键依赖
- 不必记录无关紧要的轻量工具导入

@class [ClassName]
- purpose:
- when_to_use:
- constructor_inputs:
- important_fields:
  - field:
  - meaning:
  - nullable:
  - default_or_fallback:
- public_methods:
  - method:
  - purpose:
  - key_inputs:
  - key_outputs:
- workflow_summary:
- side_effects:
- extension_points:
- risks:

@function [functionName]
- purpose:
- when_called:
- inputs:
  - name:
  - meaning:
  - nullable:
  - default_or_fallback:
- outputs:
- throws_or_error_path:
- depends_on:
- algorithm_summary:
- edge_cases:
- callers:

@field [fieldName]
- owner:
- meaning:
- type_or_shape:
- nullable:
- default_or_fallback:
- consumed_by:
- notes:

@flow [FlowName]
- trigger:
- steps:
  - 1.
  - 2.
  - 3.
- success_result:
- failure_result:
- notes:

@ui_component [ComponentName]
- purpose:
- props:
  - name:
  - meaning:
  - nullable:
  - default_or_fallback:
- states:
  - loading:
  - empty:
  - error:
  - disabled:
  - success:
- responsive_behavior:
- accessibility:
- consumes_logic_from:
- visual_notes:

@task_change
- task_id:
- summary:
- changed_behavior:
- new_interfaces:
- changed_fields:
- removed_legacy_paths:
- validation_summary:

@notes
- migration notes:
- task-specific changes:
- unresolved TODO:
  - [TODO: 需后续实现者或研究者确认]

# 编写优先级

优先记录：

1. 对外入口
2. 关键字段语义
3. 核心流程
4. 错误 / 空值 / 边界路径
5. 谁在调用它
6. 当前任务造成的变化
7. 已删除或收口的旧路径
8. UI 组件的状态覆盖与外部字段消费

# 事实要求

- 只写已确认事实
- 不根据命名猜测行为
- 不能确认的内容用 TODO 标记
- 若本次任务改变了类职责、字段语义或流程，应显式更新对应注释块
- 若实现尚未经过 Reviewer，review_state 应为 PENDING_REVIEW
- 简单任务无 Reviewer 时，review_state 可为 SIMPLE_ACCEPTED
- 不得将“计划中行为”写为“已实现行为”

# 禁止事项

不得写入：
- 未确认字段语义
- 未验证的调用方
- 未来计划
- 实现者主观判断
- 与代码不一致的行为描述
- 为了让 review 通过而粉饰问题的描述