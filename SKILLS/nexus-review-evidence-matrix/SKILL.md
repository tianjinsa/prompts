---
name: nexus-review-evidence-matrix
description: 定义 `Reviewer` 在评审时必须遵守的证据驱动评审协议，确保评审基于事实、方案、真实代码、测试结果与 fact 一致性。
---

# 目标

该 skill 用于让 `Reviewer` 以证据驱动方式评审，而不是凭印象放行。

核心原则：
- 先读 fact，但不盲信 fact
- 再读方案
- 再读实现文档
- 再查真实代码
- 再决定是否补测试
- 再真实执行验证
- 最后给出 PASS / FAIL / BLOCKED
- PASS 后归档实现文档

# 输入读取顺序

`Reviewer` 必须按以下顺序读取：

1. `.Nexus/0-fact/`
2. `.Nexus/2-Scheme/`
3. `.Nexus/3-implement/`
4. `.Nexus/4-review/` 历史失败记录 {若有}
5. 真实源码
6. 测试 / 构建 / 类型检查配置

# fact 使用原则

`.Nexus/0-fact/` 是实现者同步的缓存。

它不是独立证据。

Reviewer 必须：
- 对照真实代码验证 fact
- 对照方案验证 fact
- 对照实现文档验证 fact
- 找出 fact 漂移、遗漏或错误

# 验收证据矩阵

对每个验收点，都应尽量建立如下矩阵记录：

- 验收项
- 证据类型
  - static
  - automated
  - manual-ui
  - fact-consistency
  - unverified
- 证据来源
  - 源码审查
  - 测试文件
  - 终端命令结果
  - UI 方案文档
  - `.Nexus/0-fact/`
  - `.Nexus/3-implement/`
- 当前结论
  - pass
  - fail
  - partial
  - needs-user-review

若关键验收项没有证据，不得默认通过。

# 静态审查维度

必须检查：

- 逻辑正确性
- 错误处理
- 边界条件
- null / undefined
- 空集合
- 异步失败
- 结构收口完整性
- 是否遗留旧路径
- 是否引入无依据兼容层
- 是否与确认方案冲突
- 是否与实现文档冲突
- 是否与 fact 冲突

若是 UI：
- 方案来源是否正确
- 字段 / 状态 / 回调是否与上游一致
- 是否存在明显崩溃点
- 状态覆盖是否完整
- 响应式与无障碍是否满足方案

# fact 一致性检查

必须检查：

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

## 风险

以下情况至少 MEDIUM：
- 关键文件缺少 fact
- fact 有局部遗漏
- fact 中存在轻微过期描述

以下情况必须 HIGH：
- fact 与核心代码行为相反
- fact 错误描述外部接口或字段语义
- fact 错误会误导后续 agent 或项目文档
- 实现文档和 fact 同时遗漏关键 breaking change

# 测试补强规则

若现有测试不能覆盖关键风险：

- `Reviewer` 可以新增或修改自动化测试
- 但测试是验证手段，不是代替实现的修复手段
- `Reviewer` 不得借补测试偷偷修业务实现逻辑

# 真实执行规则

执行命令必须是真实终端执行：

- typecheck
- lint
- unit test
- targeted test
- build

按项目实际可用命令选择。

禁止：
- 理论上通过
- 未运行却写已通过
- 只看代码就声称测试覆盖了

# UI 专项额外检查

若评审对象包含 UI：

- 必须检查是否存在确认 UI 方案文档
- 该方案是否来自 `UI_Investigator`
- 当前 UI 是否确实位于最后收口步骤
- UI 所需上游接口是否已完成
- UI 实现是否发明业务字段或规则
- UI fact 是否记录状态覆盖、props、外部字段消费与无障碍策略

若自动化和静态证据足够，但视觉结果仍需人工确认：

- 评审模式应为：
  - `Automated + Manual UI Review Needed`
- 并在评审文档中明确要求 `Nexus` 请求用户手动看效果

# 严重度判定

## HIGH

- 明确逻辑错误
- 崩溃风险
- 核心验收失败
- 关键接口 / 字段语义错误
- UI 在无确认方案或无上游接口的前提下被强行实现
- 自动化结果明确失败且影响主目标
- fact 与核心代码行为冲突
- fact 错误描述外部接口或字段语义

## MEDIUM

- 结构不完整
- 遗留兼容层
- 调用方迁移不彻底
- 部分状态覆盖缺失
- UI 流程前置不规范但未立即致命
- fact 覆盖不完整
- fact 有局部过期或遗漏

## LOW

- 可维护性问题
- 轻度一致性问题
- 次要命名 / 组织问题
- 不影响主流程但值得修复的瑕疵

# 通过 / 不通过门

- 只要存在 HIGH，必须 `FAIL`
- 存在关键验收项无证据，不能轻易 `PASS`
- 若测试环境损坏导致关键验证无法进行，应 `BLOCKED`
- 若 fact 与代码存在关键不一致，必须 `FAIL`
- 若只是需要用户看 UI 效果，不是 `FAIL`，但应标记需要手动确认

# PASS 后归档

当前轮评审 PASS 后：

- 将对应 `.Nexus/3-implement/` 实现文档移动到 `.Nexus/3-implement/.old/`
- 将历史失败 review 文档移动到 `.Nexus/4-review/.old/`
- 当前 PASS review 文档保留在 `.Nexus/4-review/`
- 不归档 `.Nexus/2-Scheme/`

若实现文档归档失败：
- 返回 `BLOCKED`
- 说明评审结论和归档失败原因

# 评审文档最少必须说明

- 读了哪些 fact / scheme / implement 文档
- 采用了哪种 review mode
- 静态发现
- fact 一致性结论
- 是否新增 / 修改测试
- 跑了哪些命令
- 结果如何
- 是否通过
- 若不通过，谁需要修什么
- 是否归档实现文档
- 是否需要用户手动确认 UI