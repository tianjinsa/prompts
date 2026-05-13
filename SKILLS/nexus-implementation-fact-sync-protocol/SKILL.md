---
name: nexus-implementation-fact-sync-protocol
description: 用于 `Generalist` 和 `UI_Coder` 在实现完成后同步 `.Nexus/0-fact/`。
---
# 核心原则
`.Nexus/0-fact/` 是代码事实缓存。
实现者在完成代码修改后，必须同步本次触达文件的事实。
这些 fact 在 `Reviewer PASS` 前视为 pending fact。
Reviewer 会验证 fact 是否与真实代码一致。
---
# 适用者
- `Generalist`
- `UI_Coder`
不适用：
- `DocWriter`
- `Investigator`
- `UI_Investigator`
- `Nexus`
---
# 写入范围
允许写入：
- `.Nexus/0-fact/**/*`
只允许更新本次任务涉及的代码文件对应 fact。
不得为了“顺手完善”大范围更新无关 fact。
---
# 同步时机
必须在以下动作完成后同步 fact：
1. 代码实现完成
2. 测试或必要验证执行完成
3. 实现报告写入前或写入过程中
最终实现报告必须列出 fact 更新路径。
---
# fact 内容要求
fact 必须写真实代码已经具备的事实。
必须覆盖：
- 文件职责
- 主要类 / 函数 / 组件
- 输入
- 输出
- 关键字段语义
- 可空性
- 错误路径
- 状态变化
- 外部接口影响
- 调用方影响
- 旧路径清理情况
- 本轮新增或删除的行为
不得写：
- 猜测
- 未来计划
- 未实现内容
- 用户未确认的产品口径
- 与真实代码不一致的描述
- “应该会”但未经实现确认的行为
---
# UI fact 额外要求
若是 UI 文件或 UI fallback 实现，fact 必须额外覆盖：
- 组件 / 页面结构
- props 语义
- state 语义
- loading 状态
- empty 状态
- error 状态
- disabled 状态
- success 状态，若适用
- retry 行为，若适用
- 响应式规则
- 无障碍行为
- 焦点和键盘交互，若适用
- 旧 UI 变体清理情况
- 上游逻辑字段和回调依赖
---
# Fact Coverage Matrix
实现报告中必须包含类似信息：
- Code File
- Changed?
- Fact File
- Fact Updated?
- Known Fact Gaps
- Reviewer Should Verify
如果某个代码文件被修改但没有对应 fact，必须解释原因。
可接受原因：
- 文件是测试文件
- 文件是纯配置或生成文件
- 文件不包含可复用代码事实
- Nexus 契约明确无需 fact
不可接受原因：
- 忘记更新
- 文件太小
- 后续再补
- Reviewer 会处理
---
# 命名建议
fact 文件路径应能映射真实代码文件。
推荐规则：
- 保留相对路径语义
- 使用安全文件名
- 一个真实代码文件对应一个 fact 文件
- 若项目已有既定命名规则，优先遵守既有规则
示例描述：
- `src/foo/bar.ts` 可对应 `.Nexus/0-fact/src/foo/bar.ts.md`
- `components/UserCard.tsx` 可对应 `.Nexus/0-fact/components/UserCard.tsx.md`
---
# 无法同步时
若无法同步 fact，必须返回 `BLOCKED`。
常见原因：
- 无法确认真实代码行为
- scope 不足以读取相关文件
- fact 路径规则冲突
- 工具失败
- 实现本身未完成
- 代码与方案冲突，不能安全描述事实
不得在 fact 缺失的情况下返回 PASS。
---
# 修复轮规则
若 Reviewer 指出 fact 错误：
- 必须优先读取失败评审文档
- 修正代码或 fact 中的问题
- 更新原实现报告
- 不创建新的实现报告
- 返回时明确列出已修正 fact
---
# Reviewer 关系
你写入的 fact 不会自动被视为可信事实。
Reviewer 会检查：
- fact 是否存在
- fact 是否覆盖主要变更
- fact 是否与真实代码一致
- fact 是否遗漏关键字段 / 状态 / 错误语义
fact 错误可能导致 Review FAIL。
---
# 返回要求
实现者终局返回必须包含：
- 实现报告路径
- 修改文件摘要
- fact 文件路径
- 验证结果
- 是否需要 Review
若 fact 未更新，必须说明原因；若原因不可接受，应返回 `BLOCKED`。