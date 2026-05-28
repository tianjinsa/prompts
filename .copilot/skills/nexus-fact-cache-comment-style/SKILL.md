---
name: nexus-fact-cache-comment-style
description: 该 skill 定义了 `.Nexus/0-fact/` 代码事实缓存层的 Frontmatter、Logic/UI 双模板、依赖追踪规则与编写边界，目标是让后续 agent 能快速消费稳定事实，而不是反复扫源码。
---

## 目标

`.Nexus/0-fact/` 是**代码事实缓存层**。
它的存在目标是：
- 避免后续 agent 反复读取大段真实代码
- 快速理解文件职责、核心入口、关键字段语义、状态覆盖与依赖关系
- 快速判断某个文件是否会影响后续步骤
- 为 `Investigator`、`Generalist`、`UI_Investigator`、`UI_Coder`、`Reviewer` 提供统一可消费的结构化事实
- 用“结构化摘要”精炼信息，而不是逐行翻译源码

当前流程中：
- `Generalist` / `UI_Coder` 负责在实现完成后同步相关 fact
- `Reviewer` 负责验证 fact 与真实代码是否一致，并检查模板合规性

## 懒建立原则

`0-fact` 采用懒建立：
- 只为当前任务涉及的代码文件建立或更新 fact
- 缺失 fact 不是 blocker
- 若 fact 不存在，可先由有权限的 agent 读取真实代码完成任务
- 任务闭环中的当前轮 fact，应由实现者补齐或更新，并由 `Reviewer` 验证
- 不要求为了“目录完整”而一次性补齐整个项目的 fact

## 文件映射规则

每个实际代码文件对应一个 fact 文档：
- 实际文件：
	- `src/foo/bar.ts`
- fact 文件：
	- `.Nexus/0-fact/src/foo/bar.ts.md`

规则：
- 保留相同相对路径
- 保留相同文件名
- 末尾追加 `.md`

## 编写风格总则

`0-fact` 应该像：
- 文件级摘要
- 对外契约摘要
- 关键流程摘要
- 状态与边界说明
- 依赖关系导航

而不是：
- 逐行复述源码
- 大段散文
- 把整份源码翻译成自然语言
- 靠猜测补行为
- 只写“这个函数用于处理数据”这类无信息量空话

## 核心设计原则

1. **先事实，后摘要**
- 所有内容都必须基于真实代码
- 只允许提炼，不允许猜测
- 无法确认的内容必须显式标记为：
	- `[TODO: 需后续实现者或研究者确认]`

2. **结构扁平优先**
- 使用固定 Frontmatter + 固定章节
- 减少旧版 `@class`、`@function`、`@field`、`@flow` 这种高维护成本的碎片标签
- 优先让后续 agent 能快速定位：
	- 这个文件负责什么
	- 它对外暴露什么
	- 它依赖谁
	- 谁依赖它
	- 哪些边界条件最重要

3. **按文件角色选择模板**
- 所有 fact 必须先判断文件角色
- 再选择对应模板
- 不允许 Logic 文件和 UI 文件混写同一种结构

4. **依赖追踪必须显式化**
- `depends_on` 与 `used_by` 不是可有可无的装饰项
- 它们是后续 agent 做路径导航和影响分析的关键输入
- 必须尽量写明直接依赖和直接消费者

5. **优先记录对后续步骤有价值的信息**
- 后续会被消费的接口
- 字段语义
- 错误 / 空值 / loading / disabled 等状态
- API 契约映射
- 关键调用链入口
- 本轮任务带来的外部行为变化

## Frontmatter 规范

每个 fact 文档顶部必须包含 Frontmatter：

yaml:{
---
path: [相对代码路径]
role: [Logic / UI / API / Config / Mixed]
summary: [1 句话概述该文件职责]
last_synced_from: [真实代码路径]
last_synced_by: [Generalist / UI_Coder / Reviewer]
---
}

字段说明：
- `path`
	- 必填
	- 对应真实代码的相对路径
- `role`
	- 必填
	- 用于决定使用哪个模板
