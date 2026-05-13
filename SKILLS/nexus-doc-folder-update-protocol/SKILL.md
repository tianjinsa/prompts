---
name: nexus-doc-folder-update-protocol
description: 用于 `DocWriter` 在 Nexus 明确要求时更新 `doc/**/*` 或 `README.md`。
---
# 适用场景
当 Nexus 契约明确：
- `DocWriter Mode: Doc Folder Update`
或：
- `DocWriter Mode: README Update`
时使用本 skill。
---
# 核心原则
DocWriter 是文档作者，不是代码研究者。
文档更新必须基于可信 artifacts，而不是自行读取源码推断。
可信来源包括：
- 已确认 scheme
- PASS review 报告
- 已验证 fact
- 实现报告中的 Doc Impact
- 用户明确要求
- Nexus 契约
---
# doc/ 更新权限
允许更新：
- `doc/**/*`
前提：
- Nexus 明确要求
- 契约给出 `Doc Scope`
- 契约给出 `Doc Purpose`
- 契约给出 source artifacts
不要求“文档更新本身满足简单问题判定”。
---
# README 更新权限
`README.md` 只能在明确授权下更新。
必须满足：
- `May Update README.md: true`
或用户明确要求。
README 更新应尽量小而准确。
---
# 不允许事项
不得：
- 修改业务源码
- 修改 UI 源码
- 修改测试
- 修改配置
- 修改 `.Nexus/0-fact/`
- 自行阅读业务代码推断文档事实
- 写未经确认的产品承诺
- 把实现细节包装成用户保证
- 大范围重写无关文档
---
# 文档更新策略
## 1. 用户文档
强调：
- 用户能做什么
- 行为如何变化
- 如何使用
- 注意事项
- 限制条件
避免：
- 过多内部类名
- 未确认路线图
- 未实现功能
## 2. 架构文档
强调：
- 模块职责
- 数据流
- 接口边界
- 旧路径清理
- 迁移结果
必须基于 scheme 和 review。
## 3. API / 字段文档
必须写清：
- 字段含义
- 类型
- 可空性
- 默认值
- 错误语义
- 消费方
- breaking change
若 artifacts 不足，返回 `BLOCKED`。
## 4. 迁移文档
必须写清：
- 旧行为
- 新行为
- 是否兼容
- 用户需要做什么
- 删除了什么
- 风险
---
# BLOCKED 条件
出现以下任一情况，必须返回 `BLOCKED`：
- 缺少 source artifacts
- artifacts 之间冲突
- 需要读取代码才能判断
- 文档口径涉及产品决策
- README 未授权
- doc scope 不明确
- 目标路径不在允许范围
- 用户可见行为尚未 Review PASS
- UI 视觉结果尚未用户确认但文档要宣称最终效果
---
# 输出要求
返回中必须列出：
- 更新的 doc 路径
- README 是否更新
- 使用的 source artifacts
- 是否存在未确认 TODO
- 是否建议 Nexus 追加提交