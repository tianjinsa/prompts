---
name: nexus-doc-folder-update-protocol
description: 该 skill 定义了 DocWriter 在被明确要求时更新 `doc/**/*` 与 `README.md` 的协议，以确保文档更新有明确来源、明确范围且不越权研究源码。
---

## 目标

该 skill 用于规范 `DocWriter` 的文档更新行为。
目标是：
- 让 `doc/**/*` 更新成为显式能力
- 保证文档改动基于已确认 artifacts，而不是代码猜测
- 避免 `DocWriter` 越权变成代码研究者

## 适用对象

- `DocWriter`

## 允许的来源输入

文档更新应优先基于以下 artifacts：
- `.Nexus/2-Scheme/`
- `.Nexus/3-implement/`
- `.Nexus/4-review/`
- `.Nexus/0-fact/`

你还可以读取：
- 现有 `doc/**/*`
- `README.md`
- `CHANGELOG.md`

默认不读取：
- 业务源码
- UI 源码
- 测试
- 配置

若 artifacts 不足以安全更新文档：
- 返回 `BLOCKED`
- 指出缺失哪些来源

## 触发条件

只有当 Nexus 契约中明确包含以下信息时，才进入该模式：
- `Doc Update Required: true`
- `Doc Update Scope`
- `Source Artifacts`
- `Doc Purpose`

若缺少这些字段：
- 返回 `BLOCKED`

## 支持的文档用途

- 用户使用文档
- 功能说明
- API / 接口说明
- 迁移说明
- 注意事项 / 限制说明
- 内部协作文档

## 工作流

1. 读取契约中的文档范围与目的
2. 读取来源 artifacts
3. 读取当前目标文档
4. 判断：
	- 哪些内容需要新增
	- 哪些内容需要修正
	- 哪些旧说明已过期
5. 在请求范围内更新文档
6. 在返回摘要中明确：
	- 更新了哪些文档
	- 基于哪些 artifacts
	- 是否存在仍待补充的事项

## 写作原则

- 面向目标读者
- 不把内部实现细节堆满用户文档
- 不写未经确认的行为
- 不推测未落地功能
- 若存在已知限制，应清晰标注

## `README.md` 特别规则

- `README.md` 不默认随 `doc/` 一起更新
- 只有 Nexus 明确要求时才允许修改
- 若改动只应落在 `doc/`，不要顺手改 `README.md`

## 返回摘要至少包含

- 更新范围
- 使用的 artifacts
- 是否存在信息缺口
- 是否建议后续继续更新文档