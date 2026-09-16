<script setup lang="ts">
import PageContainer from '@/components/PageContainer.vue'
import PermissionGate from '@/components/PermissionGate.vue'
import { useSessionStore } from '@/stores/session'
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons-vue'
const session=useSessionStore(); const rows=[['访问工作台','dashboard:view'],['创建用户','system:user:create'],['删除用户','system:user:delete'],['编辑角色','system:role:update'],['查看图表','charts:view']]
</script>
<template>
  <PageContainer
    title="权限示例"
    description="路由负责访问边界，PermissionGate 负责界面呈现；真实项目仍需由服务端执行最终鉴权。"
  >
    <a-alert
      type="warning"
      show-icon
      message="当前演示角色"
      :description="`已登录为 ${session.user?.role}，可在退出后使用 admin、operator 或 viewer 账号切换。`"
    /><section class="permission-grid">
      <article class="surface-card">
        <header>
          <span class="eyebrow">Permission matrix</span><h2 class="section-title">
            当前角色能力
          </h2>
        </header><div
          v-for="row in rows"
          :key="row[1]"
          class="permission-row"
        >
          <span><b>{{ row[0] }}</b><code>{{ row[1] }}</code></span><PermissionGate :permission="row[1]">
            <CheckCircleFilled class="yes" /><template #fallback>
              <CloseCircleFilled class="no" />
            </template>
          </PermissionGate>
        </div>
      </article><article class="surface-card code-card">
        <header>
          <span class="eyebrow">Usage</span><h2 class="section-title">
            组件级权限
          </h2>
        </header><pre>&lt;PermissionGate
  permission="system:user:create"
&gt;
  &lt;a-button type="primary"&gt;
    新建用户
  &lt;/a-button&gt;
&lt;/PermissionGate&gt;</pre><p>通配符权限采用 <code>system:*</code> 格式，路由元数据、菜单和页面组件共用同一判断函数。</p>
      </article>
    </section>
  </PageContainer>
</template>
<style scoped>.permission-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}.permission-grid article{padding:22px}.permission-grid header{margin-bottom:18px}.permission-grid .eyebrow{display:block;margin-bottom:4px}.permission-row{display:flex;align-items:center;justify-content:space-between;padding:13px 0;border-bottom:1px solid var(--app-border)}.permission-row:last-child{border:0}.permission-row b,.permission-row code{display:block}.permission-row code,.code-card code{color:var(--app-muted);font-family:var(--app-mono);font-size:11px}.yes{color:var(--app-success)}.no{color:var(--app-muted)}pre{overflow:auto;padding:18px;border-radius:10px;color:#dce4f3;font:12px/1.8 var(--app-mono);background:#111827}.code-card p{color:var(--app-muted);line-height:1.7}@media(max-width:800px){.permission-grid{grid-template-columns:1fr}}</style>
