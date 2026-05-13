---
name: nexus-fact-cache-comment-style
description: 该 skill 定义了 `.Nexus/0-fact/` 代码事实缓存层的注释式编写风格和结构，以确保快速理解代码文件的职责、输入输出、流程和依赖，而不是逐行翻译源码。
---
## 目标
`.Nexus/0-fact/` 是**代码事实缓存层**。
它的存在目标是：
- 避免后续 agent 反复读取大段真实代码
- 快速理解类的大致工作原理
- 快速理解函数的输入/输出与主要流程
- 快速理解字段语义与消费者
- 用“注释式摘要”精炼信息，而不是逐行翻译源码
## 懒建立原则
`0-fact` 采用懒建立：
- 只为当前任务涉及的代码文件建立或更新 fact
- 缺失 fact 不是 blocker
- 若 fact 不存在，可先由有权限的 agent 读取真实代码完成任务
- 任务闭环后由 `DocWriter` 补齐或更新 fact
## 文件映射规则
每个实际代码文件对应一个 fact 文档：
- 实际文件：
	- `src/foo/bar.ts`
- fact 文件：
	- `.Nexus/0-fact/src/foo/bar.ts.md`
规则：
- 保留相同相对路径
- 保留相同文件名
- 末尾追加 `.md`
## 编写风格
`0-fact` 应该像：
- 文件注释
- 类注释
- 函数注释
- 字段注释
- 流程注释
而不是：
- 逐行复述源码
- 大段散文
- 伪 API 全量手册
- 靠猜测补行为
## 推荐结构
每个 fact 文档建议使用以下块结构。
不是每个块都必须存在，但能写的尽量写。
# Fact: [relative/path/to/file]
@file
- path:
- role:
- main responsibility:
- depends_on:
- used_by:
- cache_status:
- last_synced_from:
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
@notes
- migration notes
- task-specific changes
- unresolved TODO:
	- [TODO: 需后续实现者或研究者确认]
## 编写优先级
优先记录：
1. 对外入口
2. 关键字段语义
3. 核心流程
4. 错误/空值/边界路径
5. 谁在调用它
6. 当前任务造成的变化
## 事实要求
- 只写已确认事实
- 不根据命名猜测行为
- 不能确认的内容用 TODO 标记
- 若本次任务改变了类职责、字段语义或流程，应显式更新对应注释块