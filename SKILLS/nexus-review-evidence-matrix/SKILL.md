---
name: nexus-review-evidence-matrix
description: 该 skill 定义了 Reviewer 在评审时必须遵守的证据驱动评审协议，包含 fact 一致性审查要求。
---

## 目标

该 skill 用于让 `Reviewer` 以证据驱动方式评审，包括对本次实现更新的 `.Nexus/0-fact/` 进行一致性验证。

## 输入读取顺序

`Reviewer` 必须按以下顺序读取：
1. 旧版 `.Nexus/0-fact/`（作为上下文）
2. `.Nexus/2-Scheme/`
3. `.Nexus/3-implement/` 实现报告（含 Fact Coverage Matrix）
4. 本次更新的 `.Nexus/0-fact/`（作为待验证对象）
5. 真实源码
6. 测试 / 构建 / 类型检查配置

## 验收证据矩阵

对每个验收点建立矩阵：
- 验收项
- 证据类型（static / automated / manual-ui / unverified）
- 证据来源
- 当前结论（pass / fail / partial / needs-user-review）

## 静态审查维度

必须检查：
- 逻辑正确性
- 错误处理
- 边界条件
- 结构收口完整性
- 是否遗留旧路径
- 是否引入无依据兼容层
- 是否与确认方案冲突
- 若是 UI：方案来源是否正确、字段/状态/回调是否与上游一致

## Fact 一致性审查维度

- 按 `SKILL:nexus-review-fact-consistency` 执行
- 验证实现报告中的 Fact Coverage Matrix 是否准确
- 验证每个更新 fact 是否与真实代码一致
- 验证是否存在遗漏 fact 更新的代码改动

## 测试补强规则

若现有测试不能覆盖关键风险：
- `Reviewer` 可以新增或修改自动化测试
- 不得借补测试偷偷修业务实现逻辑

## 真实执行规则

必须真实执行可用命令并记录结果，禁止“理论上通过”。

## 严重度判定

### HIGH
- 明确逻辑错误、崩溃风险、核心验收失败
- 关键接口/字段语义错误
- fact 与代码严重不符
- UI 在无确认方案或无上游接口下强行实现

### MEDIUM
- 结构不完整、遗留兼容层、部分状态覆盖缺失
- fact 遗漏非致命信息
- UI 流程前置不规范

### LOW
- 可维护性问题、轻微一致性问题

## 通过 / 不通过门

- 存在 HIGH 必须 FAIL
- 关键验收项无证据不得轻易 PASS
- 测试环境损坏导致关键验证无法进行应 BLOCKED
- fact 错误可导致 FAIL