- `summary`
	- 必填
	- 用一句话给出文件主职责
- `last_synced_from`
	- 必填
	- 一般与 `path` 相同
- `last_synced_by`
	- 必填
	- 记录最后同步该 fact 的 agent

补充规则：
- `API`、`Config`、`Mixed` 默认沿用 Logic 模板，除非未来另有专门模板
- 若 `role` 无法可靠判断，优先写 `Mixed`，并在正文中说明原因
- Frontmatter 不允许省略

## 模板选择规则

### 1. 使用 Logic 模板的典型文件
包括但不限于：
- service
- hook
- store
- controller
- util
- API 请求封装
- schema 组装逻辑
- 类型转换逻辑
- 数据聚合逻辑
- 纯配置读取逻辑
- 非视觉型状态管理模块

### 2. 使用 UI 模板的典型文件
包括但不限于：
- page
- component
- layout
- modal / panel / drawer
- 表单壳层
- 纯呈现组件
- 带明显视觉状态切换的容器组件

### 3. 选择冲突时的原则
- 若文件的核心职责是“视觉呈现 + 交互反馈”，优先 UI 模板
- 若文件的核心职责是“状态计算 / 数据处理 / 契约适配”，优先 Logic 模板
- 不允许因为文件里“顺手写了点 JSX”就误判为 UI
- 也不允许因为 UI 文件里“顺手有点本地状态”就误判为 Logic

## Logic Fact 模板

适用于 Logic / API / Config / Mixed 中以逻辑为主的文件。

md:{
# Fact: [relative/path/to/file]

## 1. Responsibility
- [一句话说明该文件核心职责]
- [若存在明确边界，也写清“不负责什么”]

## 2. Public Surface
- **Primary Exports**
	- `[exportName]`:
		- purpose: [导出对象 / 函数 / hook / store 的业务用途]
		- inputs: [关键输入，非逐参数抄写]
		- outputs: [关键输出 / 返回语义]
- **External Semantics**
	- [哪些导出会被其他模块直接依赖]
	- [哪些字段或状态是外部必须理解的]

## 3. Data & Contract Semantics
- **Key Fields / State**
	- `[fieldOrStateName]`:
		- meaning: [字段或状态语义]
		- nullable: [Yes / No / Conditional]
		- fallback: [默认值或回退行为]
- **API Contract Mapping**
	- `[Method] [Path or Contract Name]`:
		- request: [关键请求参数语义]
		- response: [关键返回结构语义]
		- error: [重要错误语义]
- 若当前文件不直接处理 API：
	- 写 `None`

## 4. Core Flow & Edge Cases
- **Main Flow**
	- 1. [关键步骤]
	- 2. [关键步骤]
	- 3. [关键步骤]
- **Failure / Empty / Boundary Handling**
	- [空值处理]
	- [错误传播或吞掉错误的位置]
	- [边界条件]
- **Side Effects**
	- [缓存写入 / 本地存储 / 路由跳转 / 全局事件 / 日志 / DB 写入]
	- 若无则写 `None`

## 5. Dependency Tracing
- **depends_on**
	- [.Nexus/0-fact/relative/path/to/dependency.md] — [依赖原因]
- **used_by**
	- [.Nexus/0-fact/relative/path/to/consumer.md] — [被谁以什么方式消费]
- 若当前轮无法确认某个消费者：
	- 写 `[TODO: consumer pending confirmation]`
- 若确实无已知依赖或消费者：
	- 写 `None`

## 6. Task-Relevant Notes
- [只记录对当前和后续任务判断有价值的事实]
- [例如：本轮新增外部接口、修改状态语义、删除旧入口]
- 无法确认的内容必须使用 TODO 标记
}

## UI Fact 模板

适用于 UI 组件、页面、布局等呈现层文件。

