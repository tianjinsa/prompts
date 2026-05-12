---
name: nexus-fact-cache-protocol
description: 定义 `.Nexus/0-fact/` 的读写、格式、review 校验与生命周期协议。由 Generalist/UI_Coder 写入，由 Reviewer 校验，DocWriter 不写入。
---

# 目标

`.Nexus/0-fact/` 是代码事实缓存层。

它的目标是：
- 避免后续 agent 反复读取大段真实代码
- 快速理解文件职责、类、函数、字段和流程
- 快速理解当前任务造成的事实变化
- 降低 DocWriter 二次转述失真
- 为 Reviewer 提供可校验的事实缓存

# 职责边界

## 写入者

`.Nexus/0-fact/` 由实际实现者在完成编码时写入或更新：

- `Generalist`
- `UI_Coder`

## 校验者

`Reviewer` 必须校验 fact 与真实代码一致。

`Reviewer` 可在评审文档中记录 fact 问题。
除非只更新 review metadata，否则不得替实现者重写行为事实。

## 禁止者

`DocWriter` 不写入、不更新 `.Nexus/0-fact/`。

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
- 实际文件：`src/foo/bar.ts`
- fact 文件：`.Nexus/0-fact/src/foo/bar.ts.md`

规则：
- 保留相同相对路径
- 保留相同文件名
- 末尾追加 `.md`
- 若中间目录不存在，创建目录

# 写入时机

实现型 agent 必须在以下时机同步 fact：

1. 代码修改完成后
2. 必要验证运行后
3. 写出或更新实现文档前后均可，但最终必须确保 fact 引用正确实现文档路径
4. review 修复轮中，修复完成后必须再次更新相关 fact

建议顺序：
1. 完成代码
2. 运行验证
3. 确定实现文档路径
4. 更新 `.Nexus/0-fact/`
5. 写或更新 `.Nexus/3-implement/`
6. 终局返回 fact 路径与报告路径

# 写入范围

只更新本次任务涉及的文件：

- 实际修改的业务源文件
- 实际修改的 UI 源文件
- 虽未修改但语义因本次任务发生变化的源文件

默认不为测试文件建立 fact。

不得：
- 全仓库扫描
- 大范围重写无关 fact
- 为未读过或未理解的文件写 fact
- 写 scope 外文件的行为事实

# 推荐结构

每个 fact 文档建议使用以下结构。

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

# 编写风格

fact 应该像：
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

# 必须记录的内容

每个更新过的 fact 至少应包含：

- source_file
- task_id
- synced_by
- synced_at
- implementation_report
- review_state
- cache_status
- 文件职责
- 关键入口
- 主要行为
- 新增或改变的接口
- 新增或改变的字段
- nullable / fallback 语义
- 错误路径
- 边界处理
- 下游消费者
- 删除或收口的旧路径
- 本次任务变化摘要

UI 文件还必须包含：

- 组件职责
- props / callback
- loading / empty / error / disabled 状态
- null / undefined fallback
- 响应式行为
- 无障碍处理
- 消费的外部字段
- 依赖的上游逻辑接口

# review_state 规则

## 简单任务

若 Nexus 明确声明当前任务为简单任务，且无需 Reviewer：

- `review_state: SIMPLE_ACCEPTED`

## 非简单任务

在 Reviewer PASS 前：

- `review_state: PENDING_REVIEW`

## Review 修复轮

修复后重新同步 fact：

- `review_state: PENDING_REVIEW`

## Reviewer PASS 后

Reviewer PASS 文档是验证依据。

如果流程允许 Reviewer 更新轻量 metadata，可将：
- `review_state: REVIEWED_PASS`
- `review_report: [.Nexus/4-review/...]`

如果不更新 fact metadata，后续 agent 应结合 review 文档判断。

# 与实现文档的关系

`.Nexus/3-implement/` 是本次实现记录。

`.Nexus/0-fact/` 是代码当前事实缓存。

两者必须一致：

- 实现文档写“新增接口 A”，fact 也应写清 A 的当前事实
- fact 写“字段 B 可空”，实现文档或代码中应能找到依据
- 若实现文档与 fact 冲突，Reviewer 必须指出

# Reviewer 校验规则

Reviewer 必须检查：

## 覆盖性

- 实现修改的关键源文件是否都有对应 fact
- 语义受影响但未直接修改的文件是否需要 fact 更新
- UI 组件是否记录 props、状态和外部字段消费

## 准确性

- fact 描述的函数 / 类 / 组件是否真实存在
- fact 描述的输入输出是否与代码一致
- fact 描述的字段可空性是否与代码一致
- fact 描述的错误路径是否与代码一致
- fact 描述的 fallback 是否真实存在

## 时效性

- fact 是否仍描述旧路径
- fact 是否遗漏本次删除的 legacy 分支
- fact 的 task_id / implementation_report 是否对应本次实现

# 严重度判定

以下情况至少 MEDIUM：
- 关键文件缺少 fact
- fact 有局部遗漏
- fact 中存在轻微过期描述

以下情况必须 HIGH：
- fact 与核心代码行为相反
- fact 错误描述外部接口或字段语义
- fact 错误会误导后续 agent 或项目文档
- 实现文档和 fact 同时遗漏关键 breaking change

# 阻塞条件

实现型 agent 遇到以下任一情况，必须返回 `BLOCKED`：

- 无法确认目标文件语义
- 修改后代码结构与方案严重不一致
- fact 无法安全落盘
- 当前任务 scope 不足以描述受影响文件
- 需要读取 scope 外大量文件才能确认事实
- 事实与方案冲突且无法自行判断
- UI 字段或状态语义不清

# 禁止事项

不得写入：
- 未确认字段语义
- 未验证的调用方
- 未来计划
- 实现者主观判断
- 与代码不一致的行为描述
- 为了让 review 通过而粉饰问题的描述

# 终局返回要求

实现型 agent 的终局返回必须包含：

- Fact Files Updated
- Fact Sync Status
- Implementation Report
- Files Changed
- Validation

允许的 Fact Sync Status：
- PASS
- BLOCKED
- PENDING_REVIEW
- SIMPLE_ACCEPTED