<template>
  <!-- 修改说明：最终版采用三栏仪表盘布局，统一接入同一份动态数据 -->
  <div
    class="dashboard-bg h-screen text-white p-5 flex overflow-hidden"
    v-if="data"
  >
    <!-- 左 -->
    <div
      class="flex-1 mr-5 bg-slate-900/58 border border-emerald-200/25 shadow-[0_10px_30px_rgba(0,0,0,0.25)] backdrop-blur-md p-3 flex flex-col"
    >
      <!-- 横向柱状图 -->
      <HorizontalBar
        class="h-1/3 box-border pb-4"
        :data="data.liaoningCityDevelopmentData"
      />
      <!-- 雷达图 -->
      <RadarBar
        class="h-1/3 box-border pb-4"
        :data="data.liaoningLogisticsRiskData"
      />
      <!-- 关系图 -->
      <Relation class="h-1/3" :data="data.liaoningLogisticsTopologyData" />
    </div>
    <!-- 中 -->
    <div class="w-1/2 mr-5 flex flex-col">
      <!-- 数据总览图 -->
      <TotalData
        class="bg-slate-900/55 border border-amber-200/30 shadow-[0_8px_24px_rgba(0,0,0,0.22)] backdrop-blur-md p-3"
        :data="data.totalData"
      />
      <!-- 地图可视化 -->
      <MapChart
        class="bg-slate-900/55 border border-amber-200/30 shadow-[0_8px_24px_rgba(0,0,0,0.22)] backdrop-blur-md p-3 mt-2 flex-1"
        :data="data.populationData"
      />
    </div>
    <!-- 右 -->
    <div
      class="flex-1 bg-slate-900/58 border border-cyan-200/25 shadow-[0_10px_30px_rgba(0,0,0,0.25)] backdrop-blur-md p-3 flex flex-col"
    >
      <!-- 竖向柱状图 -->
      <VerticalBar class="h-1/3 box-border pb-4" :data="data.hakimiGdpData" />
      <!-- 环形图 -->
      <RingBar
        class="h-1/3 box-border pb-4"
        :data="data.liaoningCityHappinessData"
      />
      <!-- 文档云图 -->
      <WordCloud class="h-1/3" :data="data.wordCloudData" />
    </div>
  </div>
</template>

<script setup>
import { getVisualization } from "./api/visualization.js";
import { defineAsyncComponent, ref } from "vue";

// 修改说明：图表组件改为按需异步加载，数据按固定周期刷新
const HorizontalBar = defineAsyncComponent(
  () => import("./components/HorizontalBar.vue"),
);
const RadarBar = defineAsyncComponent(
  () => import("./components/RadarBar.vue"),
);
const Relation = defineAsyncComponent(
  () => import("./components/Relation.vue"),
);
const TotalData = defineAsyncComponent(
  () => import("./components/TotalData.vue"),
);
const MapChart = defineAsyncComponent(
  () => import("./components/MapChart.vue"),
);
const VerticalBar = defineAsyncComponent(
  () => import("./components/VerticalBar.vue"),
);
const RingBar = defineAsyncComponent(() => import("./components/RingBar.vue"));
const WordCloud = defineAsyncComponent(
  () => import("./components/WordCloud.vue"),
);

const data = ref(null);

const loadData = async () => {
  data.value = await getVisualization();
};

loadData();
setInterval(() => {
  loadData();
}, 20000);
</script>
