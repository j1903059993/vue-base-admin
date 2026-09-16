<script setup lang="ts">import PageContainer from '@/components/PageContainer.vue';const columns=[{title:'菜单名称',dataIndex:'name',key:'name'},{title:'路由地址',dataIndex:'path'},{title:'权限标识',dataIndex:'permission'},{title:'类型',dataIndex:'type',width:100},{title:'排序',dataIndex:'order',width:80},{title:'操作',key:'action',width:120}];const data=[{id:1,name:'工作台',path:'/dashboard',permission:'dashboard:view',type:'菜单',order:1},{id:2,name:'组件示例',path:'/examples',permission:'examples:*',type:'目录',order:20,children:[{id:21,name:'表格示例',path:'/examples/table',permission:'examples:table',type:'菜单',order:1},{id:22,name:'表单示例',path:'/examples/form',permission:'examples:form',type:'菜单',order:2}]},{id:3,name:'系统管理',path:'/system',permission:'system:*',type:'目录',order:30,children:[{id:31,name:'用户管理',path:'/system/users',permission:'system:user:list',type:'菜单',order:1},{id:32,name:'新建用户',path:'-',permission:'system:user:create',type:'按钮',order:2}]}]</script>
<template>
  <PageContainer
    title="菜单管理"
    description="维护菜单树、路由元数据和按钮权限标识。"
  >
    <template #actions>
      <a-button type="primary">
        新建菜单
      </a-button>
    </template><div class="surface-card table">
      <a-table
        :columns="columns"
        :data-source="data"
        row-key="id"
        :pagination="false"
      >
        <template #bodyCell="{column,record}">
          <template v-if="column.key==='name'">
            <b>{{ record.name }}</b>
          </template><template v-if="column.dataIndex==='permission'">
            <code>{{ record.permission }}</code>
          </template><template v-if="column.key==='action'">
            <a-button
              type="link"
              size="small"
            >
              编辑
            </a-button><a-button
              type="link"
              danger
              size="small"
            >
              删除
            </a-button>
          </template>
        </template>
      </a-table>
    </div>
  </PageContainer>
</template>
<style scoped>.table{overflow:hidden;padding:6px}code{padding:3px 7px;border-radius:5px;color:var(--app-primary);font:11px var(--app-mono);background:var(--app-primary-soft)}</style>
