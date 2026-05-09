---
name: nexus-ui-fallback-implementation-protocol
description: 定义 Generalist 在 Nexus 明确指定 UI Fallback Mode 时的受限 UI 实现协议。
---

# 目标

该 skill 用于 `Generalist` 在 UI agent 失败或不可用时，受限接管 UI 实现。

目标：
- 避免 UI 流程因 agent 故障完全停滞
- 保持 UI 方案门禁
- 防止 Generalist 凭空发明 UI 设计或字段语义
- 确保 fallback 仍可 review、可验证、可同步 fact

# 启用条件

必须同时满足：

- Nexus 明确指定 `UI Fallback Mode: true`
- UI_Investigator 或 UI_Coder 出现失败、无响应或不可用
- 已有确认 UI 方案，或已有足够清晰的功能方案约束 UI 范围
- UI 所需上游逻辑接口已完成或明确可用

若任何条件不满足：
- 返回 `BLOCKED`

# 允许做的事

Generalist fallback 可做：

- 按确认 UI 方案实现组件结构
- 补齐 loading / empty / error / disabled 状态呈现
- 调整布局、样式、响应式
- 补基础无障碍属性
- 清理 scope 内旧 UI 变体
- 同步 UI fact
- 写 UI 实现文档

# 禁止做的事

不得：

- 重做 UI 研究
- 发明视觉方向
- 发明字段语义
- 发明交互规则
- 新增业务逻辑
- 改变数据获取策略
- 改变路由契约
- 改变 API 契约
- 在组件里硬编码业务规则
- 绕过用户确认 UI 方案

# 输入要求

Nexus 必须提供：

- Task ID
- UI Fallback Mode: true
- fallback 原因
- 确认 UI 方案路径，或足够清晰的功能方案路径
- 上游逻辑接口说明
- 目标文件 / 组件范围
- Scope
- Non-Goals
- Relevant Fact Paths
- Branch Context

# 实现要求

必须遵循：

- SKILL:nexus-ui-scheme-gate
- SKILL:nexus-ui-code
- SKILL:nexus-fact-cache-write-protocol
- SKILL:nexus-implementation-report-protocol

必须确保：

- 状态覆盖完整
- 小屏可用
- 焦点可见
- 语义结构合理
- 不引入明显布局跳动
- 不新增业务规则
- 不改变字段语义

# fact 要求

必须更新涉及 UI 文件对应 fact。

UI fact 至少包含：
- 组件职责
- props / callback
- 外部字段消费
- loading / empty / error / disabled 状态
- null / undefined fallback
- 响应式行为
- 无障碍处理
- cleanup 旧 UI 情况

# 实现文档要求

实现文档必须明确：

- 当前是 UI Fallback Mode
- fallback 原因
- 使用的 UI 方案或功能方案
- 上游逻辑接口
- 状态覆盖
- 响应式与无障碍
- 与方案偏离
- 需要 Reviewer 重点检查的点
- 需要用户手动视觉确认

# 阻塞条件

必须 `BLOCKED`：

- 没有 UI 方案且功能方案不足以约束 UI 范围
- 上游逻辑接口缺失
- 字段语义不清
- 需要新增业务逻辑才能实现 UI
- 目标组件无法定位
- scope 不足以完成必要收口
- 无法同步 fact