<template>
  <div>
    <div class="panel-title">城市GDP</div>
    <div ref="target" class="w-full h-full"></div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import echarts from "../lib/echarts";
import "echarts/lib/chart/line";
import "echarts/lib/component/axisPointer";
import "echarts/lib/component/grid";
import "echarts/lib/component/legend";
import "echarts/lib/component/tooltip";

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const target = ref(null);
let myChart = null;

// 修改说明：最终版把 GDP 模块调整成多城市年度趋势折线图
onMounted(() => {
  myChart = echarts.init(target.value);
  renderChart();
});

const renderChart = () => {
  const citySeries = props.data.citySeries || [];
  const lineColors = [
    "#63C7FF",
    "#74E38A",
    "#FFD36A",
    "#FF9E83",
    "#B99CFF",
    "#57D9C8",
    "#F49AC2",
    "#8BE3E8",
  ];

  const options = {
    tooltip: {
      trigger: "axis",
      valueFormatter: (value) => `${value} 亿`,
    },
    legend: {
      top: 2,
      left: 0,
      right: 0,
      icon: "circle",
      itemWidth: 8,
      itemHeight: 8,
      itemGap: 10,
      textStyle: {
        color: "rgba(231, 242, 255, 0.86)",
        fontSize: 10,
      },
      data: citySeries.map((item) => item.name),
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: props.data.years,
      axisLine: {
        lineStyle: {
          color: "rgba(158, 177, 200, 0.45)",
        },
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: "#c5d8ef",
        showMaxLabel: true,
      },
    },
    yAxis: {
      type: "value",
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: "#b9d0ea",
        formatter: "{value} 亿",
      },
      splitLine: {
        lineStyle: {
          color: "rgba(158, 177, 200, 0.15)",
          type: "dashed",
        },
      },
    },
    grid: {
      top: 58,
      right: 20,
      bottom: 22,
      left: 16,
      containLabel: true,
    },
    series: citySeries.map((item, index) => ({
      name: item.name,
      type: "line",
      smooth: true,
      symbol: "circle",
      symbolSize: 5,
      data: item.data,
      lineStyle: {
        width: 2,
        color: lineColors[index % lineColors.length],
      },
      itemStyle: {
        color: lineColors[index % lineColors.length],
      },
      emphasis: {
        focus: "series",
      },
    })),
  };

  myChart.setOption(options);
};

// 监听数据改变重新渲染
watch(() => props.data, renderChart);
</script>
