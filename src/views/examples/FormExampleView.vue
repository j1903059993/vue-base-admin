<script setup lang="ts">
import { reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
import { SaveOutlined, ThunderboltOutlined } from '@ant-design/icons-vue'
import PageContainer from '@/components/PageContainer.vue'
const formRef=ref(); const submitting=ref(false); const form=reactive({name:'Vue Base Admin',key:'vue-base-admin',owner:'姜兴杰',type:'admin',description:'一套现代、清晰、方便扩展的 Vue 3 后台管理模板。',features:['theme','permission'],visibility:'public',notifications:true,regions:['cn-east']})
const rules={name:[{required:true,message:'请输入项目名称'}],key:[{required:true,message:'请输入项目标识'},{pattern:/^[a-z][a-z0-9-]+$/,message:'仅支持小写字母、数字和连字符'}],description:[{max:120,message:'最多 120 个字符'}]}
async function submit(){await formRef.value.validate();submitting.value=true;await new Promise(resolve=>setTimeout(resolve,650));submitting.value=false;message.success('配置已保存')}
</script>
<template>
  <PageContainer
    title="表单示例"
    description="展示表单分组、校验、联动和固定操作区的组合方式。"
  >
    <section class="form-layout">
      <a-form
        ref="formRef"
        class="form-card surface-card"
        layout="vertical"
        :model="form"
        :rules="rules"
        @finish="submit"
      >
        <header><span class="step">01</span><div><h2>基础信息</h2><p>用于识别项目并生成默认配置。</p></div></header><div class="field-grid">
          <a-form-item
            label="项目名称"
            name="name"
          >
            <a-input
              v-model:value="form.name"
              placeholder="请输入项目名称"
            />
          </a-form-item><a-form-item
            label="项目标识"
            name="key"
          >
            <a-input
              v-model:value="form.key"
              addon-before="apps/"
            />
          </a-form-item><a-form-item label="负责人">
            <a-select
              v-model:value="form.owner"
              :options="['姜兴杰','林子轩','沈知夏'].map(value=>({label:value,value}))"
            />
          </a-form-item><a-form-item label="项目类型">
            <a-select
              v-model:value="form.type"
              :options="[{label:'后台管理系统',value:'admin'},{label:'数据工作台',value:'dashboard'},{label:'内部工具',value:'tool'}]"
            />
          </a-form-item>
        </div><a-form-item
          label="项目描述"
          name="description"
        >
          <a-textarea
            v-model:value="form.description"
            :rows="3"
            show-count
            :maxlength="120"
          />
        </a-form-item><a-divider /><header><span class="step">02</span><div><h2>能力配置</h2><p>选择起步项目需要的基础模块。</p></div></header><a-form-item label="内置能力">
          <a-checkbox-group
            v-model:value="form.features"
            class="feature-grid"
          >
            <a-checkbox value="theme">
              <span><b>主题系统</b><small>明暗模式与品牌色</small></span>
            </a-checkbox><a-checkbox value="permission">
              <span><b>权限控制</b><small>路由、菜单和按钮</small></span>
            </a-checkbox><a-checkbox value="mock">
              <span><b>Mock API</b><small>独立的演示数据层</small></span>
            </a-checkbox><a-checkbox value="tabs">
              <span><b>多页签</b><small>路由访问历史</small></span>
            </a-checkbox>
          </a-checkbox-group>
        </a-form-item><a-form-item label="可见范围">
          <a-radio-group v-model:value="form.visibility">
            <a-radio value="public">
              团队公开
            </a-radio><a-radio value="private">
              仅成员可见
            </a-radio>
          </a-radio-group>
        </a-form-item><a-divider /><header><span class="step">03</span><div><h2>发布偏好</h2><p>这些选项可在项目创建后继续修改。</p></div></header><a-form-item label="部署区域">
          <a-select
            v-model:value="form.regions"
            mode="multiple"
            :options="[{label:'华东',value:'cn-east'},{label:'华北',value:'cn-north'},{label:'亚太',value:'apac'}]"
          />
        </a-form-item><div class="switch-row">
          <div><b>发布结果通知</b><small>构建完成或失败后通知项目成员</small></div><a-switch v-model:checked="form.notifications" />
        </div><footer>
          <a-button>保存草稿</a-button><a-button
            type="primary"
            html-type="submit"
            :loading="submitting"
          >
            <SaveOutlined />保存配置
          </a-button>
        </footer>
      </a-form><aside class="tips surface-card">
        <ThunderboltOutlined /><h3>表单设计原则</h3><p>示例保留 Ant Design Vue 原始表单能力，将业务规则放在页面层，避免把不同领域的字段塞进一个通用配置对象。</p><ol><li>复杂表单按任务分组</li><li>错误提示靠近字段</li><li>主操作保持唯一</li><li>异步提交提供反馈</li></ol>
      </aside>
    </section>
  </PageContainer>
</template>
<style scoped>.form-layout{display:grid;grid-template-columns:minmax(0,820px) minmax(240px,1fr);align-items:start;gap:16px}.form-card{padding:24px}.form-card header{display:flex;align-items:flex-start;gap:12px;margin-bottom:20px}.form-card h2{margin:0;font-size:17px}.form-card header p{margin:3px 0 0;color:var(--app-muted);font-size:12px}.step{display:grid;place-items:center;width:30px;height:30px;border-radius:8px;color:var(--app-primary);font-family:var(--app-mono);font-size:11px;background:var(--app-primary-soft)}.field-grid{display:grid;grid-template-columns:1fr 1fr;gap:0 16px}.feature-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;width:100%}.feature-grid :deep(.ant-checkbox-wrapper){align-items:flex-start;margin:0;padding:12px;border:1px solid var(--app-border);border-radius:9px}.feature-grid span b,.feature-grid span small{display:block}.feature-grid small{color:var(--app-muted);font-size:11px}.switch-row{display:flex;align-items:center;justify-content:space-between;padding:14px;border-radius:9px;background:var(--app-surface-2)}.switch-row b,.switch-row small{display:block}.switch-row small{color:var(--app-muted)}.form-card footer{position:sticky;bottom:0;display:flex;justify-content:flex-end;gap:8px;margin:24px -24px -24px;padding:15px 24px;border-top:1px solid var(--app-border);border-radius:0 0 var(--app-radius-lg) var(--app-radius-lg);background:var(--app-surface)}.tips{padding:22px}.tips> :deep(svg){font-size:24px;color:var(--app-primary)}.tips h3{margin:14px 0 8px}.tips p,.tips li{color:var(--app-muted);font-size:12px;line-height:1.7}.tips ol{padding-left:18px}@media(max-width:920px){.form-layout{grid-template-columns:1fr}.tips{display:none}}@media(max-width:560px){.field-grid,.feature-grid{grid-template-columns:1fr}.form-card{padding:18px}.form-card footer{margin:20px -18px -18px;padding:13px 18px}}</style>
