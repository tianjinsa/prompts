---
name: nexus-artifact-lifecycle-protocol
description: 定义 `.Nexus` 中确认方案落盘、研究文档归档、实现文档归档与方案生命周期归档协议，避免不同 agent 归档职责冲突。
---

# 目标

该 skill 用于统一 `.Nexus` 文档生命周期，避免：

- 同一种文档被不同 agent 用不同规则归档
- 研究、方案、实现、评审文档散落不一致
- 实现文档在 review 通过后仍滞留活跃目录
- 方案文档被过早归档导致后续 agent 找不到 canonical 输入
- DocWriter 方案落盘与研究归档割裂

# 文档类型划分

## `.Nexus/1-research/`

研究文档：
- 架构级方案
- 功能级预研方案
- UI 预研
- UI 设计方案
- 阻塞研究文档

## `.Nexus/2-Scheme/`

已确认方案 / 步骤文档：
- 用户确认后的架构级方案
- 用户确认后的功能级方案
- 复杂功能步骤文档
- 用户确认后的 UI 方案

## `.Nexus/3-implement/`

实现情况文档：
- `Generalist`
- `UI_Coder`

## `.Nexus/4-review/`

评审文档：
- `Reviewer`

# 归档总则

1. 归档不是删除
2. 归档路径统一为对应目录下的 `.old/`
3. 归档动作应发生在当前文档已完成其职责之后
4. 不得过早归档仍作为 canonical 输入的文档
5. 若归档失败，必须返回终局状态，不得静默跳过

# DocWriter 职责

## 用户确认方案落盘

当用户确认研究方案后，`DocWriter` 必须：

1. 将 canonical 方案写入 `.Nexus/2-Scheme/`
2. 在方案中保留或补充 NEXUS_HANDOFF 头
3. 明确标记：
   - 用户已确认
   - 来源研究文档
   - 确认时间或任务上下文
4. 将对应原研究文档移动到 `.Nexus/1-research/.old/`

该流程是一个整体：
- 方案落盘成功但研究归档失败，应返回 `BLOCKED`
- 研究归档成功但方案落盘失败，也应返回 `BLOCKED`

适用：
- 架构级方案
- 功能级预研方案
- UI 预研 / UI 设计方案

## DocWriter 不负责

`DocWriter` 不负责：
- 写入 `.Nexus/0-fact/`
- 归档 `.Nexus/3-implement/`
- 归档 `.Nexus/4-review/`
- 判断代码是否通过 review

# Reviewer 职责

## 实现文档归档

当当前轮评审 `PASS` 后，`Reviewer` 必须将对应实现文档移动到：

- `.Nexus/3-implement/.old/`

原因：
- 功能实现完成并 review 通过后，活跃流程不再消费该实现文档
- 后续若需要，可从 `.old/` 读取历史记录

要求：
- 只归档当前 PASS 对应的实现文档
- FAIL 或 BLOCKED 时不得归档实现文档
- 若归档失败，返回 `BLOCKED`

## 旧失败评审文档归档

当当前轮评审 `PASS`，且之前存在失败评审文档：
- `Reviewer` 应将旧失败评审文档移动到：
  - `.Nexus/4-review/.old/`

当前 PASS review 文档保留在 `.Nexus/4-review/`。

## Reviewer 不负责

`Reviewer` 不负责：
- 归档 `.Nexus/2-Scheme/`
- 写入确认方案
- 归档研究文档
- 更新 doc/、README.md、CHANGELOG.md

# Nexus 职责

## 方案生命周期归档

`.Nexus/2-Scheme/` 是否归档由 `Nexus` 控制。

### 架构级方案文档

当整个任务的架构级方案已完成其职责，且任务进入稳定执行或完成阶段后：
- `Nexus` 可将对应架构级 `.Nexus/2-Scheme/` 文档移动到：
  - `.Nexus/2-Scheme/.old/`

### 功能级方案文档

当单个功能完成、评审通过、必要提交完成、且不再需要作为活跃输入后：
- `Nexus` 可将对应功能级 `.Nexus/2-Scheme/` 文档移动到：
  - `.Nexus/2-Scheme/.old/`

### 复杂功能步骤文档

对于复杂功能步骤文档：
- 不在某一步单独 PASS 时归档
- 应在整个功能全部步骤完成后
- 由 `Nexus` 统一移动到：
  - `.Nexus/2-Scheme/.old/`

### UI 方案文档

UI 方案属于功能级方案的一种。

若 UI 方案对应单独 UI 模块：
- 在 UI 模块 review PASS
- 用户手动确认视觉结果
- 相关提交完成
- 不再需要作为活跃输入后
- 由 `Nexus` 归档

若 UI 方案依附于复杂步骤链：
- 延后到整个功能完成后由 `Nexus` 统一归档

# 归档前提

归档前必须满足：

- 文档已完成当前阶段职责
- 不再需要作为当前活跃阶段的 canonical 输入
- 下游所需信息已转移到：
  - `.Nexus/0-fact/`
  - `.Nexus/4-review/`
  - `.Nexus/3-implement/.old/`
  - 或新的活跃方案文档
- `plan.md` 已记录状态变化

# 路径规则

归档目录：

- `.Nexus/1-research/.old/`
- `.Nexus/2-Scheme/.old/`
- `.Nexus/3-implement/.old/`
- `.Nexus/4-review/.old/`

若 `.old/` 不存在：
- 创建目录

若目标文件名冲突：
- 保留原文件名并追加时间戳或轮次标记
- 不得覆盖已有归档

# 归档失败处理

若归档动作因工具失败、路径缺失、权限问题无法完成：

- 必须返回 `BLOCKED`
- 明确写出：
  - 哪个文档归档失败
  - 应归档到哪里
  - 当前会对下一阶段造成什么影响
  - 建议谁处理