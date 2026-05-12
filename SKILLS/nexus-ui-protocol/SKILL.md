---
name: nexus-ui-protocol
description: 定义 UI 研究、UI 方案门禁、UI 实现、UI fallback、UI review 与通用设计原则。供 Nexus、Investigator、UI_Investigator、UI_Coder、Generalist、Reviewer 按需使用。
---

# 目标

该 skill 统一 UI 相关流程，防止：

- 无 UI 研究直接进入 UI 实现
- UI_Coder 成为 first-hop UI agent
- UI 在上游逻辑未完成前提前实现
- UI agent 失败后被无边界 fallback
- Generalist 自行发明 UI 方案
- UI 实现发明业务字段、状态语义或交互规则

# 什么算 UI 任务

只要任务包含以下任一内容，就视为 UI 任务：

- 布局调整
- 样式调整
- 视觉层级调整
- 组件结构调整
- 交互呈现调整
- 响应式调整
- 无障碍呈现调整
- loading / empty / error / disabled 等视觉状态调整
- 任何用户可见的呈现层变化

# UI 标准链路

标准链路：

1. `Investigator` {若是复杂功能，先把 UI 放到最后一步}
2. `UI_Investigator`
3. 用户确认
4. `DocWriter` 将确认 UI 方案写入 `.Nexus/2-Scheme/`
5. `UI_Coder`
6. `Reviewer`
7. 用户手动确认 UI 效果 {若 Reviewer PASS}

# 核心门禁

## 规则 1：`UI_Coder` 绝不能是 first-hop UI agent

`UI_Coder` 的职责是实现已确认 UI 方案，不是发现 UI 方向。

## 规则 2：所有正式 UI 实现前必须先有 UI 研究

没有 UI 研究和用户确认，不得直接进入 UI 实现。

## 规则 3：没有确认 UI 方案，不得调用 `UI_Coder`

`UI_Coder` 开工前必须同时满足：

- 存在 `.Nexus/2-Scheme/` 下的确认 UI 方案路径
- 该方案来自 `UI_Investigator`
- 用户已确认该方案
- 当前阶段确实已经轮到 UI 最后收口步骤
- UI 所依赖的上游逻辑接口已完成或已明确可用

## 规则 4：UI 必须在最后一步

若功能有步骤拆分：
- UI 必须位于最后一步

在 UI 之前应先完成：
- API 接口
- 状态逻辑
- 外部字段
- 错误语义
- 空状态语义
- loading / disabled 语义

若这些依赖未完成：
- UI 研究可阻塞
- UI 实现必须阻塞

# Nexus 的 UI 调度规则

`Nexus` 每次调用 `UI_Coder` 前，必须逐项检查：

- 是否存在确认 UI 方案路径
- 是否来自 `UI_Investigator`
- 是否已被用户确认
- 是否已完成 UI 所需上游逻辑接口
- 当前是否为最后一个 UI 收口步骤

若任一项无法明确回答“是”：
- 不得调用 `UI_Coder`
- 必须先调用 `UI_Investigator`
- 或等待上游逻辑完成
- 或请求用户决策

# Investigator 的 UI 识别规则

`Investigator` 若识别到功能涉及 UI：

- 必须标记 `Need UI Module: Yes`
- 必须列出 UI 所需上游输入
- 必须在步骤文档中将 UI 放在最后一步
- 不得把 UI 与逻辑实现混成同一步

必须明确 UI 所需：
- API 数据
- 状态字段
- 错误态
- loading 条件
- empty 条件
- disabled 条件
- callbacks
- 字段 nullable 语义
- fallback 策略

# UI_Investigator 研究协议

`UI_Investigator` 产出两类 UI 文档，均写入：

- `.Nexus/1-research/`

## 1. UI 功能预研

用于：
- 明确当前 UI 问题
- 明确 UI 所需上游依赖
- 帮用户理解 UI 方向取舍
- 判断是否可进入 UI 设计方案

## 2. UI 设计方案

用于：
- 明确目标组件或页面范围
- 形成供用户确认的 UI canonical 方案
- 供 `DocWriter` 落盘到 `.Nexus/2-Scheme/`
- 供 `UI_Coder` 实施

# UI 研究文档头格式

所有 UI 研究文档顶部必须包含：

<!-- NEXUS_HANDOFF
status: [PASS / BLOCKED / NEEDS_USER_DECISION]
artifact_path: [.Nexus/1-research/...]
next_agent: [Nexus / DocWriter / UI_Coder]
user_decision_required: [true / false]
blocker_type: [NONE / FACT_GAP / CONTRACT_GAP / SCOPE_GAP / TOOL_FAILURE]
modified_files:
	- none
reports_consumed:
	- [.Nexus/0-fact/... or none]
	- [.Nexus/2-Scheme/... or none]
acceptance_coverage: [PARTIAL / N/A]
manual_test_required: false
-->

# UI 功能预研正文模板

- Title
- Research Type: UI Feature Pre-Research
- Fact Sources
- Upstream Scheme Inputs
- Current UI State
- Visual Problems
- Required Logic Inputs
  - Fields
  - States
  - Callbacks
  - Error Semantics
  - Loading Semantics
  - Empty Semantics
  - Disabled Semantics
- Candidate UI Directions
- Recommended Direction
- Risks
- User Decision Points
- Why UI Must Be Last Step
- Can Proceed To UI Design Scheme: Yes / No

