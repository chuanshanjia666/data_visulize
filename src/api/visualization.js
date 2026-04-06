export const getVisualization = (year = 2024) => {
  return getMockLiaoningData(year);
};

export const getMockLiaoningData = (year = 2024) => {
  // 辽宁省8个城市
  const cities = [
    "沈阳市",
    "大连市",
    "鞍山市",
    "抚顺市",
    "本溪市",
    "丹东市",
    "锦州市",
    "营口市",
  ];

  // 辽宁省城市发展指数数据
  const liaoningCityDevelopmentData = {
    cityDevelopmentIndexes: cities.map((city) => ({
      name: city,
      value: Math.floor(Math.random() * 260 + 180),
    })),
  };

  // 辽宁省物流风险指数数据
  const liaoningLogisticsRiskData = {
    logisticsRisks: cities.map((city) => ({
      name: city,
      value: Math.floor(Math.random() * 35 + 45),
    })),
  };

  // 关系数据：随机生成拓扑，但固定沈阳为中心
  const centerPoint = [50, 200];
  const centerCity = cities[0];
  const peripheralCities = cities.filter((city) => city !== centerCity);

  const relationNodes = [
    {
      id: 0,
      name: centerCity,
      value: centerPoint,
      source: null,
      target: null,
    },
    ...peripheralCities.map((city, index) => {
      const angle =
        (Math.PI * 2 * index) / peripheralCities.length +
        (Math.random() - 0.5) * 0.35;
      const radius = 150 + Math.random() * 55;
      const x = Number((centerPoint[0] + Math.cos(angle) * radius).toFixed(2));
      const y = Number((centerPoint[1] + Math.sin(angle) * radius).toFixed(2));
      const id = index + 1;
      // 让节点以中心为主，也保留少量级联链路，形成动态拓扑结构
      const source =
        Math.random() < 0.68 || id <= 2 ? 0 : Math.floor(Math.random() * id);

      return {
        id,
        name: city,
        value: [x, y],
        source,
        target: id,
      };
    }),
  ];

  // 辽宁省物流拓扑数据
  const liaoningLogisticsTopologyData = {
    topologyNodes: relationNodes,
  };

  // 总览数据
  const totalData = {
    total: 43000000 + (year - 2020) * 260000, // 辽宁总人口(模拟)
    hm: Math.floor(5800000 + Math.random() * 400000), // 沈阳市
    dg: Math.floor(4700000 + Math.random() * 350000), // 大连市
    dd: Math.floor(3300000 + Math.random() * 260000), // 鞍山市
    nl: Math.floor(2100000 + Math.random() * 180000), // 抚顺市
    ax: Math.floor(1600000 + Math.random() * 140000), // 本溪市
    xl: Math.floor(2200000 + Math.random() * 160000), // 丹东市
    xq: Math.floor(2500000 + Math.random() * 170000), // 锦州市
    mb: Math.floor(2300000 + Math.random() * 170000), // 营口市
  };

  // 地图人口数据
  const populationData = {
    voltageLevel: [2020, 2021, 2022, 2023, 2024],
    colors: ["#5470c6", "#91cc75", "#fac858", "#ee6666", "#73c0de"],
    categoryData: {},
    topData: {},
  };

  // 为每个年份生成数据
  [2020, 2021, 2022, 2023, 2024].forEach((y) => {
    const yearFactor = 1 + (y - 2020) * 0.1;

    // 城市数据
    populationData.categoryData[y] = cities.map((city) => ({
      name: city,
      value: Math.floor(Math.random() * 100 * yearFactor + 50),
    }));

    // 热点数据（8个城市全部上图）
    populationData.topData[y] = cities.map((city) => {
      const coords = cityCoordinates[city] || [0, 0];
      return {
        name: city,
        value: [...coords, Math.floor(Math.random() * 200 * yearFactor + 100)],
      };
    });
  });

  // 城市GDP数据
  const gdpYears = [2020, 2021, 2022, 2023, 2024];
  const hakimiGdpData = {
    years: gdpYears,
    citySeries: cities.map((city, index) => {
      const base = 900 + index * 110 + Math.floor(Math.random() * 60);
      return {
        name: city,
        data: gdpYears.map((_, yearIndex) => {
          const growth = 1 + yearIndex * (0.06 + index * 0.005);
          const noise = Math.floor(Math.random() * 55);
          return Math.floor(base * growth + noise);
        }),
      };
    }),
  };

  // 辽宁省城市幸福指数数据
  const liaoningCityHappinessData = {
    cityHappinessIndexes: [
      { name: "沈阳市", value: Math.floor(Math.random() * 210 + 230) },
      { name: "大连市", value: Math.floor(Math.random() * 170 + 190) },
      { name: "鞍山市", value: Math.floor(Math.random() * 140 + 140) },
      { name: "抚顺市", value: Math.floor(Math.random() * 120 + 110) },
      { name: "本溪市", value: Math.floor(Math.random() * 100 + 90) },
      { name: "丹东市", value: Math.floor(Math.random() * 95 + 85) },
    ],
  };

  // 词云数据
  const wordTerms = [
    "沈阳市",
    "大连市",
    "鞍山市",
    "抚顺市",
    "本溪市",
    "丹东市",
    "锦州市",
    "营口市",
    "沈大经济走廊",
    "沿海经济带",
    "老工业基地",
    "先进制造",
    "港口联动",
    "海铁联运",
    "产业升级",
    "数字政务",
    "城市更新",
    "文旅融合",
    "生态修复",
    "智能调度",
    "风险监测",
    "应急联动",
    "科技创新",
    "民生保障",
    "营商环境",
    "区域协同",
    "交通枢纽",
    "新能源",
    "跨境合作",
    "乡村振兴",
  ];
  const wordCloudData = {
    datas: wordTerms
      .sort(() => Math.random() - 0.5)
      .map((name, index) => ({
        name,
        value: Math.floor(55 + Math.random() * 80) + (30 - index),
      })),
  };

  return {
    liaoningCityDevelopmentData,
    liaoningLogisticsRiskData,
    liaoningLogisticsTopologyData,
    totalData,
    populationData,
    hakimiGdpData,
    liaoningCityHappinessData,
    wordCloudData,
    currentYear: year,
  };
};

const cityCoordinates = {
  沈阳市: [123.431474, 41.805698],
  大连市: [121.614682, 38.914003],
  鞍山市: [122.994329, 41.108647],
  抚顺市: [123.957208, 41.880872],
  本溪市: [123.766485, 41.294355],
  丹东市: [124.354706, 40.200499],
  锦州市: [121.127003, 41.095119],
  营口市: [122.235417, 40.667012],
};
