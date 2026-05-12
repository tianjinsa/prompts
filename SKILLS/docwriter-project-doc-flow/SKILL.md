---
name: docwriter-project-doc-flow
description: DocWriter 在 Nexus 明确要求时更新 doc/、README.md 与任务完成阶段追加 CHANGELOG.md 的项目文档流程。
---

# 目标

该 skill 用于规范 `DocWriter` 对项目文档的更新。

覆盖：
- `doc/**/*`
- `README.md`
- `CHANGELOG.md`

不覆盖：
- `.Nexus/0-fact/`
- 业务源码
- UI 源码
- 测试
- 配置
- `.Nexus/3-implement/.old/`
- `.Nexus/4-review/.old/`

# 启用条件

## doc/ 或 README.md

只有 Nexus 明确提供以下字段时才启用：

- `Doc Update Requested: true`
- `Doc Scope`
- `Doc Audience`
- `Source Artifacts`
- `Must Include`
- `Must Not Include`
- `Allow New Files`
- `Allow Delete / Rename`

若缺失：
- 返回 `BLOCKED`

## CHANGELOG.md

只有当前阶段为任务完成阶段时才启用。

必须提供：
- Task ID
- Task Summary
- Completed Features
- Review Status
- Source Artifacts

# 允许写入

- `doc/**/*`
- `README.md`
- `CHANGELOG.md`

# 禁止写入

- `.Nexus/0-fact/`
- 业务源码
- UI 源码
- 测试
- 配置
- `.Nexus/3-implement/.old/`
- `.Nexus/4-review/.old/`

# 信息来源优先级

文档内容必须基于可信 artifact。

优先级：

1. 用户明确要求
2. `.Nexus/2-Scheme/` 已确认方案
3. `.Nexus/4-review/` PASS 结论
4. `.Nexus/3-implement/` 或 `.Nexus/3-implement/.old/` 实现文档
5. `.Nexus/0-fact/` 当前事实缓存
6. `.Nexus/1-research/.old/` 历史研究背景 {仅作为背景，不作为最终事实}

# doc/ 更新规则

必须：
- 先读取目标文档
- 按 Nexus 指定范围更新
- 面向指定读者写作
- 只记录已确认行为
- 不把内部实现细节写成公共承诺
- 标明用户真正需要知道的接口、流程、限制或注意事项

不得：
- 大范围重写无关文档
- 顺手新增不在 scope 内的章节
- 编造未确认 API 行为
- 编造字段语义
- 把 PENDING_REVIEW 的事实写成稳定文档
- 在未明确要求时修改 README.md

# README.md 更新规则

README 更新必须更谨慎。

只有当 Nexus 明确要求 README 更新时才允许。

适合写入 README 的内容：
- 安装 / 运行方式变化
- 公共入口变化
- 用户可见能力变化
- 重要配置说明变化
- 链接到 doc/ 的入口

不适合写入 README：
- 细碎实现细节
- 内部类职责
- 未确认 roadmap
- 单次任务过程记录

# CHANGELOG.md 更新规则

仅任务完成阶段追加。

要求：
- 只追加条目
- 不修改历史条目
- 不负责版本号
- 不负责版本分段
- 不写实现细节流水账
- 用用户或维护者可理解的语言描述变化

推荐结构：

## Unreleased

- Added: ...
- Changed: ...
- Fixed: ...
- Removed: ...

若项目已有固定格式：
- 遵循现有格式

# 必须阻塞的情况

出现以下任一情况，返回 `BLOCKED`：

- doc 更新目标不清
- 缺少 source artifacts
- 文档要求与方案或 review 结论冲突
- 需要读取业务代码才能确认，但 Nexus 未提供可信 artifact
- 目标文档不存在且 Nexus 未允许新增
- 要删除或重命名文档但 Nexus 未授权
- 需要写未确认事实

# 输出要求

返回必须包含：

- Updated doc paths
- Added doc paths
- Removed doc paths
- README Updated
- CHANGELOG Updated
- Source artifacts consumed
- Public behavior documented
- Known omissions
- Status