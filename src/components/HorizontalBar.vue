<template>
  <div>
    <div class="panel-title">哈吉米指数</div>
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
const cityGradientPairs = [
  ["#64A6E8", "#2E86DE"],
  ["#45B7A5", "#16A085"],
  ["#F7B75A", "#F39C12"],
  ["#EF7A6F", "#E74C3C"],
  ["#A56BC2", "#8E44AD"],
  ["#56C584", "#27AE60"],
  ["#DF7C46", "#D35400"],
  ["#45D4BC", "#1ABC9C"],
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
        fontSize: 11,
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
        fontSize: 12,
        fontWeight: 500,
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
          color: (params) => {
            const [start, end] =
              cityGradientPairs[params.dataIndex % cityGradientPairs.length];
            return new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color: start },
              { offset: 1, color: end },
            ]);
          },
          borderRadius: 0,
          shadowColor: "rgba(0,0,0,.18)",
          shadowBlur: 4,
        },
        // 指定每个柱子的宽度
        barWidth: 12,
        // 柱子上方的字体
        label: {
          show: true,
          position: "right",
          color: "#e7f1ff",
          fontSize: 12,
          fontWeight: 600,
          formatter: "{c}",
          textShadowColor: "rgba(0,0,0,0.25)",
          textShadowBlur: 2,
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

<style scoped>
.panel-title {
  margin-bottom: 8px;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.8px;
  background: linear-gradient(90deg, #d4e9ff 0%, #a9d2ff 55%, #8bb8e4 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}
</style>
