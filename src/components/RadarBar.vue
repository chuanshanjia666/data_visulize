<template>
  <div>
    <div class="panel-title">辽宁省物流风险指数</div>
    <div ref="target" class="w-full h-full"></div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import echarts from "../lib/echarts";
import "echarts/lib/chart/radar";
import "echarts/lib/component/radar";
import "echarts/lib/component/tooltip";

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const target = ref(null);
let myChart = null;

// 修改说明：最终版将雷达图固定为物流风险专题，强调单组指标轮廓
onMounted(() => {
  myChart = echarts.init(target.value);
  renderChart();
});

const renderChart = () => {
  const riskList = props.data.logisticsRisks || [];

  const options = {
    tooltip: {
      trigger: "item",
    },
    // 雷达图的坐标系配置
    radar: {
      // 雷达图名字
      axisName: {
        color: "#d1e8ff",
        fontSize: 12,
        fontWeight: 600,
      },
      // 雷达图形状
      shape: "polygon",
      // 居中位置
      center: ["50%", "50%"],
      radius: "72%",
      // 起始角度
      startAngle: 90,
      // 分割段数
      splitNumber: 5,
      // 轴线配置
      axisLine: {
        lineStyle: {
          color: "rgba(126, 170, 214, 0.55)",
        },
      },
      // 网格线
      splitLine: {
        show: true,
        lineStyle: {
          width: 1,
          color: "rgba(126, 170, 214, 0.35)",
        },
      },
      // 指示器文字
      indicator: riskList.map((item) => ({
        name: item.name,
        max: 100,
      })),

      splitArea: {
        show: true,
        areaStyle: {
          color: ["rgba(84, 130, 178, 0.08)", "rgba(84, 130, 178, 0.02)"],
        },
      },
    },
    // 图表核心配置
    series: {
      type: "radar",
      symbol: "circle",
      // 拐角大小
      symbolSize: 7,
      // item样式
      itemStyle: {
        color: "#8ec5ff",
        borderColor: "#dff1ff",
        borderWidth: 1,
      },
      // 填充区域
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: "rgba(120, 186, 255, 0.42)",
          },
          {
            offset: 1,
            color: "rgba(120, 186, 255, 0.16)",
          },
        ]),
      },
      // 线条颜色
      lineStyle: {
        width: 2.5,
        color: "#8ec5ff",
      },
      label: {
        show: true,
        color: "#e7f2ff",
        fontSize: 11,
        fontWeight: 600,
      },
      data: [
        {
          value: riskList.map((item) => item.value),
        },
      ],
    },
  };

  myChart.setOption(options);
};

// 监听数据改变重新渲染
watch(() => props.data, renderChart);
</script>