md:{
# Fact: [relative/path/to/file]

## 1. Responsibility
- [一句话说明该 UI 文件负责呈现什么]
- [若有明确边界，写清不负责哪些业务逻辑]

## 2. UI Contract Surface
- **Primary Exports**
	- `[ComponentName]`:
		- purpose: [组件 / 页面用途]
- **Key Props / Inputs**
	- `[propName]`:
		- meaning: [该输入控制什么视觉或交互]
		- required: [Yes / No / Conditional]
		- fallback: [缺失时如何表现]
- **Callbacks / Events**
	- `[callbackName]`:
		- trigger: [何时触发]
		- payload: [关键参数语义]
- **External State Expectations**
	- [该 UI 依赖哪些上游状态 / 字段 / 回调才能正常工作]

## 3. State Coverage
- **Loading**
	- trigger: [触发条件]
	- presentation: [呈现方式]
- **Empty**
	- trigger: [触发条件]
	- presentation: [呈现方式]
- **Error**
	- trigger: [触发条件]
	- presentation: [提示 / 重试 / 降级]
- **Disabled**
	- trigger: [触发条件]
	- presentation: [禁用方式]
- **Success / Ready**
	- presentation: [正常完成时的关键可见状态]
- 若某状态不适用：
	- 明确写 `Not Applicable`

## 4. Responsive & Accessibility
- **Responsive Rules**
	- [关键断点规则]
	- [布局折叠 / 列表密度 / 文本截断 / CTA 可见性]
- **Accessibility**
	- [semantic 结构]
	- [focus 顺序]
	- [aria 语义]
	- [键盘操作要求]
- 若当前文件无特殊响应式或无障碍约束：
	- 也要明确写 `Basic only`

## 5. Dependency Tracing
- **depends_on**
	- [.Nexus/0-fact/relative/path/to/dependency.md] — [依赖的逻辑模块 / 子组件 / 样式系统]
- **used_by**
	- [.Nexus/0-fact/relative/path/to/consumer.md] — [被哪个页面 / 容器 / 父组件消费]
- 若当前轮无法确认某个消费者：
	- 写 `[TODO: consumer pending confirmation]`
- 若确实无已知依赖或消费者：
	- 写 `None`

## 6. Task-Relevant Notes
- [本轮新增或移除的 UI 入口]
- [本轮状态覆盖变化]
- [本轮响应式或无障碍变化]
- [本轮删除的旧 UI 变体或兼容壳]
- 无法确认的内容必须使用 TODO 标记
}

## 编写优先级

优先记录：
1. 对外入口
2. 关键字段 / props / state / callback 语义
3. 核心流程或核心状态覆盖
4. 错误 / 空值 / 边界路径
5. 依赖关系与消费者
6. 当前任务造成的变化

若是 UI 文件，额外优先记录：
- loading / empty / error / disabled 等状态覆盖
- 关键 props / state 语义
- 响应式规则
- 无障碍要点
- 本轮删除或合并的旧 UI 入口

## 事实要求

- 只写已确认事实
- 不根据命名猜测行为
- 不能确认的内容用 TODO 标记
- 若本次任务改变了文件职责、字段语义或流程，应显式更新对应章节
- 若本次任务新增了对外接口、外部字段、状态语义或错误语义，必须在 fact 中体现
- 若本次任务新增了会被后续步骤依赖的稳定输出，必须在 fact 中清楚表达其语义
- 若某项信息在真实代码中已不存在，必须从 fact 中删除，而不是保留过期描述
- 不允许把过期事实继续留作“可能以后有用”的注释缓存

## Reviewer 校验重点

`Reviewer` 在审查 fact 时，至少要检查：
- 是否存在 Frontmatter
- `role` 是否匹配真实文件职责
- 是否使用了正确模板
- 章节是否足以支持后续 agent 消费
- `depends_on` / `used_by` 是否表达了真实依赖关系
- 新增或修改的接口 / 状态 / 错误语义是否已同步进入 fact
- fact 是否与真实代码冲突、过期或遗漏关键变化

## 禁止事项

禁止把 fact 写成：
- 逐行源码翻译
- 空洞的函数列表
- 没有语义的字段罗列
- 完全不写依赖关系
- 只写 happy path，不写错误和边界
- 只写“做了修改”，不写修改后外部语义是什么