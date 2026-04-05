export const getVisualization = (year = 2024) => {
  return getMockLiaoningData(year);
};

export const getMockLiaoningData = (year = 2024) => {
  // 哈基米省8个城市
  const cities = [
    "哈基米",
    "大狗嚼",
    "叮咚鸡",
    "南北绿豆",
    "阿西伽",
    "耐龙",
    "香企鹅",
    "曼波",
  ];

  const baseValue = 2020 + (year - 2020) * 50; // 哈基米指数基准值

  // 生成各区数据
  const hakimiIndexData = {
    regions: cities.map((city) => ({
      name: city,
      value: Math.floor(Math.random() * 300 + 100),
    })),
  };

  // 哈气风险数据
  const haqiRiskData = {
    haqiRisks: cities.map((city) => ({
      name: city,
      value: Math.floor(Math.random() * 40 + 40),
    })),
  };

  // 关系数据：随机生成拓扑，但固定哈吉米为中心
  const centerPoint = [50, 200];
  const peripheralCities = cities.filter((city) => city !== "哈基米");

  const relationNodes = [
    {
      id: 0,
      name: "哈基米",
      value: centerPoint,
      source: null,
      target: null,
    },
    ...peripheralCities.map((city, index) => {
      const angle = (Math.PI * 2 * index) / peripheralCities.length + (Math.random() - 0.5) * 0.35;
      const radius = 150 + Math.random() * 55;
      const x = Number((centerPoint[0] + Math.cos(angle) * radius).toFixed(2));
      const y = Number((centerPoint[1] + Math.sin(angle) * radius).toFixed(2));
      const id = index + 1;
      // 让节点以中心为主，也保留少量级联链路，形成动态拓扑结构
      const source = Math.random() < 0.68 || id <= 2 ? 0 : Math.floor(Math.random() * id);

      return {
        id,
        name: city,
        value: [x, y],
        source,
        target: id,
      };
    }),
  ];

  const relationData = {
    relations: relationNodes,
  };

  // 总览数据
  const totalData = {
    total: 8000000 + year * 100000, // 哈基米总人口
    hm: Math.floor(2000000 + Math.random() * 500000), // 哈基米指数
    dg: Math.floor(1500000 + Math.random() * 400000), // 大狗嚼经济
    dd: Math.floor(1800000 + Math.random() * 300000), // 叮咚鸡科技
    nl: Math.floor(1200000 + Math.random() * 200000), // 南北绿豆农业
    ax: Math.floor(1000000 + Math.random() * 250000), // 阿西伽文化
    xl: Math.floor(800000 + Math.random() * 150000),  // 耐龙旅游
    xq: Math.floor(700000 + Math.random() * 100000),  // 香企鹅生态
    mb: Math.floor(600000 + Math.random() * 120000),  // 曼波渔业
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

    // 热点数据
    populationData.topData[y] = cities.slice(0, 4).map((city) => {
      const coords = cityCoordinates[city] || [0, 0];
      return {
        name: city,
        value: [...coords, Math.floor(Math.random() * 200 * yearFactor + 100)],
      };
    });
  });

  // 哈吉米GDP数据
  const gdpYears = [2020, 2021, 2022, 2023, 2024];
  const hakimiGdpData = {
    years: gdpYears,
    citySeries: cities.map((city, index) => {
      const base = 420 + index * 75 + Math.floor(Math.random() * 45);
      return {
        name: city,
        data: gdpYears.map((_, yearIndex) => {
          const growth = 1 + yearIndex * (0.08 + index * 0.01);
          const noise = Math.floor(Math.random() * 35);
          return Math.floor(base * growth + noise);
        }),
      };
    }),
  };

  // 哈吉米幸福指数数据
  const hakimiHappinessData = {
    happinessIndexes: [
      { name: "哈基米", value: Math.floor(Math.random() * 200 + 200) },
      { name: "大狗嚼", value: Math.floor(Math.random() * 150 + 150) },
      { name: "叮咚鸡", value: Math.floor(Math.random() * 120 + 100) },
      { name: "南北绿豆", value: Math.floor(Math.random() * 100 + 80) },
      { name: "阿西伽", value: Math.floor(Math.random() * 80 + 60) },
      { name: "耐龙", value: Math.floor(Math.random() * 60 + 40) },
    ],
  };

  // 词云数据
  const wordTerms = [
    "哈基米",
    "大狗嚼",
    "叮咚鸡",
    "南北绿豆",
    "阿西伽",
    "耐龙",
    "香企鹅",
    "曼波",
    "数据中台",
    "智慧调度",
    "全域感知",
    "拓扑链路",
    "云端协同",
    "异常监测",
    "实时告警",
    "趋势研判",
    "城市画像",
    "风险评级",
    "资源编排",
    "链路压测",
    "态势推演",
    "流量脉冲",
    "关键节点",
    "多源汇聚",
    "算力分发",
    "边缘联动",
    "数据治理",
    "策略引擎",
    "统一指标",
    "服务编组",
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
    hakimiIndexData,
    haqiRiskData,
    relationData,
    totalData,
    populationData,
    hakimiGdpData,
    hakimiHappinessData,
    wordCloudData,
    currentYear: year,
  };
};

// 城市坐标映射 - 猫形状布局 (映射到GeoJSON坐标系)
const cityCoordinates = {
  哈基米: [-177.5825492, -13.2787832],   // 猫头中心
  大狗嚼: [-214.9598627, 61.0041041],    // 左耳区域
  叮咚鸡: [-177.157807, 73.4952661],     // 右耳区域
  南北绿豆: [-243.8423322, 41.142121],   // 左前爪连接线附近
  阿西伽: [-166.1145098, 47.2255576],    // 右前爪连接线附近
  耐龙: [-241.7186212, 29.3927995],      // 左后爪连接线附近
  香企鹅: [-165.6897676, 43.342838],     // 右后爪连接线附近
  曼波: [-237.046457, 18.5483919],       // 尾巴区域
};
