# Skill: nexus-review-fact-consistency
用于 `Reviewer` 审查 `.Nexus/0-fact/` 是否与真实代码一致。
---
# 核心原则
实现者更新后的 fact 在 Review PASS 前只是 pending fact。
Reviewer 必须把本轮 fact 当作待验证对象，而不是实现正确性的独立证据。
真实代码、测试结果、已确认 scheme 才是最终依据。
---
# 输入
Reviewer 应读取：
- 实现报告
- 实现报告列出的 fact 路径
- 相关真实代码文件
- 已确认 scheme
- 上一轮 review，若为修复轮
---
# 必查项
## 1. fact 路径是否存在
检查：
- 实现报告列出的 fact 文件是否存在
- 修改的主要代码文件是否有对应 fact
- fact 路径是否明显对应真实代码文件
## 2. fact 内容是否准确
检查 fact 是否真实描述：
- 文件职责
- 主要类 / 函数 / 组件
- 输入输出
- 字段语义
- 可空性
- 错误路径
- 状态变化
- 外部接口
- 调用约束
- 旧路径清理情况
## 3. fact 是否覆盖本轮变化
重点检查：
- 新增行为
- 删除行为
- 改名行为
- 字段变化
- 外部接口变化
- 错误语义变化
- 旧路径收口
## 4. UI fact 额外检查
若是 UI 改动，检查：
- 组件结构
- props / state 语义
- loading / empty / error / disabled 状态
- success / retry，若适用
- 响应式规则
- 无障碍行为
- 旧 UI 清理
- 上游接口字段依赖
---
# 严重度规则
## HIGH
以下情况必须 HIGH，且必须 FAIL：
- fact 与真实代码行为相反
- 外部接口变化未写入 fact
- 外部字段语义变化未写入 fact
- fact 描述了未实现行为
- fact 隐藏了 breaking change
- UI 依赖字段或状态语义错误，可能误导后续 UI 实现
- 实现报告称已更新 fact，但路径不存在
## MEDIUM
以下情况通常 MEDIUM，并通常 FAIL：
- 修改主要代码文件但未更新对应 fact
- fact 遗漏关键错误路径
- fact 遗漏关键边界条件
- UI fact 遗漏状态覆盖
- fact 仍描述旧路径但代码已删除
- fact 覆盖范围不完整且会影响后续 agent 判断
## LOW
以下情况可 LOW：
- fact 表述不够精确但不影响判断
- 非关键字段描述过于简略
- 缺少少量背景说明
- 格式轻微不一致
是否 FAIL 由 Reviewer 判断，但应优先保持 fact 缓存质量。
---
# 输出要求
Review 报告必须包含：
- Fact Files Reviewed
- Fact Accuracy Findings
- Missing Fact Coverage
- Fact Verdict: PASS / FAIL / PARTIAL / N/A
若 Fact Verdict 不是 PASS，必须写明：
- 哪些 fact 文件需要修正
- 应由哪个实现者修正
- 是否阻止提交
---
# 修复轮规则
若上一轮指出 fact 问题，本轮必须验证：
- fact 是否已修正
- 代码是否也相应修正
- 实现报告是否记录 fact fix
- 是否仍有 pending mismatch
未闭环则 FAIL。
---
# 不允许事项
Reviewer 不得：
- 自己修改 `.Nexus/0-fact/`
- 替实现者修正 fact
- 用 fact 代替真实代码审查
- 在 fact 明显错误时 PASS