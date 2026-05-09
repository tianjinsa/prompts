---
name: nexus-fact-cache-write-protocol
description: 定义实现型 agent 在完成编码时写入或更新 `.Nexus/0-fact/` 的协议，确保事实缓存与真实代码保持一致。
---

# 目标

该 skill 用于规范实现型 agent 写入 `.Nexus/0-fact/`。

目标：
- 让代码事实缓存跟随真实代码变化
- 减少 DocWriter 二次转述导致的失真
- 让 Reviewer 可以审查 fact 与代码一致性
- 让后续 agent 能快速理解当前代码状态

# 适用对象

- `Generalist`
- `UI_Coder`

`Reviewer` 不负责重写行为事实，但必须校验 fact 一致性。

`DocWriter` 不适用本 skill，不写入 `.Nexus/0-fact/`。

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

# 文件映射

实际文件：

- `src/foo/bar.ts`

fact 文件：

- `.Nexus/0-fact/src/foo/bar.ts.md`

规则：
- 保持相对路径
- 保持文件名
- 追加 `.md`
- 若中间目录不存在，创建目录

# 必须遵循的风格

fact 内容必须遵循：

- SKILL:nexus-fact-cache-comment-style

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

Reviewer 的 PASS 文档是验证依据。

如流程允许 Reviewer 写 validation metadata，可将：

- `review_state: REVIEWED_PASS`
- `review_report: [.Nexus/4-review/...]`

否则保留 PENDING_REVIEW，但后续 agent 应结合 review 文档判断。

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

# 与实现文档的关系

`.Nexus/3-implement/` 是本次实现记录。

`.Nexus/0-fact/` 是代码当前事实缓存。

两者必须一致：

- 实现文档写“新增接口 A”，fact 也应写清 A 的当前事实
- fact 写“字段 B 可空”，实现文档或代码中应能找到依据
- 若实现文档与 fact 冲突，Reviewer 必须指出

# 阻塞条件

出现以下任一情况，必须返回 `BLOCKED`：

- 无法确认目标文件语义
- 修改后代码结构与方案严重不一致
- fact 无法安全落盘
- 当前任务 scope 不足以描述受影响文件
- 需要读取 scope 外大量文件才能确认事实
- 事实与方案冲突且无法自行判断
- UI 字段或状态语义不清

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

# 自检

返回前必须确认：

- 我是否为所有关键修改源文件更新或创建了 fact？
- 我是否避免为测试文件无意义创建 fact？
- 我是否只写已确认事实？
- 我是否标明 review_state？
- 我是否在实现文档中列出 fact 路径？
- 我是否在终局返回中列出 Fact Files Updated？