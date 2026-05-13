# 数据模型示例
## SQL（通用）
```sql
-- 细分权限表
CREATE TABLE permissions (
    id          BIGINT PRIMARY KEY AUTO_INCREMENT,
    code        VARCHAR(100) NOT NULL UNIQUE,  -- 如 user:create, order:export
    resource    VARCHAR(50)  NOT NULL,          -- 资源类型
    action      VARCHAR(50)  NOT NULL,          -- 操作类型
    description VARCHAR(255),
    group_name  VARCHAR(50),                    -- 权限分组
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- 角色预设表
CREATE TABLE role_presets (
    id          BIGINT PRIMARY KEY AUTO_INCREMENT,
    name        VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(255),
    is_system   BOOLEAN DEFAULT FALSE,         -- 系统预设不可删除
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- 角色预设-权限关联
CREATE TABLE role_preset_permissions (
    role_preset_id BIGINT NOT NULL,
    permission_id  BIGINT NOT NULL,
    PRIMARY KEY (role_preset_id, permission_id),
    FOREIGN KEY (role_preset_id) REFERENCES role_presets(id) ON DELETE CASCADE,
    FOREIGN KEY (permission_id)  REFERENCES permissions(id)  ON DELETE CASCADE
);
-- 用户-角色预设关联
CREATE TABLE user_roles (
    user_id      BIGINT NOT NULL,
    role_preset_id BIGINT NOT NULL,
    granted_by   BIGINT,
    granted_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at   TIMESTAMP NULL,               -- 支持有效期
    PRIMARY KEY (user_id, role_preset_id),
    FOREIGN KEY (role_preset_id) REFERENCES role_presets(id)
);
-- 用户直接权限
CREATE TABLE user_permissions (
    user_id       BIGINT NOT NULL,
    permission_id BIGINT NOT NULL,
    granted       BOOLEAN DEFAULT TRUE,        -- TRUE=授予, FALSE=显式拒绝（deny 优先）
    granted_by    BIGINT,
    granted_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at    TIMESTAMP NULL,
    source        VARCHAR(50),                  -- 来源：admin_grant, self_request 等
    PRIMARY KEY (user_id, permission_id),
    FOREIGN KEY (permission_id) REFERENCES permissions(id)
);
-- 权限审计日志
CREATE TABLE permission_audit_logs (
    id          BIGINT PRIMARY KEY AUTO_INCREMENT,
    operator_id BIGINT NOT NULL,               -- 操作者
    target_user_id BIGINT NOT NULL,            -- 被操作用户
    action      VARCHAR(20) NOT NULL,          -- grant, revoke, assign_role, remove_role
    detail      JSON,                          -- 操作详情
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- 索引
CREATE INDEX idx_user_roles_user ON user_roles(user_id);
CREATE INDEX idx_user_perms_user ON user_permissions(user_id);
CREATE INDEX idx_perms_resource ON permissions(resource, action);
CREATE INDEX idx_audit_target ON permission_audit_logs(target_user_id, created_at);
```
## 用户最终权限合并算法
```sql
-- 查询用户最终权限（合并视图）
-- 逻辑：直接权限优先于角色预设权限，deny 覆盖 allow
SELECT DISTINCT p.code, p.resource, p.action,
    CASE
        WHEN up.granted = FALSE THEN 'denied'      -- 显式拒绝，最高优先
        WHEN up.granted = TRUE  THEN 'direct_grant' -- 直接授予
        ELSE 'via_role'                               -- 通过角色预设
    END AS source
FROM permissions p
-- 直接权限
LEFT JOIN user_permissions up ON up.permission_id = p.id AND up.user_id = :user_id
    AND (up.expires_at IS NULL OR up.expires_at > NOW())
-- 角色预设权限
LEFT JOIN role_preset_permissions rpp ON rpp.permission_id = p.id
LEFT JOIN user_roles ur ON ur.role_preset_id = rpp.role_preset_id AND ur.user_id = :user_id
    AND (ur.expires_at IS NULL OR ur.expires_at > NOW())
WHERE up.id IS NOT NULL OR ur.id IS NOT NULL
HAVING source != 'denied';  -- 排除显式拒绝
```
## MongoDB（文档型）
```js
// 用户文档中的权限结构
{
  _id: ObjectId("..."),
  username: "alice",
  // 直接权限（细分权限）
  directPermissions: [
    { code: "order:export", granted: true, grantedBy: "admin1", expiresAt: null },
    { code: "user:delete", granted: false, grantedBy: "admin1", note: "安全限制" }
  ],
  // 分配的角色预设
  roles: [
    { presetId: ObjectId("..."), name: "editor", assignedAt: new Date() }
  ]
}
// 角色预设文档
{
  _id: ObjectId("..."),
  name: "editor",
  description: "内容编辑者",
  isSystem: true,
  permissions: ["post:create", "post:edit", "post:publish", "media:upload"]
}
```
