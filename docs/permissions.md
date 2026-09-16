# Permissions

Permissions use colon-separated identifiers such as `system:user:create`. A trailing wildcard grants a scope, so `system:*` grants every system permission; `*` grants everything.

Put page requirements in route metadata and use `PermissionGate` for buttons or sections:

```vue
<PermissionGate permission="system:user:create">
  <a-button type="primary">New user</a-button>
</PermissionGate>
```

These client checks improve navigation and presentation. A production backend must enforce authorization for every protected operation.
