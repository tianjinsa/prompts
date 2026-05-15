# API 设计示例

## RESTful 风格

### 权限管理

```
GET    /api/permissions                          # 列表（支持分组筛选）
GET    /api/permissions/:id                      # 详情
POST   /api/permissions                          # 创建权限
PUT    /api/permissions/:id                      # 更新
DELETE /api/permissions/:id                      # 删除
```

### 角色预设管理

```
GET    /api/role-presets                         # 列表
GET    /api/role-presets/:id                     # 详情（含权限列表）
POST   /api/role-presets                         # 创建预设
PUT    /api/role-presets/:id                     # 更新基本信息
DELETE /api/role-presets/:id                     # 删除（系统预设返回 403）

GET    /api/role-presets/:id/permissions         # 预设包含的权限
PUT    /api/role-presets/:id/permissions         # 批量设置预设权限
POST   /api/role-presets/:id/permissions         # 添加权限到预设
DELETE /api/role-presets/:id/permissions/:permId # 从预设移除权限
```

### 用户权限管理

```
GET    /api/users/:id/roles                      # 用户的角色预设列表
POST   /api/users/:id/roles                      # 分配角色预设
DELETE /api/users/:id/roles/:roleId              # 撤销角色预设

GET    /api/users/:id/permissions                # 用户最终权限（合并视图）
GET    /api/users/:id/permissions?detail=source  # 含来源追溯
POST   /api/users/:id/permissions                # 授予直接权限
DELETE /api/users/:id/permissions/:permId        # 撤销直接权限

GET    /api/users/:id/permissions/check/:code    # 校验用户是否有某权限
```

### 批量操作

```
POST   /api/users/batch/assign-role              # 批量分配角色
POST   /api/users/batch/grant-permission         # 批量授予权限
```

### 审计日志

```
GET    /api/audit-logs                           # 列表（支持按用户、时间、操作类型筛选）
GET    /api/audit-logs/:id                       # 详情
```

## 请求/响应示例

### 授予直接权限

```http
POST /api/users/123/permissions
Content-Type: application/json

{
  "permissionCode": "order:export",
  "granted": true,
  "expiresAt": "2026-12-31T23:59:59Z",
  "reason": "项目需要导出订单数据"
}
```

**响应 200**:
```json
{
  "userId": 123,
  "permission": {
    "code": "order:export",
    "granted": true,
    "source": "direct_grant",
    "grantedBy": "admin-001",
    "expiresAt": "2026-12-31T23:59:59Z"
  }
}
```

### 查询用户最终权限（含来源）

```http
GET /api/users/123/permissions?detail=source
```

**响应 200**:
```json
{
  "userId": 123,
  "permissions": [
    {
      "code": "post:create",
      "resource": "post",
      "action": "create",
      "source": "role_preset",
      "sourceDetail": { "presetName": "editor" }
    },
    {
      "code": "order:export",
      "resource": "order",
      "action": "export",
      "source": "direct_grant",
      "sourceDetail": { "grantedBy": "admin-001", "expiresAt": "2026-12-31T23:59:59Z" }
    },
    {
      "code": "user:delete",
      "resource": "user",
      "action": "delete",
      "source": "direct_denied",
      "sourceDetail": { "grantedBy": "admin-001", "reason": "安全限制" }
    }
  ],
  "summary": {
    "total": 3,
    "fromRoles": 1,
    "directGrants": 1,
    "directDenials": 1
  }
}
```

### 权限校验

```http
GET /api/users/123/permissions/check/order:export
```

**响应 200**:
```json
{
  "allowed": true,
  "source": "direct_grant"
}
```

## 错误码

| HTTP | code | 说明 |
|------|------|------|
| 400 | INVALID_PERMISSION_CODE | 权限码格式错误 |
| 403 | SYSTEM_PRESET_READONLY | 系统预设角色不可修改 |
| 403 | INSUFFICIENT_ADMIN_LEVEL | 管理员权限不足 |
| 404 | PERMISSION_NOT_FOUND | 权限不存在 |
| 404 | ROLE_PRESET_NOT_FOUND | 角色预设不存在 |
| 409 | ALREADY_ASSIGNED | 角色已分配 |
| 422 | CIRCULAR_DEPENDENCY | 权限循环依赖 |
