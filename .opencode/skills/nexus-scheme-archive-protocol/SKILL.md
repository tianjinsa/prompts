---
name: nexus-scheme-archive-protocol
description: 该 skill 定义了 `.Nexus` 文档的归档协议，以确保不同类型的文档在完成职责后有统一、明确的归档路径和时机，避免文档混乱和滞留。
---

## 目标

该 skill 用于统一 `.Nexus` 文档的归档行为，避免：
- 同一种文档被不同 agent 用不同规则归档
- 研究、方案、实现、评审文档散落不一致
- 功能级方案在评审通过后仍长期滞留
- 步骤文档与架构文档归档时机混乱

## 文档类型划分

### `.Nexus/1-research/`
研究文档：
- 架构级方案
- 功能级预研方案
- UI 预研
- UI 设计方案

### `.Nexus/2-Scheme/`
已确认方案 / 步骤文档：
- 用户确认后的架构级方案
- 用户确认后的功能级方案
- 复杂功能步骤文档
- 用户确认后的 UI 方案

### `.Nexus/3-implement/`
实现情况文档：
- `Generalist`
- `UI_Coder`

### `.Nexus/4-review/`
评审文档：
- `Reviewer`

## 归档总则

1. 归档不是删除
2. 归档路径统一为对应目录下的 `.old/`
3. 归档动作应发生在**当前文档已完成其职责**之后
4. 若归档失败，必须返回终局状态，不得静默跳过
5. 当前仍作为活跃 canonical 输入的文档不得提前归档

## 归档职责总表

- `.Nexus/1-research/.old/`
	- 负责人：`DocWriter`
- `.Nexus/2-Scheme/.old/`
	- 归档时机负责人：`Nexus`
	- 执行动作可委派给：`DocWriter`
- `.Nexus/3-implement/.old/`
	- 负责人：`Reviewer`
- `.Nexus/4-review/.old/`
	- 负责人：`Reviewer`

## `DocWriter` 的归档职责

### 研究文档归档
当用户确认研究方案并写入 `.Nexus/2-Scheme/` 后：
- `DocWriter` 必须将对应原研究文档移动到：
	- `.Nexus/1-research/.old/`

适用：
- 架构级方案
- 功能级预研方案
- UI 预研 / 设计方案 {在其被确认并落盘后}

### 被 `Nexus` 委派的 scheme 归档
当 `Nexus` 明确委派归档 `.Nexus/2-Scheme/` 文档时：
- `DocWriter` 才可以将指定 scheme 文档移动到：
	- `.Nexus/2-Scheme/.old/`
- `DocWriter` 不得自行判断归档时机并擅自移动活跃 scheme

## `Reviewer` 的归档职责

### 评审历史失败文档归档
当当前轮评审 `PASS`，且之前存在失败评审文档：
- `Reviewer` 应将旧评审文档移动到：
	- `.Nexus/4-review/.old/`

### 实现文档归档
当当前轮实现已通过评审 `PASS`：
- `Reviewer` 必须将对应当前实现文档移动到：
	- `.Nexus/3-implement/.old/`

注意：
- `FAIL` 或 `BLOCKED` 时不归档实现文档
- 修复轮应继续更新同一份活跃实现文档
- `Reviewer` 不负责自动归档 `.Nexus/2-Scheme/`

## `Nexus` 的归档职责

### 架构级方案文档
当整个任务的架构级方案已完成其职责，且任务进入后续稳定执行阶段后：
- `Nexus` 负责决定是否将对应架构级 `.Nexus/2-Scheme/` 文档移动到：
	- `.Nexus/2-Scheme/.old/`
- 若需要执行动作，可委派 `DocWriter`

### 功能级方案文档
当功能级方案已不再作为当前活跃输入，且后续步骤不再依赖它时：
- `Nexus` 负责决定是否归档
- 若需要执行动作，可委派 `DocWriter`

### 步骤文档
对于复杂功能的步骤文档：
- 不在某一步单独 PASS 时归档
- 而是在**整个功能全部步骤完成后**
- 由 `Nexus` 统一决定归档
- 执行动作可委派 `DocWriter`

## UI 方案归档建议

UI 方案属于功能级方案的一种。
归档规则与其他 `.Nexus/2-Scheme/` 文档一致：
- 若后续步骤仍会引用：
	- 不归档
- 若 UI 模块已闭环，且后续不再需要作为活跃输入：
	- 由 `Nexus` 决定归档
	- 可委派 `DocWriter` 执行

## 归档前提

归档前必须满足：
- 文档已完成当前阶段职责
- 不再需要作为当前活跃阶段的 canonical 输入
- 下游所需信息已转移到：
	- `.Nexus/2-Scheme/`
	- `.Nexus/0-fact/`
	- 活跃实现 / 评审文档
	- 或用户已完成必要确认

## 归档失败处理

若归档动作因工具失败、路径缺失、权限问题无法完成：
- 必须返回 `BLOCKED`
- 明确写出：
	- 哪个文档归档失败
	- 应归档到哪里
	- 当前会对下一阶段造成什么影响