# UI 设计方案正文模板

- Title
- Research Type: UI Design Scheme
- Fact Sources
- Upstream Logic Inputs Required
- Dependency Readiness
- Target Files / Components
- Visual Structure
- Layout Rules
- Component Split
- State Coverage
  - loading
  - empty
  - error
  - disabled
  - success
  - retry
  - null / undefined fallback
- Responsive Rules
- Accessibility Requirements
- Visual Acceptance Contract
- Legacy UI Cleanup Direction
- Stop Conditions for UI_Coder
- Manual Visual Review Expectations

# UI_Investigator 完成门

只有满足以下条件，才能输出可交给 `UI_Coder` 的方案：

- 已明确 UI 所需上游字段
- 已明确 UI 所需状态与回调
- 已明确目标组件或页面范围
- 已明确状态覆盖
- 已明确响应式要求
- 已明确无障碍要求
- 已明确当前已经到 UI 最后一步
- 已明确 UI_Coder stop conditions

若任一缺失：
- 返回 `BLOCKED`
- 或 `NEEDS_USER_DECISION`

# UI_Coder 实现协议

`UI_Coder` 仅在以下条件满足时可开工：

- 确认 UI 方案存在
- 上游逻辑接口已完成或已明确
- 方案中的组件 / 文件目标可映射到实际工程
- 当前 scope 足以完成必要的 UI 收口

允许：
- 修改 UI 组件
- 修改样式
- 调整布局
- 增强状态呈现
- 增强响应式
- 增强无障碍
- 清理旧 UI 变体
- 更新 UI fact
- 写 UI 实现文档

不允许：
- 实现业务逻辑
- 改数据获取
- 改 API 调用链路
- 改路由逻辑
- 改表单业务规则
- 发明字段映射
- 发明状态语义
- 改后端契约

# Generalist UI Fallback 协议

若 `UI_Investigator` 或 `UI_Coder` 出现以下情况：

- 工具失败
- 调用错误
- 两次 `AGENT_NO_RESPONSE`
- 无法安全执行

可回退到 `Generalist`，但仅在以下前提下：

- Nexus 明确指定 `UI Fallback Mode: true`
- 已存在确认后的 UI 方案
- 或已存在足够清晰的功能方案，能约束 UI 范围
- UI 所需上游逻辑接口已完成或明确可用

若连最小 UI 方案边界都不存在：
- 不得让 `Generalist` 凭空设计 UI
- 应先由 `Investigator` 或 `UI_Investigator` 输出最小 UI 边界说明

Generalist fallback 只能做：
- 受限 UI 实现
- 明确范围内的组件调整
- 根据已有方案补齐状态呈现
- 根据已有设计原则处理基础可用性和无障碍

不得：
- 重做 UI 研究
- 发明视觉方向
- 发明字段语义
- 发明交互规则
- 改变上游业务契约

# UI 状态覆盖要求

UI 实现必须根据方案覆盖：

- loading
- empty
- error
- disabled
- success {若适用}
- retry {若方案要求}
- null / undefined fallback

复杂状态切换处应添加注释，说明：
- 状态优先级
- fallback 触发条件
- 避免布局跳动的策略

# UI 响应式要求

必须考虑：
- 小屏布局变化
- 文本换行与截断策略
- 触控面积
- 列表 / 卡片密度
- 关键 CTA 可见性
- 横向溢出风险

# UI 无障碍要求

必须考虑：
- semantic HTML
- aria 标记
- keyboard focus
- tab 顺序
- 屏幕阅读器可理解性
- focus visible
- disabled 状态表达

# 视觉设计原则

应确保：
- 主信息优先
- 次信息弱化
- 行动按钮层级明确
- 页面分区清晰
- 密度与留白平衡
- 视觉焦点不被装饰元素干扰

避免：
- 所有元素同等强调
- 过多边框和阴影堆叠
- CTA 不明显
- 错误状态不突出
- 空状态过于像普通内容

# 布局原则

应确保：
- 结构能被快速扫读
- 相关信息靠近
- 不相关信息分离
- 列表、卡片、表单保持一致节奏
- 关键操作在常见视口下可见

避免：
- 无意义深层嵌套
- 小屏横向滚动
- 内容加载后大幅跳动
- 重要信息被折叠到不可发现位置

# UI 文案原则

UI 文案应：
- 简短
- 明确
- 面向用户结果
- 错误信息可行动
- 空状态说明下一步

避免：
- 技术内部术语暴露给普通用户
- 模糊错误
- 过度幽默
- 没有下一步的空状态

# Reviewer 的 UI 检查门

当评审 UI 改动时，`Reviewer` 必须额外检查：

- 是否存在对应确认 UI 方案文档
- 该方案是否来自 `UI_Investigator`
- 当前 UI 实现是否发生在上游逻辑完成之后
- 是否存在字段 / 状态语义不清却强行实现的情况
- UI fact 是否记录状态覆盖和外部字段消费

若缺失上述前置：
- 视为流程违规
- 至少记为 `MEDIUM`
- 若造成契约不清或运行风险，记为 `HIGH`

# 用户手动确认 UI

UI 模块在 Reviewer PASS 后仍不代表最终闭环。

Nexus 必须请求用户手动查看 UI 效果。

用户未确认前：
- UI 功能不视为真正闭环