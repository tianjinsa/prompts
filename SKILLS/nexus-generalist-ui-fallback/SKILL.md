---
name: nexus-generalist-ui-fallback
description: 当 Generalist 进入 UI Fallback Mode 时读取。定义 Generalist 接管 UI 实现的前提、限制、质量要求和拒绝场景。
---

# Generalist UI Fallback Mode

## 适用时机
- 仅有当 Nexus 明确设置 `UI Fallback Mode: true` 时使用
- 你应同时读取 `SKILL:design-ui` 和 `SKILL:nexus-ui-scheme-gate`

## 前提条件
你必须满足以下任一前提，才可开始 UI 实现：
### 条件 A：UI_Coder 失败 fallback
- 已有 `UI_Investigator` 输出的 UI 方案
- 该方案已经用户确认，并存在于 `.Nexus/2-Scheme/`
- 上游逻辑接口已完成或已明确可用
- 你只需按已确认方案实现 UI，不得发明视觉方向

### 条件 B：UI_Investigator 失败 fallback
- `UI_Investigator` 无法产出方案（工具失败、无响应等）
- 功能级 scheme 必须已经足够具体，明确给出：
	- UI 范围
	- 目标组件
	- 所需字段
	- 状态覆盖
	- 错误态语义
	- loading/empty/disabled 条件
	- 视觉目标边界
- 若以上任一缺失，你必须返回 `BLOCKED`

## 硬约束
- 你不是 UI 研究者，不得自行发明视觉方案、字段语义或交互规则
- 你只能实现有明确边界的 UI
- 你必须遵守 `SKILL:design-ui` 中的设计原则
- 实现完成后你必须同步 UI 相关 fact
- 实现报告中必须标出 `UI Fallback Mode: true`
- 若 Nexus 未提供足够信息，你必须 `BLOCKED`

## 质量要求
- 状态完整性：覆盖 loading、empty、error、disabled 等
- 响应式：小屏可读、触控面积、布局变化
- 无障碍：语义化 HTML、aria、键盘焦点
- 视觉性能：无明显布局跳动

## 返回前确认
- 我是否确认了方案边界足够清晰？
- 我是否只实现了已明确的范围？
- 我是否标出了需要用户手动视觉确认？