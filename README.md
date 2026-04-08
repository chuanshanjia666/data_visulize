# 数据可视化大作业


### 1. 项目入口和渲染方式

- `src/App.vue` 从最初的静态页面组织，改成了一个三栏仪表盘布局，左侧放城市发展、雷达和拓扑，中间放总览和地图，右侧放 GDP、幸福指数和词云。
- `src/App.vue` 现在用 `defineAsyncComponent` 按需加载所有图表组件，减少首屏一次性加载压力。
- `src/App.vue` 通过 `getVisualization()` 拉取数据，`loadData()` 首次执行后再用 `setInterval` 每 20 秒刷新一次数据。
- 各图表组件都接收 `props.data`，并通过 `watch(() => props.data, renderChart)` 在数据变化时重绘，避免了手动销毁重建整页。

### 2. 数据接口层

- `src/api/visualization.js` 不再依赖旧的请求工具文件 `src/utils/request.js`，而是直接导出 `getVisualization()`。
- 当前接口返回的是辽宁省模拟数据，而不是单一的静态数据对象。
- 数据结构被拆成多个业务块：`liaoningCityDevelopmentData`、`liaoningLogisticsRiskData`、`liaoningLogisticsTopologyData`、`totalData`、`populationData`、`hakimiGdpData`、`liaoningCityHappinessData`、`wordCloudData`。
- `populationData` 里按年份维护 `categoryData` 和 `topData`，支持地图页签式/时间轴式展示。
- `hakimiGdpData` 里按城市生成多年的折线序列，给 GDP 折线图直接消费。
- `liaoningLogisticsTopologyData` 里生成了以沈阳为中心的拓扑节点和连线，供关系图渲染。
- `wordCloudData` 不是固定词表，而是从词条数组中随机打散后再附加权重，页面刷新后会有轻微变化。

### 3. 公共基础层

- `src/lib/echarts.js` 现在只负责导出 ECharts 主实例，配合各组件里的按需 `import` 使用，不再把整套库一次性打进业务代码。
- `src/style.css` 统一了页面的视觉语言，包括电子字体、面板标题渐变、仪表盘背景层次和网格纹理。
- `src/style.css` 里的 `.dashboard-bg` 不再是单色背景，而是多层径向渐变、线性渐变和网格纹理叠加，直接决定了页面的整体氛围。

### 4. 八个组件的代码变化

#### `src/components/HorizontalBar.vue`

- 组件现在明确展示“辽宁省城市发展指数”，数据源来自 `liaoningCityDevelopmentData.cityDevelopmentIndexes`。
- `yAxis` 使用城市名数组，`inverse: true` 保证最强项排在顶部，符合排名图习惯。
- `series` 中的每根柱子都通过 `cityGradientPairs` 动态生成线性渐变，而不是统一颜色。
- `showBackground` 和 `barWidth` 配合使用，让柱图在深色背景下仍然有清晰的层次。
- label 改成显示在右侧，数值直接跟在柱体后面，便于阅读。
- `watch` 监听 `props.data`，接口刷新后会重新计算渐变和数值，不需要手动销毁实例。

#### `src/components/MapChart.vue`

- 组件从依赖本地地图文件，改成运行时从 `geojson.cn` 拉取辽宁 GeoJSON，然后 `registerMap` 注册到 ECharts。
- 图表核心结构是 `timeline + baseOption + options`，按 2020 到 2024 年自动轮播。
- `geo` 层负责地图底图，`map` 层负责透明交互数据，`bar` 层负责右侧柱状对比，`effectScatter` 层负责热点波纹点。
- 城市排序由 `sortedCategoryData` 控制，地图和柱图都基于同一份年份数据，避免两套排序不一致。
- `symbolSizeByBar` 会根据每个城市的数值做归一化映射，热点大小和人口值联动。
- tooltip 改成了按城市名做容错查找，既支持 `xx市`，也支持去掉后缀的写法。
- 中心视图范围、缩放、渐变底图和悬停高亮都已经固定成辽宁专题样式，而不是通用地图模板。

#### `src/components/RadarBar.vue`

- 组件展示“辽宁省物流风险指数”，数据直接取 `logisticsRisks`。
- 指示器的 `max: 100` 是统一阈值，方便把不同城市的风险值放在同一张雷达图里比较。
- `radar` 使用多边形、5 层分割、圆角分区背景和渐变填充，图形更像专题风险轮廓图。
- `series` 只保留一组数据，强调单年度/单维度的整体风险形态，不做多组堆叠。
- 文本颜色、线宽和分割线颜色都和页面其他模块保持一致，避免视觉断层。

