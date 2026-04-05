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

  // 风险数据
  const riskData = {
    risks: cities.slice(0, 6).map((city) => ({
      name: city,
      value: Math.floor(Math.random() * 40 + 40),
    })),
  };

  // 关系数据
  const relationData = {
    relations: [
      {
        id: 0,
        name: "哈基米数据中心",
        value: [0, 200],
        source: null,
        target: null,
        speed: 0,
      },
      {
        id: 1,
        name: "大狗嚼分中心",
        value: [50, 300],
        source: 0,
        target: 1,
        speed: 187,
      },
      {
        id: 2,
        name: "叮咚鸡分中心",
        value: [50, 100],
        source: 0,
        target: 2,
        speed: 154,
      },
      {
        id: 3,
        name: "南北绿豆分中心",
        value: [100, 150],
        source: 2,
        target: 3,
        speed: 100,
      },
      {
        id: 4,
        name: "阿西伽分中心",
        value: [100, 250],
        source: 1,
        target: 4,
        speed: 64,
      },
    ],
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

  // 地图数据
  const mapData = {
    voltageLevel: [2020, 2021, 2022, 2023, 2024],
    colors: ["#5470c6", "#91cc75", "#fac858", "#ee6666", "#73c0de"],
    categoryData: {},
    topData: {},
  };

  // 为每个年份生成数据
  [2020, 2021, 2022, 2023, 2024].forEach((y) => {
    const yearFactor = 1 + (y - 2020) * 0.1;

    // 城市数据
    mapData.categoryData[y] = cities.map((city) => ({
      name: city,
      value: Math.floor(Math.random() * 100 * yearFactor + 50),
    }));

    // 热点数据
    mapData.topData[y] = cities.slice(0, 4).map((city) => {
      const coords = cityCoordinates[city] || [0, 0];
      return {
        name: city,
        value: [...coords, Math.floor(Math.random() * 200 * yearFactor + 100)],
      };
    });
  });

  // 哈基米特产数据
  const serverData = {
    servers: [
      { name: "喵咪鱼干", value: Math.floor(Math.random() * 30 + 60) },
      { name: "狗嚼饼干", value: Math.floor(Math.random() * 20 + 70) },
      { name: "鸡蛋布丁", value: Math.floor(Math.random() * 25 + 50) },
      { name: "绿豆汤", value: Math.floor(Math.random() * 35 + 40) },
      { name: "伽马射线", value: Math.floor(Math.random() * 15 + 30) },
      { name: "龙卷风", value: Math.floor(Math.random() * 20 + 45) },
    ],
  };

  // 异常数据
  const abnormalData = {
    abnormals: [
      { name: "哈基米", value: Math.floor(Math.random() * 200 + 200) },
      { name: "大狗嚼", value: Math.floor(Math.random() * 150 + 150) },
      { name: "叮咚鸡", value: Math.floor(Math.random() * 120 + 100) },
      { name: "南北绿豆", value: Math.floor(Math.random() * 100 + 80) },
      { name: "阿西伽", value: Math.floor(Math.random() * 80 + 60) },
      { name: "耐龙", value: Math.floor(Math.random() * 60 + 40) },
    ],
  };

  // 词云数据
  const wordCloudData = {
    datas: [
      { name: "哈基米", value: 100 },
      { name: "大狗嚼", value: 95 },
      { name: "叮咚鸡", value: 85 },
      { name: "南北绿豆", value: 70 },
      { name: "阿西伽", value: 65 },
      { name: "耐龙", value: 60 },
      { name: "香企鹅", value: 55 },
      { name: "曼波", value: 50 },
    ],
  };

  return {
    hakimiIndexData,
    riskData,
    relationData,
    totalData,
    mapData,
    serverData,
    abnormalData,
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
