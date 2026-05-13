---
name: nexus-scheme-archive-protocol
description: 该 skill 定义了 .Nexus 文档的归档协议，明确各 agent 的归档职责、路径和时机。已根据新流程调整。
---

## 目标

该 skill 用于统一 `.Nexus` 文档的归档行为，避免同一文档被不同 agent 用不同规则归档。

## 文档类型与归档职责速查

| Artifact | Created by | Archived by | Archive Path |
|---|---:|---:|---:|
| `.Nexus/1-research/` | Investigator / UI_Investigator | DocWriter | `.Nexus/1-research/.old/` |
| `.Nexus/2-Scheme/` | DocWriter / Investigator | Nexus (可委托 DocWriter) | `.Nexus/2-Scheme/.old/` |
| `.Nexus/3-implement/` | Generalist / UI_Coder | Reviewer (PASS后) | `.Nexus/3-implement/.old/` |
| `.Nexus/4-review/` | Reviewer | Reviewer (旧失败评审) | `.Nexus/4-review/.old/` |
| `.Nexus/0-fact/` | Generalist / UI_Coder | 不归档，持续更新 | N/A |

## 归档总则

1. 归档不是删除
2. 归档路径统一为对应目录下的 `.old/`
3. 归档动作应发生在**当前文档已完成其职责**之后
4. 若归档失败，必须返回终局状态，不得静默跳过

## DocWriter 的归档职责

### 研究文档归档
当用户确认研究方案并写入 `.Nexus/2-Scheme/` 后：
- `DocWriter` 必须将对应原研究文档移动到 `.Nexus/1-research/.old/`

适用：
- 架构级方案
- 功能级预研方案
- UI 预研/设计方案

## Reviewer 的归档职责

### 实现文档归档
当本轮评审 `PASS` 后：
- `Reviewer` 必须将当前实现文档移动到 `.Nexus/3-implement/.old/`
- 不归档案失败文档（继续复用）
- 不归档任何 `.Nexus/2-Scheme/` 文档

### 评审历史失败文档归档
当本轮评审 `PASS`，且之前存在失败评审文档：
- `Reviewer` 应将旧评审文档移动到 `.Nexus/4-review/.old/`

## Nexus 的归档职责

### 方案文档归档
- 步骤文档：整个功能所有步骤完成后，由 Nexus 移动到 `.Nexus/2-Scheme/.old/`（或委托 DocWriter）
- 架构级方案文档：任务进入后续稳定执行阶段后，由 Nexus 控制归档时机

## 归档前提

归档前必须满足：
- 文档已完成当前阶段职责
- 不再需要作为当前活跃阶段的 canonical 输入
- 下游所需信息已转移到方案、fact 或新的活跃文档

## 归档失败处理

若归档动作失败：
- 必须返回 `BLOCKED`
- 明确写出：哪个文档归档失败、应归档到哪里、对下一阶段的影响