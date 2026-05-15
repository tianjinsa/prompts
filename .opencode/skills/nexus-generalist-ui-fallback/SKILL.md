---
name: nexus-generalist-ui-fallback
description: 该 skill 定义了 Generalist 在 `UI Fallback Mode` 下接管 UI 实现时必须遵守的约束，以防止在 UI agent 失效时无边界实现 UI。
---

## 目标

该 skill 用于规范 `Generalist` 接管 UI 实现时的边界。
目标是：
- 在 `UI_Coder` / `UI_Investigator` 失效时提供受控 fallback
- 防止 `Generalist` 在没有清晰 UI 方案时随意发明视觉与交互
- 仍然保证 UI 变更可 review、可 fact 化、可交付

## 进入条件

只有当 Nexus 明确传入：
- `UI Fallback Mode: true`

并且至少满足以下之一时，`Generalist` 才可继续：
1. 已存在确认后的 UI 方案
2. 已存在足够清晰的功能方案，且 UI 边界被明确约束

若以上都不满足：
- 必须 `BLOCKED`

## 必须额外读取

进入 fallback 后，`Generalist` 必须额外读取：
- `SKILL:nexus-ui-scheme-gate`
- `SKILL:design-ui`

## 允许 fallback 的两类场景

### 场景 A：`UI_Coder` 失败
仅在以下前提下允许：
- 已存在确认后的 UI 方案
- 上游逻辑接口已完成
- 目标组件 / 页面范围明确

### 场景 B：`UI_Investigator` 失败
仅在以下前提下允许：
- 功能方案已经足够明确约束 UI 范围
- 所需字段、状态、回调、错误语义明确
- 视觉目标边界清晰
- 无需重新发明 UI 方向

若这些条件不满足：
- 不得 fallback
- 必须 `BLOCKED`

## 实现边界

即使进入 fallback，你也仍然：
- 不是 UI 研究者
- 不能发明新的产品交互方向
- 不能发明新的字段语义
- 不能绕过上游逻辑未完成的问题
- 不能用 UI 组件偷偷实现业务规则

## 质量要求

fallback 实现仍必须满足：
- loading / empty / error / disabled 等必要状态
- 响应式可读性
- 基本无障碍
- 焦点可见
- 不引入明显布局跳动
- 默认不保留旧 UI 兼容层

## 文档与 fact 要求

完成 UI fallback 后，`Generalist` 仍必须：
- 同步相关 `.Nexus/0-fact/`
- 在实现文档中明确标记：
	- `UI Fallback Mode: true`
	- fallback 原因
	- 依据的方案路径
	- 关键 UI 状态覆盖
	- 需要用户手动确认视觉结果

## 必须阻塞的情况

出现以下任一情况，必须 `BLOCKED`：
- 没有确认 UI 方案，且功能方案又不足以约束 UI 边界
- 上游逻辑接口未完成
- 字段 / 状态语义不清
- 目标 UI 文件或组件无法安全映射
- 需要重新做 UI 研究才能继续

## 核心底线

fallback 的本质是：
- **在既有边界内实现**
而不是：
- **代替 UI 研究重新发明 UI**