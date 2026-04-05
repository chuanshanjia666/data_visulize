<template>
  <div>
    <div>【大区数据信息】</div>
    <div ref="target" class="w-full h-full"></div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import * as echarts from "echarts";

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

// 1.初始化 echarts 实例
let myChart = null;
const target = ref(null);
const cityColors = [
  "#2E86DE",
  "#16A085",
  "#F39C12",
  "#E74C3C",
  "#8E44AD",
  "#27AE60",
  "#D35400",
  "#1ABC9C",
];

onMounted(() => {
  myChart = echarts.init(target.value);
  renderChart();
});

// 2.构建 option 配置对象
const renderChart = () => {
  const options = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    // x轴展示数据
    xAxis: {
      show: true,
      type: "value",
      min: 0,
      max: 500,
      axisLine: {
        show: true,
        lineStyle: {
          color: "#6f8aa8",
        },
      },
      axisTick: {
        show: true,
      },
      axisLabel: {
        color: "#b6c7d9",
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: "rgba(158, 177, 200, 0.2)",
          type: "dashed",
        },
      },
    },
    // y轴展示数据
    yAxis: {
      type: "category",
      data: props.data.regions.map((item) => item.name),
      inverse: true,
      axisLine: {
        show: true,
        lineStyle: {
          color: "#6f8aa8",
        },
      },
      axisTick: {
        show: true,
      },
      axisLabel: {
        color: "#9eb1c8",
      },
    },
    // 图表绘制的位置 对应 上下左右
    grid: {
      top: 10,
      right: 20,
      bottom: 25,
      left: 10,
      containLabel: true,
    },
    // 核心配置
    series: [
      {
        type: "bar",
        data: props.data.regions.map((item) => ({
          name: item.name,
          value: item.value,
        })),
        // 设置柱形图每个柱子背景色
        showBackground: true,
        backgroundStyle: {
          color: "rgba(180,180,180,.2)",
        },
        // 指定每个柱子的样式
        itemStyle: {
          color: (params) => cityColors[params.dataIndex % cityColors.length],
          borderRadius: 0,
          shadowColor: "rgba(0,0,0,.3)",
          shadowBlur: 5,
        },
        // 指定每个柱子的宽度
        barWidth: 12,
        // 柱子上方的字体
        label: {
          show: true,
          position: "right",
          color: "#fff",
          formatter: "{c}",
        },
      },
    ],
  };

  // 3.通过 实例.setOption(option)
  myChart.setOption(options);
};

// 监听data变化,重新渲染图表
watch(
  () => props.data,
  () => {
    renderChart();
  },
);
</script>
