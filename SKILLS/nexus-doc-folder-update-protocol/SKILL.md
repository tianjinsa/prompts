---
name: nexus-doc-folder-update-protocol
description: 该 skill 定义了 DocWriter 在 Doc Folder Update Mode 下更新 doc/ 文件夹的规则、范围、输入来源和输出格式。
---

# Doc Folder Update Mode

## 触发条件
- Nexus 契约中明确包含：
	- `Doc Update Required: true`
	- `Doc Scope: doc/**/*`（或具体路径）
	- `Doc Purpose: 用户文档 / 架构说明 / 使用说明 / 迁移说明 / API 说明` 等
	- `Source Artifacts: list of fact / scheme / review / implement report paths`

## 前提
- 对应的代码实现已经 Reviewer PASS，且 fact 已经过验证
- 若 artifacts 不足以支持准确更新，应返回 `BLOCKED`

## 允许读取的内容
- `.Nexus/0-fact/`
- `.Nexus/2-Scheme/`
- `.Nexus/3-implement/` 及 `.old/`
- `.Nexus/4-review/` 及 `.old/`
- `doc/**/*`
- 可选 `CHANGELOG.md` 和 `README.md`（仅当契约明确要求）
- 不建议读取业务源码

## 不允许
- 修改代码
- 猜测未在 artifacts 中确认的行为
- 扩大 scope 外的文档修改

## 工作流
1. 读取契约中的 Doc Scope 和 Purpose
2. 读取指定的 Source Artifacts
3. 读取当前 `doc/` 中相关文件
4. 更新文档，保持原有风格和结构
5. 记录变更清单

## 输出
- 返回更新摘要，包含：
	- 更新的文件路径
	- 每个文件的主要修改内容概述
	- 是否还有其他需要说明的缺口