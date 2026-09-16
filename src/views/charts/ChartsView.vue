<script setup lang="ts">
import PageContainer from '@/components/PageContainer.vue'
import BaseChart from '@/components/charts/BaseChart.vue'
import type { EChartsOption } from 'echarts'
const axis={axisLine:{show:false},axisTick:{show:false}}
const line:EChartsOption={grid:{left:15,right:15,top:30,bottom:12,containLabel:true},tooltip:{trigger:'axis'},xAxis:{type:'category',data:['周一','周二','周三','周四','周五','周六','周日'],...axis},yAxis:{type:'value',splitLine:{lineStyle:{color:'rgba(130,140,160,.12)'}}},series:[{name:'访问量',type:'line',smooth:true,data:[820,932,901,1234,1290,1530,1320],lineStyle:{width:3,color:'#4f46e5'},itemStyle:{color:'#4f46e5'}}]}
const bar:EChartsOption={grid:{left:12,right:12,top:25,bottom:10,containLabel:true},tooltip:{trigger:'axis'},xAxis:{type:'category',data:['Vue','React','Node','CSS','工程化','测试'],...axis},yAxis:{type:'value',splitLine:{lineStyle:{color:'rgba(130,140,160,.12)'}}},series:[{type:'bar',data:[92,76,68,84,73,61],barWidth:20,itemStyle:{color:'#0891b2',borderRadius:[5,5,0,0]}}]}
const donut:EChartsOption={tooltip:{trigger:'item'},legend:{bottom:0},series:[{type:'pie',radius:['48%','72%'],center:['50%','43%'],label:{show:false},data:[{name:'桌面端',value:58},{name:'移动端',value:34},{name:'其他',value:8}]}]}
const rank:EChartsOption={grid:{left:8,right:20,top:12,bottom:8,containLabel:true},tooltip:{trigger:'axis'},xAxis:{type:'value',show:false},yAxis:{type:'category',inverse:true,data:['权限管理','数据表格','主题系统','动态表单','图表组件'],...axis},series:[{type:'bar',data:[96,91,84,76,69],barWidth:13,itemStyle:{color:'#4f46e5',borderRadius:8},label:{show:true,position:'right',formatter:'{c}%'}}]}
</script>
<template>
  <PageContainer
    title="数据可视化"
    description="基于 ECharts 的响应式图表封装，自动跟随主题并处理容器尺寸变化。"
  >
    <section class="charts-grid">
      <article class="surface-card wide">
        <header>
          <span class="eyebrow">Trend</span><h2 class="section-title">
            访问趋势
          </h2>
        </header><BaseChart
          :option="line"
          title="一周访问趋势"
        />
      </article><article class="surface-card">
        <header>
          <span class="eyebrow">Categories</span><h2 class="section-title">
            内容热度
          </h2>
        </header><BaseChart
          :option="bar"
          title="技术分类热度"
        />
      </article><article class="surface-card">
        <header>
          <span class="eyebrow">Devices</span><h2 class="section-title">
            终端分布
          </h2>
        </header><BaseChart
          :option="donut"
          title="访问终端分布"
        />
      </article><article class="surface-card wide">
        <header>
          <span class="eyebrow">Feature adoption</span><h2 class="section-title">
            模板能力使用率
          </h2>
        </header><BaseChart
          :option="rank"
          title="模板能力使用排名"
        />
      </article>
    </section>
  </PageContainer>
</template>
<style scoped>.charts-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}.charts-grid article{padding:20px}.charts-grid header{margin-bottom:6px}.eyebrow{display:block;margin-bottom:4px}.wide{grid-column:span 1}@media(max-width:800px){.charts-grid{grid-template-columns:1fr}}</style>
