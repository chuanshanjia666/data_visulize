<template>
  <div>
    <div class="panel-title">热门词条</div>
    <div ref="target" class="w-full h-full"></div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import echarts from "../lib/echarts";
import "echarts/lib/component/tooltip";
import "echarts-wordcloud";

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const target = ref(null);
let myChart = null;
const pageSize = 8;

onMounted(() => {
  myChart = echarts.init(target.value);
  renderChart();
});

const colorPalette = [
  "#59C3FF",
  "#7AE582",
  "#FFD166",
  "#FF8C78",
  "#B794F4",
  "#4DD6C6",
  "#F49AC2",
  "#8BE3E8",
  "#FFB703",
  "#90BE6D",
  "#56CCF2",
  "#F28482",
  "#9D4EDD",
  "#00C2A8",
  "#FF6B6B",
  "#A0E7E5",
];

const getDisplayWords = () => {
  const words = props.data.datas || [];
  return words.slice(0, pageSize);
};

const renderChart = () => {
  const displayWords = getDisplayWords();

  const options = {
    animationDuration: 800,
    animationEasing: "cubicOut",
    animationDurationUpdate: 900,
    animationEasingUpdate: "quarticOut",
    tooltip: {
      show: true,
      borderColor: "#fe9a8bb3",
      borderWidth: 1,
      padding: [10, 15, 10, 15],
      confine: true,
      backgroundColor: "rgba(255, 255, 255, .9)",
      textStyle: {
        color: "hotpink",
        lineHeight: 22,
      },
      extraCssText:
        "box-shadow: 0 4px 20px -4px rgba(199, 206, 215, .7);border-radius: 4px;",
    },
    series: [
      {
        type: "wordCloud",
        // 设置文字大小范围
        sizeRange: [8, 46],
        // 设置文字旋转
        rotationRange: [0, 0],
        // 单词之间的间距
        gridSize: 0,
        // 渲染动画
        layoutAnimation: true,
        // 字体样式
        textStyle: {
          color: (params) =>
            colorPalette[params.dataIndex % colorPalette.length],
        },
        // 高亮字体
        emphasis: {
          textStyle: {
            fontWeight: "bold",
            color: "#000",
          },
        },
        data: displayWords,
      },
    ],
  };

  myChart.setOption(options);
};

// 监听数据改变重新渲染
watch(
  () => props.data,
  () => {
    renderChart();
  },
);

onBeforeUnmount(() => {
  myChart?.dispose();
  myChart = null;
});
</script>
