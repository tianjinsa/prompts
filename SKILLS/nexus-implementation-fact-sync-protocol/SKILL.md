---
name: nexus-implementation-fact-sync-protocol
description: 该 skill 定义了 Generalist 和 UI_Coder 在实现完成后同步 .Nexus/0-fact/ 的协议，确保事实缓存与真实代码一致、可被 Reviewer 有效验证。
---

# .Nexus/0-fact/ 同步协议

## 目标
确保每次代码实现后，对应的 `.Nexus/0-fact/` 缓存与真实代码保持一致，为后续 agent 提供可信上下文，减少重复读取真实大文件。

## 适用者
- `Generalist`
- `UI_Coder`

## 同步时机
- 在完成代码修改后，写实现情况文档之前或同时
- 修复轮中，修改代码后必须同步更新 fact

## 同步范围
- 仅更新本次任务实际涉及的代码文件对应的 fact
- 不要求一次性覆盖整个仓库
- 若原 fact 不存在，且文件属于本次改动范围，则新建 fact 文件

## 事实要求
- 只写已确认事实
- 不写猜测
- 不写未实现内容
- 不写未来计划
- 不能确认的内容用 `[TODO: 需后续实现者或研究者确认]` 标记

## 文件映射
- 真实文件：`src/foo/bar.ts`
- fact 文件：`.Nexus/0-fact/src/foo/bar.ts.md`

## 编写风格
遵循 `SKILL:nexus-fact-cache-comment-style`。

## 与实现报告的关联
实现报告中的 Fact Coverage Matrix 必须列出：
- 每个修改的真实代码文件
- 对应的 fact 文件路径
- fact 是否已更新
- 如有未更新或部分更新，说明原因和缺口

## 同步后验证
- Reviewer 将独立审查 fact 与真实代码的一致性
- 你不得在 fact 中留下与代码行为相反的描述
- 外部接口、字段、状态语义的变化必须显式反映在 fact 中

## 阻塞条件
- 若对某块逻辑无法确认其真实行为，且无法通过阅读代码确定，应在 fact 中标注 TODO，不影响同步流程
- 若整个文件的行为无法归纳，应在实现报告中说明，由 Reviewer 协助判断