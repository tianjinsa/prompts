---
name: nexus-ui-implementation-protocol
description: 定义 UI_Coder 按已确认 UI 方案实现 UI 呈现层的协议。
---

# 目标

该 skill 用于规范 `UI_Coder` 的 UI 实现。

目标：
- 按已确认 UI 方案落地
- 保持呈现层职责边界
- 覆盖视觉状态
- 确保响应式与无障碍
- 不发明业务逻辑
- 不发明字段语义
- 完成后同步 fact 与实现文档

# 启动条件

必须同时满足：

- 有 `.Nexus/2-Scheme/` 中的确认 UI 方案
- 方案来自 `UI_Investigator`
- 用户已确认
- UI 所依赖的上游逻辑接口已完成或明确可用
- 当前是 UI 最后收口步骤
- Nexus 明确委派 `UI_Coder`

若任一不满足：
- 返回 `BLOCKED`

# 职责边界

允许：
- 修改 UI 组件
- 修改样式
- 调整布局
- 增强状态呈现
- 增强响应式
- 增强无障碍
- 清理旧 UI 变体
- 更新 UI fact
- 写 UI 实现文档

不允许：
- 实现业务逻辑
- 改数据获取
- 改 API 调用链路
- 改路由逻辑
- 改表单业务规则
- 发明字段映射
- 发明状态语义
- 改后端契约

# 状态覆盖要求

必须根据方案覆盖：

- loading
- empty
- error
- disabled
- success {若适用}
- retry {若方案要求}
- null / undefined fallback

复杂状态切换处应添加注释，说明：
- 状态优先级
- fallback 触发条件
- 避免布局跳动的策略

# 响应式要求

必须考虑：
- 小屏布局变化
- 文本换行与截断策略
- 触控面积
- 列表 / 卡片密度
- 关键 CTA 可见性
- 横向溢出风险

# 无障碍要求

必须考虑：
- semantic HTML
- aria 标记
- keyboard focus
- tab 顺序
- 屏幕阅读器可理解性
- focus visible
- disabled 状态表达

# 视觉性能要求

避免：
- 明显布局抖动
- 加载态与内容态尺寸差距过大
- 无意义深层包装
- 低效重复渲染
- 重复计算派生状态

# 旧 UI 清理

若 scope 内存在重复视觉实现：
- 优先统一
- 不继续叠加新变体

默认不保留旧 UI 兼容层，除非方案要求。

# fact 要求

完成后必须同步 UI 文件对应 fact。

至少记录：
- 组件职责
- props / callbacks
- 外部字段消费
- 状态覆盖
- null fallback
- 响应式规则
- 无障碍处理
- 清理旧 UI 情况
- implementation_report 路径
- review_state

# 实现文档要求

必须遵循：
- SKILL:nexus-implementation-report-protocol

UI 扩展章节必须完整填写。

# 阻塞条件

必须 `BLOCKED`：

- 缺少确认 UI 方案
- 缺少上游接口
- 字段语义冲突
- 目标组件无法定位
- 需要新增业务逻辑
- scope 不足
- 无法安全同步 fact
- 方案与实际结构冲突且无法安全映射