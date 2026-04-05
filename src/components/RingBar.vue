<template>
  <div>
    <div class="panel-title">哈吉米幸福指数</div>
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

const target = ref(null);
let myChart = null;
onMounted(() => {
  myChart = echarts.init(target.value);
  renderChart();
});

const getSeriesData = () => {
  const colors = [
    "#59C3FF",
    "#7AE582",
    "#FFD166",
    "#FF8C78",
    "#B794F4",
    "#4DD6C6",
  ];

  return [
    {
      name: "哈吉米幸福指数",
      type: "pie",
      radius: ["15%", "68%"],
      center: ["38%", "57%"],
      roseType: "radius",
      clockwise: true,
      padAngle: 2,
      itemStyle: {
        borderRadius: 2,
        borderColor: "rgba(255,255,255,0.22)",
        borderWidth: 1,
      },
      label: {
        color: "#eaf5ff",
        fontSize: 11,
        fontWeight: 600,
        formatter: "{b}\n{c}",
      },
      labelLine: {
        length: 12,
        length2: 8,
        lineStyle: {
          color: "rgba(255,255,255,0.55)",
        },
      },
      emphasis: {
        scale: true,
        scaleSize: 6,
      },
      data: props.data.happinessIndexes.map((item, index) => ({
        name: item.name,
        value: item.value,
        itemStyle: {
          color: colors[index % colors.length],
        },
      })),
    },
  ];
};

const renderChart = () => {
  const options = {
    // 图例配置
    legend: {
      show: true,
      // 图例形状
      icon: "circle",
      // 图例位置
      top: "16%",
      right: "4%",
      data: props.data.happinessIndexes.map((item) => item.name),
      // width:-5
      orient: "vertical",
      // 设置色块宽度
      itemWidth: 10,
      // 设置色块高度
      itemHeight: 9,
      // 图例之间的间距
      itemGap: 5,
      // 设置字体
      textStyle: {
        fontSize: 11,
        lineHeight: 14,
        color: "rgba(255,255,255,0.88)",
      },
    },
    // 提示层
    tooltip: {
      show: true,
      trigger: "item",
      formatter: "{a}<br/>{b}：{c}",
    },
    // 核心配置
    series: getSeriesData(),
  };

  myChart.setOption(options);
};

// 监听数据改变重新渲染
watch(() => props.data, renderChart);
</script>
