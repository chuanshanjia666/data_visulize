export const getVisualization = (year = 2024) => {
  return getMockLiaoningData(year);
}

// 模拟数据接口（用于开发环境）
export const getMockLiaoningData = (year = 2024) => {
  // 辽宁省14个城市
  const cities = [
    "沈阳市",
    "大连市",
    "鞍山市",
    "抚顺市",
    "本溪市",
    "丹东市",
    "锦州市",
    "营口市",
    "阜新市",
    "辽阳市",
    "盘锦市",
    "铁岭市",
    "朝阳市",
    "葫芦岛市",
  ];

  // 根据年份生成不同的基础值
  const baseValue = 2020 + (year - 2020) * 50;

  // 生成各区数据
  const regionData = {
    regions: cities.map((city) => ({
      name: city,
      value: Math.floor(Math.random() * 300 + 100),
    })),
  };

  // 风险数据
  const riskData = {
    risks: cities.slice(0, 7).map((city) => ({
      name: city,
      value: Math.floor(Math.random() * 40 + 40),
    })),
  };

  // 关系数据
  const relationData = {
    relations: [
      {
        id: 0,
        name: "沈阳数据中心",
        value: [0, 200],
        source: null,
        target: null,
        speed: 0,
      },
      {
        id: 1,
        name: "大连分中心",
        value: [50, 300],
        source: 0,
        target: 1,
        speed: 187,
      },
      {
        id: 2,
        name: "鞍山分中心",
        value: [50, 100],
        source: 0,
        target: 2,
        speed: 154,
      },
      {
        id: 3,
        name: "锦州分中心",
        value: [100, 150],
        source: 2,
        target: 3,
        speed: 100,
      },
      {
        id: 4,
        name: "丹东分中心",
        value: [100, 250],
        source: 1,
        target: 4,
        speed: 64,
      },
    ],
  };

  // 总览数据
  const totalData = {
    total: 6000000 + year * 100000,
    hb: Math.floor(800000 + Math.random() * 200000),
    db: Math.floor(600000 + Math.random() * 200000),
    hd: Math.floor(900000 + Math.random() * 200000),
    zn: Math.floor(700000 + Math.random() * 200000),
    xn: Math.floor(500000 + Math.random() * 200000),
    xb: Math.floor(400000 + Math.random() * 200000),
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
    mapData.topData[y] = cities.slice(0, 5).map((city) => {
      const coords = cityCoordinates[city] || [123.0, 41.0];
      return {
        name: city,
        value: [...coords, Math.floor(Math.random() * 200 * yearFactor + 100)],
      };
    });
  });

  // 服务器数据
  const serverData = {
    servers: [
      { name: "Web服务器", value: Math.floor(Math.random() * 30 + 60) },
      { name: "数据库", value: Math.floor(Math.random() * 20 + 70) },
      { name: "缓存服务器", value: Math.floor(Math.random() * 25 + 50) },
      { name: "文件服务器", value: Math.floor(Math.random() * 35 + 40) },
      { name: "备份服务器", value: Math.floor(Math.random() * 15 + 30) },
      { name: "监控服务器", value: Math.floor(Math.random() * 20 + 45) },
    ],
  };

  // 异常数据
  const abnormalData = {
    abnormals: [
      { name: "沈阳市", value: Math.floor(Math.random() * 200 + 200) },
      { name: "大连市", value: Math.floor(Math.random() * 150 + 150) },
      { name: "鞍山市", value: Math.floor(Math.random() * 120 + 100) },
      { name: "抚顺市", value: Math.floor(Math.random() * 100 + 80) },
      { name: "本溪市", value: Math.floor(Math.random() * 80 + 60) },
      { name: "丹东市", value: Math.floor(Math.random() * 60 + 40) },
    ],
  };

  // 词云数据
  const wordCloudData = {
    datas: [
      { name: "沈阳", value: 100 },
      { name: "大连", value: 95 },
      { name: "鞍山钢铁", value: 85 },
      { name: "抚顺石化", value: 70 },
      { name: "本溪水洞", value: 65 },
      { name: "丹东边境", value: 60 },
      { name: "锦州湾", value: 55 },
      { name: "营口港", value: 50 },
      { name: "阜新煤矿", value: 45 },
      { name: "辽阳化纤", value: 40 },
      { name: "盘锦湿地", value: 35 },
      { name: "铁岭新城", value: 30 },
      { name: "朝阳化石", value: 25 },
      { name: "葫芦岛海滨", value: 20 },
    ],
  };

  return {
    regionData,
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

// 城市坐标映射
const cityCoordinates = {
  沈阳市: [123.431474, 41.805698],
  大连市: [121.614682, 38.914003],
  鞍山市: [122.994329, 41.108647],
  抚顺市: [123.957208, 41.880872],
  本溪市: [123.766485, 41.294355],
  丹东市: [124.354706, 40.000499],
  锦州市: [121.127003, 41.095119],
  营口市: [122.235417, 40.667012],
  阜新市: [121.670124, 42.021619],
  辽阳市: [123.236944, 41.267244],
  盘锦市: [122.069714, 41.173484],
  铁岭市: [123.842166, 42.286131],
  朝阳市: [120.450372, 41.573734],
  葫芦岛市: [120.836932, 40.711052],
};
