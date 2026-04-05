<template>
  <div>
    <div class="panel-title">哈气拓扑图</div>
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

const renderChart = () => {
  const topoMarks = ["哈", "基", "米", "南", "北", "绿", "豆", "哈"];
  const nodeColors = [
    "#4CC9F0",
    "#F72585",
    "#B8F2E6",
    "#FF9F1C",
    "#9B5DE5",
    "#2EC4B6",
    "#E9C46A",
    "#90BE6D",
  ];
  const relationList = props.data.relations || [];
  const centerNode =
    relationList.find((item) => item.id === 0) ||
    relationList.find((item) => item.name === "哈基米");
  const centerValue = centerNode?.value || [50, 200];
  const [centerX, centerY] = centerValue;
  const viewRadius = 235;
  const nodeById = Object.fromEntries(
    relationList.map((item) => [item.id, item]),
  );

  const links = relationList
    .filter((item) => item.source !== null && item.target !== null)
    .map((item, index) => ({
      source: item.source,
      target: item.target,
      mark: topoMarks[index % topoMarks.length],
      // 线条样式
      lineStyle: {
        // 颜色
        color: "#12b5d0",
        // 曲线率
        curveness: 0.2,
      },
      // 设置线条文字样式
      label: {
        show: true,
        position: "middle",
        offset: [10, 0],
      },
    }));

  const effectLines = links
    .map((link) => {
      const sourceNode = nodeById[link.source];
      const targetNode = nodeById[link.target];
      if (!sourceNode || !targetNode) {
        return null;
      }

      return {
        coords: [sourceNode.value, targetNode.value],
      };
    })
    .filter(Boolean);

  const options = {
    xAxis: {
      show: false,
      type: "value",
      min: centerX - viewRadius,
      max: centerX + viewRadius,
    },
    yAxis: {
      show: false,
      type: "value",
      min: centerY - viewRadius,
      max: centerY + viewRadius,
    },

    series: [
      // 配置一 graph图表类型
      {
        type: "graph",
        layout: "none",
        // 设置二维直角坐标系
        coordinateSystem: "cartesian2d",
        // 设置节点大小
        symbolSize: 26,
        z: 3,
        // 设置边界线条文字
        edgeLabel: {
          show: true,
          color: "#f2fbff",
          fontSize: 13,
          fontWeight: 700,
          textBorderColor: "rgba(12, 37, 64, 0.85)",
          textBorderWidth: 2,
          textShadowColor: "rgba(0, 0, 0, 0.35)",
          textShadowBlur: 4,
          formatter: function (params) {
            return params.data.mark || "";
          },
        },
        // 处理圆点下面的文字
        label: {
          show: true,
          position: "bottom",
          distance: 8,
          color: "#e8f4ff",
          fontSize: 16,
          fontWeight: 600,
          textBorderColor: "rgba(7, 24, 46, 0.9)",
          textBorderWidth: 3,
          textShadowColor: "rgba(0, 0, 0, 0.35)",
          textShadowBlur: 6,
        },

        //  线条上面的箭头
        edgeSymbol: ["none", "arrow"],
        // 设置 线条上面的箭头大小
        edgeSymbolSize: 8,
        // 根据id设置不同的源数据
        data: relationList.map((item) => {
          if (item.id !== 0) {
            // 非数据中心
            return {
              name: item.name,
              value: item.value,
              itemStyle: {
                color: nodeColors[(item.id - 1) % nodeColors.length],
              },
            };
          } else {
            // 数据中心
            return {
              name: item.name,
              value: item.value,
              symbolSize: 50,
              // 设置数据中心渐变
              itemStyle: {
                // 渐变色
                color: {
                  colorStops: [
                    { offset: 0, color: "#157eff" },
                    {
                      offset: 1,
                      color: "#35c2ff",
                    },
                  ],
                },
              },
              // label
              label: {
                color: "#f4fcff",
                fontSize: 22,
                fontWeight: 700,
                textBorderColor: "rgba(8, 28, 50, 0.95)",
                textBorderWidth: 4,
                textShadowColor: "rgba(0, 0, 0, 0.35)",
                textShadowBlur: 8,
              },
            };
          }
        }),
        // 设置节点之间连接线的数据关系links
        links,
      },
      // 配置二 lines---配置会动的箭头
      {
        type: "lines",
        coordinateSystem: "cartesian2d",
        z: 1,
        // 线特效的配置
        effect: {
          show: true,
          smooth: false,
          trailLength: 0,
          symbol: "arrow",
          color: "rgba(55,155,255,0.6)",
          symbolSize: 12,
        },
        lineStyle: {
          // 曲线率
          curveness: 0.2,
        },
        // 线的数据级，使用关系数据动态生成
        data: effectLines,
      },
    ],
  };

  myChart.setOption(options);
};

// 监听数据改变重新渲染
watch(() => props.data, renderChart);
</script>

<style scoped>
.panel-title {
  margin-bottom: 8px;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.8px;
  color: #e7f5ff;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.35);
}
</style>
