<template>
  <div>
    <div ref="target" class="w-full h-full"></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import echarts from "../lib/echarts";
import "echarts/lib/chart/bar";
import "echarts/lib/chart/effectScatter";
import "echarts/lib/chart/map";
import "echarts/lib/component/geo";
import "echarts/lib/component/grid";
import "echarts/lib/component/timeline";
import "echarts/lib/component/title";
import "echarts/lib/component/tooltip";

const LIAONING_GEOJSON_URL = "https://geojson.cn/api/china/1.6.3/210000.json";
const MAP_NAME = "liaoning";

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const target = ref(null);
let myChart = null;

// 修改说明：最终版改为在线拉取辽宁 GeoJSON，并用时间轴联动地图、柱图和热点
onMounted(async () => {
  try {
    const response = await fetch(LIAONING_GEOJSON_URL);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const mapJson = await response.json();
    echarts.registerMap(MAP_NAME, mapJson);
  } catch (error) {
    console.error("加载辽宁地图数据失败:", error);
    return;
  }

  myChart = echarts.init(target.value);
  renderChart();
});

const renderChart = () => {
  const cityPalette = [
    "#5B8FF9",
    "#61DDAA",
    "#65789B",
    "#F6BD16",
    "#7262FD",
    "#78D3F8",
    "#9661BC",
    "#F6903D",
  ];
  const cityColorMap = {};
  let cityColorCursor = 0;

  const options = {
    // 时间线
    timeline: {
      data: props.data.voltageLevel,
      axisType: "category",
      // 时间线自动切换
      autoPlay: true,
      // 切换时间
      playInterval: 4000,
      // 时间轴位置
      left: "10%",
      right: "10%",
      bottom: "0%",
      width: "80%",
      // 时间轴文本
      label: {
        // 默认字体
        color: "#ddd",
        // 高亮字体
        emphasis: {
          color: "#fff",
        },
      },
      // 每个小圆点大小
      symbolSize: 10,
      // 线的颜色
      lineStyle: {
        color: "#555",
      },
      // 选中每个小圆点的颜色
      checkpointStyle: {
        // 每个小圆点边框颜色
        borderColor: "#888",
        // 每个小圆点边框宽度
        borderWidth: 2,
        // 控件样式
        controlStyle: {
          // 下一步按钮
          showNextBtn: true,
          // 上一步按钮
          showPrevBtn: true,
          // 默认样式
          color: "#666",
          borderColor: "#666",
          // 高亮样式
          emphasis: {
            color: "#aaa",
            borderColor: "#aaa",
          },
        },
      },
    },
    // 柱形图展示范围
    baseOption: {
      grid: {
        right: "2%",
        top: "14%",
        bottom: "22%",
        width: "36%",
        height: "24%",
      },
      // 地图配置
      geo: {
        show: true,
        map: MAP_NAME,
        // 开启缩放
        roam: true,
        zoom: 1.18,
        // 中心点==经纬度
        center: [122.7, 41.3],
        // 默认状态下省份样式
        itemStyle: {
          borderColor: "rgba(147,235,248,1)",
          borderWidth: 1,
          // 区域颜色
          areaColor: {
            type: "radial",
            x: 0.5,
            y: 0.5,
            r: 0.5,
            // 设置渐变色
            colorStops: [
              {
                offset: 0,
                color: "rgba(147,235,248,0)",
              },
              {
                offset: 1,
                color: "rgba(147,235,248,.2)",
              },
            ],
          },
        },
        // 仅高亮当前悬停的城市区域
        emphasis: {
          itemStyle: {
            areaColor: "rgba(56,155,183,0.55)",
            borderColor: "#8de8ff",
            borderWidth: 2,
          },
        },
      },
    },
    options: [],
  };

  // 柱形图
  props.data.voltageLevel.forEach((item, index) => {
    const sortedCategoryData = [...props.data.categoryData[item]].sort(
      (a, b) => {
        return b.value - a.value;
      },
    );
    const cityValueMap = Object.fromEntries(
      props.data.categoryData[item].map((cityItem) => [
        cityItem.name,
        cityItem.value,
      ]),
    );
    const valueList = Object.values(cityValueMap);
    const minValue = Math.min(...valueList);
    const maxValue = Math.max(...valueList);
    const toSymbolSize = (cityName) => {
      const value = cityValueMap[cityName] ?? minValue;
      if (maxValue === minValue) return 16;
      const normalized = (value - minValue) / (maxValue - minValue);
      return 10 + normalized * 16;
    };
    const mapScatterData = props.data.topData[item].map((cityPoint) => ({
      ...cityPoint,
      barValue: cityValueMap[cityPoint.name] ?? 0,
      symbolSizeByBar: toSymbolSize(cityPoint.name),
    }));

    sortedCategoryData.forEach((cityItem) => {
      if (!cityColorMap[cityItem.name]) {
        cityColorMap[cityItem.name] =
          cityPalette[cityColorCursor % cityPalette.length];
        cityColorCursor += 1;
      }
    });

    options.options.push({
      tooltip: {
        trigger: "item",
        formatter: (params) => {
          if (params.seriesType === "map") {
            const regionName = params.name || "";
            const normalizedName = regionName.replace(/市$/, "");
            const matchedValue =
              cityValueMap[regionName] ??
              cityValueMap[`${normalizedName}市`] ??
              cityValueMap[normalizedName];

            if (Number.isFinite(matchedValue)) {
              return `${regionName}<br/>人口数据: ${matchedValue}`;
            }

            return `${regionName}<br/>人口数据: 没有数据`;
          }
          return "";
        },
      },
      title: [
        // 大title
        {
          text: "2020-2024 辽宁省年度人口数据",
          left: 0,
          top: 0,
          textStyle: {
            color: "#ccc",
            fontSize: 30,
          },
        },
        // 小标题
        {
          id: "statistic",
          text: item + "年辽宁省人口数据情况",
          right: "0%",
          top: "4%",
          textStyle: {
            color: "#ccc",
            fontSize: 20,
          },
        },
      ],
      xAxis: {
        type: "category",
        data: sortedCategoryData.map((cityItem) => cityItem.name),
        axisLabel: {
          interval: 0,
          color: "#ddd",
          rotate: 20,
          margin: 16,
          fontSize: 11,
        },
        splitLine: {
          show: false,
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: "#ddd",
          },
        },
        axisTick: {
          show: false,
        },
      },
      yAxis: {
        type: "value",
        scale: true,
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        splitLine: {
          show: false,
        },
      },
      series: [
        {
          type: "map",
          map: MAP_NAME,
          geoIndex: 0,
          selectedMode: false,
          roam: false,
          zlevel: 1,
          // 用透明填充承载交互数据，不改变底图视觉
          itemStyle: {
            areaColor: "rgba(0,0,0,0)",
            borderColor: "rgba(0,0,0,0)",
          },
          emphasis: {
            itemStyle: {
              areaColor: "rgba(56,155,183,0.55)",
              borderColor: "#8de8ff",
              borderWidth: 2,
            },
            label: {
              show: false,
            },
          },
          select: {
            disabled: true,
            itemStyle: {
              areaColor: "rgba(0,0,0,0)",
              borderColor: "rgba(0,0,0,0)",
            },
            label: {
              show: false,
            },
          },
          data: props.data.categoryData[item].map((cityItem) => ({
            name: cityItem.name,
            value: cityItem.value,
          })),
        },
        {
          type: "bar",
          zlevel: 1.5,
          barMaxWidth: 18,
          label: {
            show: true,
            position: "top",
            color: "#ddd",
            formatter: "{c}",
          },
          data: sortedCategoryData.map((cityItem) => ({
            value: cityItem.value,
            itemStyle: {
              color: cityColorMap[cityItem.name],
            },
          })),
        },
        {
          // 散点图
          type: "effectScatter",
          // 指定散点图坐标系
          coordinateSystem: "geo",
          // 数据==>省份名 经纬度 数据
          data: mapScatterData,
          tooltip: {
            show: false,
          },
          // 点的大小
          symbolSize: function (val, params) {
            return params?.data?.symbolSizeByBar ?? 10;
          },
          // 绘制波纹特效
          rippleEffect: {
            brushType: "stroke",
          },
          // 文字
          label: {
            formatter: "{b}",
            position: "right",
            show: true,
          },
          // 每一项的样式
          itemStyle: {
            color: (params) =>
              cityColorMap[params.name] || props.data.colors[index],
            shadowBlur: 5,
            shadowColor: (params) =>
              cityColorMap[params.name] || props.data.colors[index],
          },
        },
      ],
    });
  });

  myChart.setOption(options);
};
</script>
