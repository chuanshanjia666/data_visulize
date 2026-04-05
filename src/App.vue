<template>
  <div
    class="bg-[url('assets/imgs/bg.jpg')] bg-cover bg-center h-screen text-white p-5 flex overflow-hidden"
    v-if="data"
  >
    <!-- 左 -->
    <div
      class="flex-1 mr-5 bg-slate-900/58 border border-emerald-200/25 shadow-[0_10px_30px_rgba(0,0,0,0.25)] backdrop-blur-md p-3 flex flex-col"
    >
      <!-- 横向柱状图 -->
      <HorizontalBar
        class="h-1/3 box-border pb-4"
        :data="data.hakimiIndexData"
      />
      <!-- 雷达图 -->
      <RadarBar class="h-1/3 box-border pb-4" :data="data.haqiRiskData" />
      <!-- 关系图 -->
      <Relation class="h-1/3" :data="data.relationData" />
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
      <RingBar class="h-1/3 box-border pb-4" :data="data.hakimiHappinessData" />
      <!-- 文档云图 -->
      <WordCloud class="h-1/3" :data="data.wordCloudData" />
    </div>
  </div>
</template>

<script setup>
import HorizontalBar from "./components/HorizontalBar.vue";
import RadarBar from "./components/RadarBar.vue";
import Relation from "./components/Relation.vue";
import TotalData from "./components/TotalData.vue";
import MapChart from "./components/MapChart.vue";
import VerticalBar from "./components/VerticalBar.vue";
import RingBar from "./components/RingBar.vue";
import WordCloud from "./components/WordCloud.vue";

import { getVisualization } from "./api/visualization.js";
import { ref } from "vue";

const data = ref(null);

const loadData = async () => {
  data.value = await getVisualization();
};

loadData();
setInterval(() => {
  loadData();
}, 10000);
</script>