#### `src/components/Relation.vue`

- 组件展示“辽宁省物流拓扑图”，数据来自 `liaoningLogisticsTopologyData.topologyNodes`。
- 节点布局不是随机散点，而是围绕沈阳做圆周分布，中心城市被固定在 `id === 0` 的位置。
- `graph` 用来承载静态节点和关系边，`lines` 用来叠加动态箭头特效，这两个 series 是分工明确的。
- `links` 直接从 `source` 和 `target` 字段生成，说明数据层已经先构建好了拓扑关系。
- 中心节点使用更大的 `symbolSize`、更亮的渐变色和更粗的描边，外围节点只保留轮换色，层级分明。
- 坐标轴是自定义的 `cartesian2d` 范围，不依赖默认布局，方便把拓扑整体锁定在中心区域。

#### `src/components/RingBar.vue`

- 组件展示“辽宁省城市幸福指数”，使用的是 `pie`，但不是普通饼图，而是 `roseType: "radius"` 的玫瑰图。
- 半径范围、中心点、`padAngle`、`avoidLabelOverlap` 都经过专门调整，让图形在右侧面板里更紧凑。
- `getSeriesData()` 把数据和配色封装在一个函数里，便于后续替换指标或扩展更多城市。
- 每个城市的颜色由 `colors` 数组轮换生成，不再依赖默认调色板。
- 图例被放到右上角并设置成纵向排列，让玫瑰图主体尽量居中展开。
- tooltip 仍然保留，但格式改成了更适合指标卡的 `标题 + 城市名 + 数值`。

#### `src/components/TotalData.vue`

- 组件从单纯的总览数字展示，改成了“城市风采 + 文字介绍 + 图片轮播”的组合模块。
- 图片来源不是本地静态资源，而是使用维基共享资源的辽宁景观图片链接。
- `visibleImages` 通过 `computed` 从 `liaoningSceneryImages` 中取 3 张图，形成一屏三图布局。
- `currentStartIndex` 配合 `setInterval` 每 5 秒滚动一次图片，页面顶部会持续切换展示内容。
- `onUnmounted` 中清理定时器，避免组件卸载后继续跑轮播任务。
- 这个组件的作用已经从“数值总览”扩展为“区域介绍卡”，更像专题首页的导语模块。

#### `src/components/VerticalBar.vue`

- 组件展示“城市GDP”，数据来自 `hakimiGdpData.citySeries` 和 `hakimiGdpData.years`。
- 用 `line` 图代替原先更粗糙的竖向柱图思路，改成多城市、多年份的趋势对比。
- `smooth: true` 让折线更平滑，适合展示年度增长轨迹。
- 颜色数组 `lineColors` 为每个城市分配独立线条颜色，图例和曲线能一一对应。
- y 轴用“亿”作为单位格式化，tooltip 里也统一显示 `value + 亿`。
- 这个组件实际承担的是 GDP 年度趋势面板，而不是单次静态排行图。

#### `src/components/WordCloud.vue`

- 组件展示“热门词条”，底层图表由 `echarts-wordcloud` 提供。
- `pageSize = 8`，不是把所有词一口气塞进去，而是只截取前 8 个词做视觉焦点。
- `getDisplayWords()` 把输入数据先裁剪，再交给词云渲染，避免词条太多导致画面拥挤。
- `rotationRange: [0, 0]` 把所有词的旋转角度固定住，保证专题页面风格更统一。
- 文本颜色由 `colorPalette` 按索引轮换，不靠默认随机色，整体更可控。
- `onBeforeUnmount` 里调用 `dispose()`，保证词云实例被正确释放。

### 5. 当前实现的整体特征

- 页面已经从“单页展示若干图表”变成“专题仪表盘 + 实时刷新数据 + 模块化图表组件”的结构。
- 数据层不再只是静态 JSON，而是拆成了多个面向组件的业务对象。
- 大部分图表都从默认样式转成了定制化主题，统一使用深色背景、渐变色和高亮描边。
- 地图、拓扑、词云、玫瑰图这些模块都已经不是半成品，而是围绕同一套数据接口协调工作的页面部分。

### 6. 代码层面的增删变化总结

- 删掉了本地地图和旧请求工具：`src/assets/MapData/china.json`、`src/utils/request.js`。
- 新增了按需引入封装：`src/lib/echarts.js`。
- `App.vue`、`style.css` 和 8 个组件都做了实质性重构，不是单纯改文案。
- 资源文件从本地静态图标/背景，逐步换成更适合专题展示的图像和外链素材。
