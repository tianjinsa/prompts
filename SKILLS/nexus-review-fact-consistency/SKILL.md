---
name: nexus-review-fact-consistency
description: 该 skill 定义了 Reviewer 在评审时必须执行的 fact 一致性审查流程，确保实现者更新的 .Nexus/0-fact/ 与真实代码一致。
---

# Fact 一致性审查

## 目标
验证实现者在当前实现中更新的 `.Nexus/0-fact/` 是否准确反映真实代码状态，防止错误事实缓存污染后续 agent。

## 审查原则
- 本轮更新的 fact 是待验证对象，不能作为实现正确性的独立证据
- 真实代码是 fact 是否准确的唯一依据
- 方案契约是判断实现是否正确的依据

## 审查步骤
1. 从实现报告的 Fact Coverage Matrix 中获取声称已更新的 fact 文件列表
2. 对每个声称已更新的 fact：
	- 读取 fact 文件
	- 读取对应的真实代码文件
	- 逐项核对 fact 中的描述是否与真实代码一致
3. 检查是否存在修改的代码文件但没有对应 fact 更新（遗漏）
4. 给出 Fact Verdict

## 一致性检查要点
- 外部接口签名、输入输出与 fact 描述一致
- 字段语义、可空性、默认值与代码一致
- 核心流程、分支逻辑、错误路径与代码一致
- 调用关系、依赖项与代码一致
- 若代码中有状态覆盖、边界处理，fact 中应有对应描述

## 判定标准

| 情况 | 严重度 | 建议动作 |
|---|---:|---|
| 涉及外部接口/字段变化但 fact 未更新 | HIGH | FAIL |
| fact 内容与真实代码行为相反 | HIGH | FAIL |
| 代码改动但实现报告未列出 fact 更新 | MEDIUM / HIGH | FAIL |
| fact 遗漏关键边界/错误态 | MEDIUM / HIGH | 视影响 FAIL |
| fact 少量描述不完整但不影响后续判断 | LOW | PASS with note，建议仍要求修正 |
| UI 改动未记录状态覆盖/响应式/无障碍要点 | MEDIUM | FAIL |

## 输出要求
在评审文档中必须包含 Fact Consistency Review 章节，包含：
- Fact Files Checked
- Fact Accuracy Findings
- Missing Fact Coverage
- Fact Verdict: PASS / FAIL / PARTIAL