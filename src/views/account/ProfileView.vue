<script setup lang="ts">import PageContainer from '@/components/PageContainer.vue';import {useSessionStore} from '@/stores/session';const session=useSessionStore()</script>
<template>
  <PageContainer
    title="个人中心"
    description="查看账号资料与最近活动。"
  >
    <section class="profile-grid">
      <article class="identity surface-card">
        <a-avatar
          :size="72"
          class="avatar"
        >
          {{ session.user?.name.slice(0,1) }}
        </a-avatar><h2>{{ session.user?.name }}</h2><p>@{{ session.user?.username }}</p><a-tag color="blue">
          {{ session.user?.role }}
        </a-tag><a-divider /><dl><div><dt>所属团队</dt><dd>产品研发中心</dd></div><div><dt>加入时间</dt><dd>2025-08-12</dd></div><div><dt>最近登录</dt><dd>今天 09:32</dd></div></dl>
      </article><article class="details surface-card">
        <h2>基本资料</h2><a-form layout="vertical">
          <div class="row">
            <a-form-item label="姓名">
              <a-input :value="session.user?.name" />
            </a-form-item><a-form-item label="用户名">
              <a-input
                :value="session.user?.username"
                disabled
              />
            </a-form-item>
          </div><a-form-item label="联系邮箱">
            <a-input value="1903059993@qq.com" />
          </a-form-item><a-form-item label="个人介绍">
            <a-textarea
              :rows="4"
              value="关注 Vue 生态、前端工程化和体验设计。"
            />
          </a-form-item><a-button type="primary">
            保存修改
          </a-button>
        </a-form>
      </article>
    </section>
  </PageContainer>
</template>
<style scoped>.profile-grid{display:grid;grid-template-columns:300px minmax(0,700px);gap:16px}.identity,.details{padding:24px}.identity{text-align:center}.avatar{background:linear-gradient(145deg,#6366f1,#4338ca)}.identity h2{margin:14px 0 2px}.identity p{margin:0 0 10px;color:var(--app-muted)}dl{text-align:left}dl div{display:flex;justify-content:space-between;padding:9px 0}dt{color:var(--app-muted)}dd{margin:0}.details h2{margin:0 0 20px}.row{display:grid;grid-template-columns:1fr 1fr;gap:14px}@media(max-width:760px){.profile-grid{grid-template-columns:1fr}.row{grid-template-columns:1fr}}</style>
