---
name: nexus-scheme-archive-protocol
description: 该 skill 定义 `.Nexus` 方案与研究文档的归档协议，明确 scheme 生命周期由 Nexus 控制，避免 Reviewer 或 DocWriter 越权归档活跃方案。
---
## 目标
该 skill 用于统一 `.Nexus` 文档归档行为，避免：
- 同一种文档被不同 agent 用不同规则归档
- 研究、方案、实现、评审文档职责混乱
- 功能级 scheme 在后续步骤仍需要时被提前归档
- Reviewer 在单步 PASS 后误归档整个功能仍需要的 scheme
- DocWriter 继续承担已迁移出去的实现文档归档职责
---
## 文档类型划分
### `.Nexus/1-research/`
研究文档：
- 架构级方案研究
- 功能级预研方案
- UI 预研
- UI 设计方案
- 阻塞研究文档
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
---
## 归档总则
1. 归档不是删除。
2. 归档路径统一为对应目录下的 `.old/`。
3. 归档动作应发生在当前文档已完成其职责之后。
4. 不得归档仍作为活跃 canonical 输入的文档。
5. 若归档失败，必须返回终局状态，不得静默跳过。
6. 归档动作必须可追踪：
   - 原路径
   - 新路径
   - 归档原因
   - 执行者
   - 是否成功
---
## 职责分配总表
| 文档类型 | 创建者 | 归档控制者 | 归档执行者 |
|---|---|---|---|
| `.Nexus/1-research/` | Investigator / UI_Investigator | DocWriter | DocWriter |
| `.Nexus/2-Scheme/` | DocWriter / Investigator step plan | Nexus | Nexus 或 DocWriter |
| `.Nexus/3-implement/` | Generalist / UI_Coder | Reviewer | Reviewer |
| `.Nexus/4-review/` | Reviewer | Reviewer | Reviewer |
| `.Nexus/0-fact/` | Generalist / UI_Coder | 不归档 | 不归档 |
---
## DocWriter 的归档职责
### 研究文档归档
当用户确认研究方案并写入 `.Nexus/2-Scheme/` 后：
- `DocWriter` 必须将对应原研究文档移动到：
  - `.Nexus/1-research/.old/`
适用：
- 架构级方案研究
- 功能级预研方案
- UI 预研 / 设计方案，在其被确认并落盘后
### scheme 归档执行
DocWriter 只有在 Nexus 明确委托时，才可以归档 `.Nexus/2-Scheme/` 文档。
必须满足：
- Nexus 契约明确：
  - `DocWriter Mode: Scheme Archive`
- Nexus 指定待归档 scheme 路径
- Nexus 指定归档原因
DocWriter 不得自行判断 scheme 是否应该归档。
### 不再负责实现文档归档
DocWriter 不负责：
- `.Nexus/3-implement/`
- `.Nexus/3-implement/.old/`
实现文档归档由 `Reviewer` 在 PASS 后执行。
---
## Reviewer 的归档职责
### 实现文档归档
当当前轮评审 `PASS` 后：
- `Reviewer` 必须将对应实现文档移动到：
  - `.Nexus/3-implement/.old/`
FAIL 或 BLOCKED 时不得归档实现文档。
### 评审历史失败文档归档
当当前轮评审 `PASS`，且之前存在失败评审文档：
- `Reviewer` 应将旧评审文档移动到：
  - `.Nexus/4-review/.old/`
### 不自动归档 scheme
Reviewer 不得自动将 `.Nexus/2-Scheme/` 文档移动到 `.old/`。
Reviewer 只能在评审文档中写：
- `Scheme Archive Recommendation: true / false`
最终是否归档 scheme，由 Nexus 控制。
---
## Nexus 的归档职责
### scheme 生命周期控制
`.Nexus/2-Scheme/` 的归档时机由 Nexus 控制。
Nexus 可以：
- 自行移动 scheme 到 `.Nexus/2-Scheme/.old/`
- 或委托 `DocWriter` 执行 scheme 归档
Nexus 必须在 `.Nexus/plan.md` 中记录 scheme 归档动作。
---
## scheme 可归档时机
以下情况可考虑归档 scheme：
- 整个 feature 已完成
- 所有相关 step 已完成
- UI 手动确认已完成，若涉及 UI
- 所有实现均 Review PASS
- 所有实现文档已由 Reviewer 归档
- Nexus 已提交相关变更
- 后续流程不再依赖该 scheme 作为活跃输入
---
## 不得归档 scheme 的情况
不得归档 scheme：
- 当前 feature 仍有未完成 step
- UI step 尚未完成
- UI 尚未用户手动确认
- Review 尚未 PASS
- 实现文档尚未归档
- 后续 step 仍依赖该 scheme
- 用户尚未确认方案
- Nexus 未明确要求归档
- 当前任务可能继续基于该 scheme 推进
---
## 架构级方案文档
架构级 scheme 通常在以下情况后归档：
- 整个任务完成
- 或任务进入稳定执行阶段且不再需要架构方案作为活跃输入
- 或 Nexus 明确判断该架构方案已完成职责
归档控制者：
- Nexus
执行者：
- Nexus
- 或 Nexus 委托 DocWriter
---
## 功能级方案文档
功能级 scheme 通常在以下情况后归档：
- 对应 feature 完成
- 相关实现已 Review PASS
- 相关实现文档已归档
- fact 已经由 Reviewer 验证
- Nexus 已提交相关变更
- 后续 feature 不再依赖该 scheme
不得由 Reviewer 在单次 PASS 后自动归档。
---
## 复杂功能步骤文档
复杂功能步骤文档不得在某一步单独 PASS 时归档。
应在整个功能全部步骤完成后，由 Nexus 控制归档。
若步骤文档仍作为后续 step 输入，不得归档。
---
## UI 方案文档
UI 方案归档必须满足：
- UI 实现已完成
- Reviewer PASS
- 用户已手动确认 UI 效果
- Nexus 已提交 UI 变更
- 后续流程不再依赖该 UI scheme
若 UI 方案依附于复杂步骤链，并且仍需被后续步骤引用，则应延后归档。
---
## 归档命名
归档时应避免覆盖已有文件。
可使用：
- 原文件名
- 时间戳后缀
- task id 后缀
- feature id 后缀
若目标已存在，必须生成安全路径。
---
## 归档失败处理
若归档动作因工具失败、路径缺失、权限问题无法完成，必须返回 `BLOCKED`。
必须明确写出：
- 哪个文档归档失败
- 应归档到哪里
- 当前会对下一阶段造成什么影响
- 建议谁处理
---
## 与 `.Nexus/0-fact/` 的关系
`.Nexus/0-fact/` 不归档。
fact 由实现者更新，由 Reviewer 验证。
scheme 归档不得导致后续 agent 无法理解已提交代码事实；必要事实应已经存在于 `.Nexus/0-fact/` 或 Review 报告中。