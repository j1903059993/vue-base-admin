<script setup lang="ts">import PageContainer from '@/components/PageContainer.vue';const roles=[{name:'超级管理员',key:'admin',members:2,scope:'全部数据',permissions:'全部权限'},{name:'运营管理员',key:'operator',members:8,scope:'所属部门',permissions:'18 项权限'},{name:'审计员',key:'auditor',members:3,scope:'全部数据',permissions:'只读权限'},{name:'普通成员',key:'member',members:32,scope:'个人数据',permissions:'7 项权限'}]</script>
<template>
  <PageContainer
    title="角色管理"
    description="集中配置数据范围和功能权限。"
  >
    <template #actions>
      <a-button type="primary">
        新建角色
      </a-button>
    </template><section class="role-grid">
      <article
        v-for="(role,index) in roles"
        :key="role.key"
        class="role surface-card"
      >
        <header>
          <span class="role-index">0{{ index+1 }}</span><a-dropdown>
            <a-button type="text">
              •••
            </a-button><template #overlay>
              <a-menu><a-menu-item>编辑</a-menu-item><a-menu-item>复制角色</a-menu-item></a-menu>
            </template>
          </a-dropdown>
        </header><h2>{{ role.name }}</h2><code>{{ role.key }}</code><dl><div><dt>成员</dt><dd>{{ role.members }} 人</dd></div><div><dt>数据范围</dt><dd>{{ role.scope }}</dd></div><div><dt>功能权限</dt><dd>{{ role.permissions }}</dd></div></dl><a-button block>
          查看权限配置
        </a-button>
      </article>
    </section>
  </PageContainer>
</template>
<style scoped>.role-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px}.role{padding:18px}.role header{display:flex;align-items:center;justify-content:space-between}.role-index{color:var(--app-primary);font:12px var(--app-mono)}.role h2{margin:18px 0 2px;font-size:18px}.role code{color:var(--app-muted);font:11px var(--app-mono)}dl{margin:20px 0}dl div{display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--app-border)}dt{color:var(--app-muted)}dd{margin:0;font-weight:550}@media(max-width:1100px){.role-grid{grid-template-columns:repeat(2,1fr)}}@media(max-width:580px){.role-grid{grid-template-columns:1fr}}</style>
