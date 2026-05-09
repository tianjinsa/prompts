---
name: nexus-ui-code
description: 定义 UI 研究与 UI 实现应遵循的通用视觉、布局、状态、响应式与无障碍设计原则。
---

# 目标

该 skill 为 UI 相关 agent 提供统一设计原则。

可使用
SKILL: design-ui 辅助设计方案，但最终输出必须符合该 skill 定义的原则。

适用：
- `UI_Investigator`
- `UI_Coder`
- `Generalist` UI fallback

目标：
- 视觉层次清晰
- 状态表达完整
- 交互反馈明确
- 响应式可用
- 无障碍安全
- 避免布局跳动
- 保持产品一致性

# 视觉层次

应确保：

- 主信息优先
- 次信息弱化
- 行动按钮层级明确
- 页面分区清晰
- 密度与留白平衡
- 视觉焦点不被装饰元素干扰

避免：
- 所有元素同等强调
- 过多边框和阴影堆叠
- CTA 不明显
- 错误状态不突出
- 空状态过于像普通内容

# 布局原则

应确保：

- 结构能被快速扫读
- 相关信息靠近
- 不相关信息分离
- 列表、卡片、表单保持一致节奏
- 关键操作在常见视口下可见

避免：
- 无意义深层嵌套
- 小屏横向滚动
- 内容加载后大幅跳动
- 重要信息被折叠到不可发现位置

# 状态设计

必须考虑：

- loading
- empty
- error
- disabled
- success
- retry
- partial data
- null / undefined fallback

状态优先级应明确。

常见优先级：

1. fatal error
2. loading initial
3. empty
4. content with partial warning
5. normal content
6. disabled interaction

实际优先级以方案和业务语义为准。

# 反馈原则

用户操作应有反馈：

- 点击后有响应
- 异步操作有 loading 或 disabled
- 失败有原因说明
- 可重试时提供 retry
- 成功状态不过度打扰

# 响应式原则

小屏下应确保：

- 文本可读
- 操作可点击
- 关键 CTA 不丢失
- 卡片 / 列表密度合理
- 表格有可用降级策略
- 不依赖 hover 才可操作

# 无障碍原则

必须考虑：

- semantic HTML
- aria-label / aria-describedby
- keyboard navigation
- focus visible
- 合理 tab 顺序
- 色彩不能作为唯一信息来源
- 错误信息能被读屏理解
- disabled 状态能被辅助技术理解

# 动效原则

可使用动效增强体验，但必须：

- 不影响可用性
- 不制造明显布局跳动
- 不让 loading 看起来卡死
- 不过度吸引注意力
- 尊重用户动态偏好 {若项目已有支持}

# 视觉一致性

优先复用项目已有：

- 设计 token
- spacing scale
- typography scale
- color variables
- 基础组件
- 图标风格
- 表单控件风格

不得无依据引入全新视觉体系。

# 文案原则

UI 文案应：

- 简短
- 明确
- 面向用户结果
- 错误信息可行动
- 空状态说明下一步

避免：
- 技术内部术语暴露给普通用户
- 模糊错误
- 过度幽默
- 没有下一步的空状态

# UI 质量自检

提交前检查：

- 主路径是否清晰？
- loading / empty / error / disabled 是否覆盖？
- 小屏是否可用？
- 键盘是否可操作？
- 焦点是否可见？
- 读屏是否能理解关键控件？
- 是否有明显布局跳动？
- 是否引入无依据新视觉风格？
- 是否误写业务逻辑？