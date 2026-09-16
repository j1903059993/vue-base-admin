<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { message, Modal } from 'ant-design-vue'
import { PlusOutlined, ReloadOutlined, SearchOutlined, DownloadOutlined } from '@ant-design/icons-vue'
import PageContainer from '@/components/PageContainer.vue'
import QueryPanel from '@/components/QueryPanel.vue'
import StatusTag from '@/components/StatusTag.vue'
import PermissionGate from '@/components/PermissionGate.vue'
import { seedUsers, type AdminUser } from '@/mocks/data/users'
import type { TableColumnsType, TablePaginationConfig } from 'ant-design-vue'
const users=ref<AdminUser[]>([...seedUsers]); const loading=ref(false); const selected=ref<number[]>([]); const modalOpen=ref(false); const editing=ref<number|null>(null); const query=reactive({keyword:'',status:undefined as string|undefined,department:undefined as string|undefined}); const pagination=reactive({current:1,pageSize:8})
const form=reactive({name:'',email:'',role:'普通成员',department:'产品研发中心',status:'active'})
const filtered=computed(()=>users.value.filter(user=>(!query.keyword||`${user.name}${user.email}`.toLowerCase().includes(query.keyword.toLowerCase()))&&(!query.status||user.status===query.status)&&(!query.department||user.department===query.department)))
const pageRows=computed(()=>filtered.value.slice((pagination.current-1)*pagination.pageSize,pagination.current*pagination.pageSize))
const columns: TableColumnsType<AdminUser>=[{title:'用户',key:'user',width:220},{title:'角色',dataIndex:'role',width:130},{title:'部门',dataIndex:'department'},{title:'状态',key:'status',width:100},{title:'最近登录',dataIndex:'lastLogin',width:170},{title:'操作',key:'action',width:135,fixed:'right'}]
function reset(){query.keyword='';query.status=undefined;query.department=undefined;pagination.current=1}
async function refresh(){loading.value=true;await new Promise(resolve=>setTimeout(resolve,450));loading.value=false;message.success('数据已刷新')}
function openCreate(){editing.value=null;Object.assign(form,{name:'',email:'',role:'普通成员',department:'产品研发中心',status:'active'});modalOpen.value=true}
function openEdit(user:AdminUser){editing.value=user.id;Object.assign(form,user);modalOpen.value=true}
function save(){if(!form.name||!form.email){message.warning('请填写姓名和邮箱');return}if(editing.value){const index=users.value.findIndex(item=>item.id===editing.value);users.value[index]={...users.value[index],...form} as AdminUser}else users.value.unshift({id:Date.now(),...form,status:form.status as AdminUser['status'],lastLogin:'尚未登录'});modalOpen.value=false;message.success(editing.value?'用户已更新':'用户已创建')}
function remove(user:AdminUser){Modal.confirm({title:`确认删除 ${user.name}？`,content:'删除后无法恢复，此操作仅影响本地演示数据。',okType:'danger',onOk:()=>{users.value=users.value.filter(item=>item.id!==user.id);message.success('用户已删除')}})}
function editRecord(record: Record<string, unknown>) { openEdit(record as unknown as AdminUser) }
function removeRecord(record: Record<string, unknown>) { remove(record as unknown as AdminUser) }
</script>
<template>
  <PageContainer
    title="用户管理"
    description="管理成员身份、角色与账号状态，示例数据仅保存在当前页面。"
  >
    <template #actions>
      <PermissionGate permission="system:user:create">
        <a-button
          type="primary"
          @click="openCreate"
        >
          <PlusOutlined />新建用户
        </a-button>
      </PermissionGate>
    </template><QueryPanel>
      <a-input
        v-model:value="query.keyword"
        allow-clear
        placeholder="搜索姓名或邮箱"
        style="width:230px"
      >
        <template #prefix>
          <SearchOutlined />
        </template>
      </a-input><a-select
        v-model:value="query.department"
        allow-clear
        placeholder="全部部门"
        style="width:160px"
        :options="['产品研发中心','用户运营部','风险控制部','数据平台组','客户成功部','市场增长部'].map(value=>({label:value,value}))"
      /><a-select
        v-model:value="query.status"
        allow-clear
        placeholder="全部状态"
        style="width:130px"
        :options="[{label:'启用',value:'active'},{label:'停用',value:'disabled'}]"
      /><template #actions>
        <a-button @click="reset">
          重置
        </a-button><a-button
          type="primary"
          @click="pagination.current=1"
        >
          查询
        </a-button>
      </template>
    </QueryPanel><section class="table-card surface-card">
      <header>
        <div><strong>成员列表</strong><span>共 {{ filtered.length }} 位成员</span></div><div>
          <a-button :disabled="!selected.length">
            <DownloadOutlined />导出所选
          </a-button><a-button
            aria-label="刷新"
            @click="refresh"
          >
            <ReloadOutlined />
          </a-button>
        </div>
      </header><a-table
        :columns="columns"
        :data-source="pageRows"
        :loading="loading"
        :pagination="{...pagination,total:filtered.length,showSizeChanger:false}"
        :row-selection="{selectedRowKeys:selected,onChange:(keys:any[])=>selected=keys as number[]}"
        row-key="id"
        :scroll="{x:900}"
        @change="(page: TablePaginationConfig)=>pagination.current=page.current??1"
      >
        <template #bodyCell="{column,record}">
          <template v-if="column.key==='user'">
            <div class="user-cell">
              <a-avatar :style="{background:['#4f46e5','#0891b2','#0f9f75','#d97706'][record.id%4]}">
                {{ record.name.slice(0,1) }}
              </a-avatar><span><b>{{ record.name }}</b><small>{{ record.email }}</small></span>
            </div>
          </template><template v-else-if="column.key==='status'">
            <StatusTag :active="record.status==='active'" />
          </template><template v-else-if="column.key==='action'">
            <a-button
              type="link"
              size="small"
              @click="editRecord(record)"
            >
              编辑
            </a-button><PermissionGate permission="system:user:delete">
              <a-button
                type="link"
                danger
                size="small"
                @click="removeRecord(record)"
              >
                删除
              </a-button>
            </PermissionGate>
          </template>
        </template>
      </a-table>
    </section><a-modal
      v-model:open="modalOpen"
      :title="editing?'编辑用户':'新建用户'"
      ok-text="保存"
      @ok="save"
    >
      <a-form
        layout="vertical"
        :model="form"
      >
        <div class="form-row">
          <a-form-item
            label="姓名"
            name="name"
            required
          >
            <a-input v-model:value="form.name" />
          </a-form-item><a-form-item
            label="邮箱"
            name="email"
            required
          >
            <a-input v-model:value="form.email" />
          </a-form-item>
        </div><a-form-item
          label="角色"
          name="role"
        >
          <a-select
            v-model:value="form.role"
            :options="['超级管理员','运营管理员','审计员','普通成员'].map(value=>({label:value,value}))"
          />
        </a-form-item><a-form-item
          label="部门"
          name="department"
        >
          <a-select
            v-model:value="form.department"
            :options="['产品研发中心','用户运营部','风险控制部','数据平台组'].map(value=>({label:value,value}))"
          />
        </a-form-item><a-form-item
          label="账号状态"
          name="status"
        >
          <a-radio-group v-model:value="form.status">
            <a-radio value="active">
              启用
            </a-radio><a-radio value="disabled">
              停用
            </a-radio>
          </a-radio-group>
        </a-form-item>
      </a-form>
    </a-modal>
  </PageContainer>
</template>
<style scoped>.table-card{overflow:hidden}.table-card>header{display:flex;align-items:center;justify-content:space-between;padding:16px 18px;border-bottom:1px solid var(--app-border)}.table-card header>div{display:flex;align-items:center;gap:9px}.table-card header span{color:var(--app-muted);font-size:12px}.table-card :deep(.ant-table-wrapper){padding:0 6px 6px}.user-cell{display:flex;align-items:center;gap:10px}.user-cell span b,.user-cell span small{display:block}.user-cell small{color:var(--app-muted);font-size:11px}.form-row{display:grid;grid-template-columns:1fr 1.4fr;gap:12px}@media(max-width:560px){.form-row{grid-template-columns:1fr}}</style>
