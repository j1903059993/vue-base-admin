<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import dayjs from 'dayjs'
import { ArrowRightOutlined, CodeOutlined, ApiOutlined, SafetyCertificateOutlined, CheckCircleFilled } from '@ant-design/icons-vue'
import PageContainer from '@/components/PageContainer.vue'
import StatCard from '@/components/StatCard.vue'
import BaseChart from '@/components/charts/BaseChart.vue'
import { useSessionStore } from '@/stores/session'
import type { EChartsOption } from 'echarts'
const session=useSessionStore(); const router=useRouter()
const trendOption=computed<EChartsOption>(()=>({grid:{left:12,right:14,top:25,bottom:8,containLabel:true},tooltip:{trigger:'axis'},xAxis:{type:'category',boundaryGap:false,data:['09/03','09/05','09/07','09/09','09/11','09/13','今天'],axisLine:{show:false},axisTick:{show:false}},yAxis:{type:'value',splitLine:{lineStyle:{color:'rgba(120,130,150,.12)'}},axisLabel:{formatter:(value:number)=>`${value/1000}k`}},series:[{type:'line',smooth:true,symbolSize:7,data:[8.2,10.8,9.6,14.1,12.5,16.9,18.4].map(v=>v*1000),lineStyle:{width:3,color:'#4f46e5'},itemStyle:{color:'#4f46e5'},areaStyle:{color:{type:'linear',x:0,y:0,x2:0,y2:1,colorStops:[{offset:0,color:'rgba(79,70,229,.26)'},{offset:1,color:'rgba(79,70,229,0)'}]}}}]}))
const channelOption:EChartsOption={tooltip:{trigger:'item'},legend:{bottom:0,icon:'circle'},series:[{type:'pie',radius:['52%','74%'],center:['50%','44%'],avoidLabelOverlap:true,itemStyle:{borderRadius:5,borderWidth:3,borderColor:'transparent'},label:{show:false},data:[{value:38,name:'直接访问'},{value:30,name:'搜索引擎'},{value:20,name:'内容推荐'},{value:12,name:'其他'}]}]}
const activities=[['完成了「角色权限矩阵」配置','12 分钟前'],['发布了 v0.1.0-alpha.2','1 小时前'],['新增用户 林子轩','3 小时前'],['更新了菜单路由配置','昨天 18:24']]
</script>
<template>
  <PageContainer
    title="工作台"
    :description="`${dayjs().format('YYYY年M月D日')}，欢迎回来，${session.user?.name}`"
  >
    <template #actions>
      <a-button
        type="primary"
        @click="router.push('/examples/table')"
      >
        查看组件示例 <ArrowRightOutlined />
      </a-button>
    </template>
    <section class="stats">
      <StatCard
        label="今日访问"
        value="18,420"
        trend="12.6%"
        tone="#4f46e5"
      /><StatCard
        label="活跃用户"
        value="3,842"
        trend="8.2%"
        tone="#0891b2"
      /><StatCard
        label="转化率"
        value="24.8%"
        trend="3.1%"
        tone="#0f9f75"
      /><StatCard
        label="待办事项"
        value="16"
        trend="2 项"
        direction="down"
        tone="#d97706"
      />
    </section>
    <section class="dashboard-grid">
      <article class="panel surface-card traffic">
        <div class="panel-head">
          <div>
            <span class="eyebrow">Traffic</span><h2 class="section-title">
              访问趋势
            </h2>
          </div><a-radio-group
            value="14d"
            size="small"
          >
            <a-radio-button value="7d">
              7天
            </a-radio-button><a-radio-button value="14d">
              14天
            </a-radio-button><a-radio-button value="30d">
              30天
            </a-radio-button>
          </a-radio-group>
        </div><BaseChart
          :option="trendOption"
          title="最近十四天访问趋势"
          :height="310"
        />
      </article>
      <article class="panel surface-card">
        <div class="panel-head">
          <div>
            <span class="eyebrow">Acquisition</span><h2 class="section-title">
              访问来源
            </h2>
          </div>
        </div><BaseChart
          :option="channelOption"
          title="访问来源占比"
          :height="310"
        />
      </article>
      <article class="panel surface-card">
        <div class="panel-head">
          <div>
            <span class="eyebrow">Shortcuts</span><h2 class="section-title">
              快速开始
            </h2>
          </div>
        </div><div class="quick-grid">
          <button @click="router.push('/examples/table')">
            <CodeOutlined /><span><b>表格方案</b><small>查询、分页与选择</small></span>
          </button><button @click="router.push('/examples/form')">
            <ApiOutlined /><span><b>表单方案</b><small>校验与动态字段</small></span>
          </button><button @click="router.push('/examples/permission')">
            <SafetyCertificateOutlined /><span><b>权限控制</b><small>路由与按钮权限</small></span>
          </button>
        </div>
      </article>
      <article class="panel surface-card">
        <div class="panel-head">
          <div>
            <span class="eyebrow">Activity</span><h2 class="section-title">
              最近动态
            </h2>
          </div><a-button
            type="link"
            size="small"
          >
            全部记录
          </a-button>
        </div><div class="activity">
          <div
            v-for="item in activities"
            :key="item[0]"
          >
            <CheckCircleFilled /><span><b>{{ item[0] }}</b><small>{{ item[1] }}</small></span>
          </div>
        </div>
      </article>
    </section>
  </PageContainer>
</template>
<style scoped>
.stats{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px}.dashboard-grid{display:grid;grid-template-columns:minmax(0,1.65fr) minmax(300px,.8fr);gap:14px}.panel{min-width:0;padding:19px}.panel-head{display:flex;align-items:center;justify-content:space-between;gap:14px;margin-bottom:10px}.panel-head .eyebrow{display:block;margin-bottom:3px}.quick-grid{display:grid;gap:10px}.quick-grid button{display:flex;align-items:center;gap:13px;width:100%;padding:13px;border:1px solid var(--app-border);border-radius:10px;color:var(--app-text);text-align:left;background:var(--app-surface-2);cursor:pointer;transition:transform var(--app-fast),border-color var(--app-fast)}.quick-grid button:hover{transform:translateX(3px);border-color:var(--app-primary)}.quick-grid :deep(svg){font-size:19px;color:var(--app-primary)}.quick-grid span b,.quick-grid span small,.activity span b,.activity span small{display:block}.quick-grid small,.activity small{color:var(--app-muted);font-size:11px}.activity{display:grid;gap:16px}.activity>div{display:flex;align-items:flex-start;gap:11px}.activity :deep(svg){margin-top:3px;color:var(--app-success)}.activity b{font-size:12px;font-weight:580}@media(max-width:1180px){.stats{grid-template-columns:repeat(2,1fr)}.dashboard-grid{grid-template-columns:1fr}}@media(max-width:560px){.stats{grid-template-columns:1fr}.panel{padding:15px}.panel-head{align-items:flex-start;flex-direction:column}}
</style>
