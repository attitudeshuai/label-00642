/**
 * 数据可视化大屏 - 图表配置模块
 * 使用 ECharts 实现各类图表
 */

const ChartManager = {
  charts: {},

  // 通用配置
  commonConfig: {
    backgroundColor: "transparent",
    textStyle: {
      fontFamily: '"Microsoft YaHei", "PingFang SC", sans-serif',
      color: "#8892b0",
    },
    grid: {
      top: 40,
      right: 15,
      bottom: 30,
      left: 15,
      containLabel: true,
    },
  },

  /**
   * 初始化所有图表
   */
  initAllCharts() {
    this.initBarChart();
    this.initPieChart();
    this.initLineChart();
    this.initMapChart();
  },

  /**
   * 柱状图 - 月度数据统计
   */
  initBarChart() {
    const dom = document.getElementById("barChart");
    if (!dom) return;

    const rect = dom.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const chart = echarts.init(dom);
    this.charts.bar = chart;

    const data = MockData.monthlyData;

    const option = {
      ...this.commonConfig,
      tooltip: {
        trigger: "axis",
        backgroundColor: "rgba(6, 30, 60, 0.9)",
        borderColor: "#00d4ff",
        borderWidth: 1,
        textStyle: { color: "#fff" },
        axisPointer: {
          type: "shadow",
          shadowStyle: {
            color: "rgba(0, 212, 255, 0.1)",
          },
        },
      },
      legend: {
        top: 5,
        right: 10,
        textStyle: { color: "#8892b0", fontSize: 11 },
        itemWidth: 12,
        itemHeight: 8,
      },
      xAxis: {
        type: "category",
        data: data.categories,
        axisLine: { lineStyle: { color: "rgba(255,255,255,0.1)" } },
        axisLabel: { color: "#8892b0", fontSize: 10 },
        axisTick: { show: false },
      },
      yAxis: {
        type: "value",
        axisLine: { show: false },
        axisLabel: { color: "#8892b0", fontSize: 10 },
        splitLine: { lineStyle: { color: "rgba(255,255,255,0.05)" } },
      },
      series: [
        {
          name: data.series[0].name,
          type: "bar",
          barWidth: 8,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#00d4ff" },
              { offset: 1, color: "rgba(0, 212, 255, 0.2)" },
            ]),
            borderRadius: [4, 4, 0, 0],
          },
          data: data.series[0].data,
        },
        {
          name: data.series[1].name,
          type: "bar",
          barWidth: 8,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#00ff88" },
              { offset: 1, color: "rgba(0, 255, 136, 0.2)" },
            ]),
            borderRadius: [4, 4, 0, 0],
          },
          data: data.series[1].data,
        },
      ],
    };

    chart.setOption(option);
  },

  /**
   * 环形图 - 业务类型分布
   */
  initPieChart() {
    const dom = document.getElementById("pieChart");
    if (!dom) return;

    const rect = dom.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const chart = echarts.init(dom);
    this.charts.pie = chart;

    const data = MockData.businessTypes;

    const option = {
      ...this.commonConfig,
      tooltip: {
        trigger: "item",
        backgroundColor: "rgba(6, 30, 60, 0.9)",
        borderColor: "#00d4ff",
        borderWidth: 1,
        textStyle: { color: "#fff" },
        formatter: "{b}: {c} ({d}%)",
      },
      legend: {
        orient: "vertical",
        right: 10,
        top: "center",
        textStyle: { color: "#8892b0", fontSize: 11 },
        itemWidth: 10,
        itemHeight: 10,
        itemGap: 12,
      },
      series: [
        {
          type: "pie",
          radius: ["45%", "70%"],
          center: ["35%", "50%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 4,
            borderColor: "#0d1b2a",
            borderWidth: 2,
          },
          label: {
            show: false,
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 14,
              fontWeight: "bold",
              color: "#fff",
            },
            itemStyle: {
              shadowBlur: 20,
              shadowColor: "rgba(0, 212, 255, 0.5)",
            },
          },
          data: data.map((item) => ({
            name: item.name,
            value: item.value,
            itemStyle: { color: item.color },
          })),
        },
      ],
    };

    chart.setOption(option);
  },

  /**
   * 折线图 - 趋势分析
   */
  initLineChart() {
    const dom = document.getElementById("lineChart");
    if (!dom) return;

    const rect = dom.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const chart = echarts.init(dom);
    this.charts.line = chart;

    const data = MockData.trendData;

    const option = {
      ...this.commonConfig,
      tooltip: {
        trigger: "axis",
        backgroundColor: "rgba(6, 30, 60, 0.9)",
        borderColor: "#00d4ff",
        borderWidth: 1,
        textStyle: { color: "#fff" },
      },
      legend: {
        top: 5,
        right: 10,
        textStyle: { color: "#8892b0", fontSize: 11 },
        itemWidth: 15,
        itemHeight: 2,
      },
      xAxis: {
        type: "category",
        data: data.categories,
        boundaryGap: false,
        axisLine: { lineStyle: { color: "rgba(255,255,255,0.1)" } },
        axisLabel: { color: "#8892b0", fontSize: 10 },
        axisTick: { show: false },
      },
      yAxis: {
        type: "value",
        axisLine: { show: false },
        axisLabel: { color: "#8892b0", fontSize: 10 },
        splitLine: { lineStyle: { color: "rgba(255,255,255,0.05)" } },
      },
      series: [
        {
          name: data.series[0].name,
          type: "line",
          smooth: true,
          symbol: "circle",
          symbolSize: 6,
          lineStyle: {
            color: "#00d4ff",
            width: 2,
            shadowColor: "rgba(0, 212, 255, 0.5)",
            shadowBlur: 10,
          },
          itemStyle: {
            color: "#00d4ff",
            borderColor: "#fff",
            borderWidth: 2,
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "rgba(0, 212, 255, 0.3)" },
              { offset: 1, color: "rgba(0, 212, 255, 0)" },
            ]),
          },
          data: data.series[0].data,
        },
        {
          name: data.series[1].name,
          type: "line",
          smooth: true,
          symbol: "circle",
          symbolSize: 6,
          lineStyle: {
            color: "#00ff88",
            width: 2,
            shadowColor: "rgba(0, 255, 136, 0.5)",
            shadowBlur: 10,
          },
          itemStyle: {
            color: "#00ff88",
            borderColor: "#fff",
            borderWidth: 2,
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "rgba(0, 255, 136, 0.3)" },
              { offset: 1, color: "rgba(0, 255, 136, 0)" },
            ]),
          },
          data: data.series[1].data,
        },
      ],
    };

    chart.setOption(option);
  },

  /**
   * 中央区域 - 城市业务量柱状图
   */
  initMapChart() {
    const dom = document.getElementById("mapChart");
    if (!dom) return;

    const rect = dom.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const chart = echarts.init(dom);
    this.charts.map = chart;

    // 使用 MockData 中的城市数据
    const cityData = MockData.cityData;

    const option = {
      backgroundColor: "transparent",
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
          shadowStyle: {
            color: "rgba(0, 212, 255, 0.1)",
          },
        },
        backgroundColor: "rgba(6, 30, 60, 0.9)",
        borderColor: "#00d4ff",
        borderWidth: 1,
        textStyle: { color: "#fff" },
        formatter: function (params) {
          const data = params[0];
          return (
            '<div style="padding: 8px 12px;">' +
            '<div style="font-size: 14px; font-weight: bold; margin-bottom: 8px; color: #00d4ff;">' +
            data.name +
            "</div>" +
            '<div style="display: flex; align-items: center; gap: 8px;">' +
            '<span style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; background: ' +
            data.color +
            ';"></span>' +
            '<span>业务量: <span style="color: #00ff88; font-weight: bold; font-size: 16px;">' +
            data.value.toLocaleString() +
            "</span></span>" +
            "</div></div>"
          );
        },
      },
      grid: {
        left: "5%",
        right: "5%",
        bottom: "15%",
        top: "10%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        data: cityData.map(function (item) {
          return item.name;
        }),
        axisLine: {
          lineStyle: { color: "rgba(0, 212, 255, 0.3)" },
        },
        axisLabel: {
          color: "#8892b0",
          fontSize: 12,
          interval: 0,
          rotate: 0,
        },
        axisTick: { show: false },
      },
      yAxis: {
        type: "value",
        axisLine: { show: false },
        axisLabel: {
          color: "#8892b0",
          fontSize: 11,
          formatter: function (value) {
            if (value >= 1000) {
              return value / 1000 + "k";
            }
            return value;
          },
        },
        splitLine: {
          lineStyle: {
            color: "rgba(0, 212, 255, 0.1)",
            type: "dashed",
          },
        },
      },
      series: [
        {
          name: "业务量",
          type: "bar",
          barWidth: "50%",
          data: cityData.map(function (item, index) {
            var topColor, midColor, bottomColor, shadowColor;
            if (index < 4) {
              topColor = "#00ff88";
              midColor = "#00cc6a";
              bottomColor = "rgba(0, 255, 136, 0.2)";
              shadowColor = "rgba(0, 255, 136, 0.4)";
            } else if (index < 7) {
              topColor = "#00d4ff";
              midColor = "#0099cc";
              bottomColor = "rgba(0, 212, 255, 0.2)";
              shadowColor = "rgba(0, 212, 255, 0.4)";
            } else {
              topColor = "#ffd93d";
              midColor = "#cc9900";
              bottomColor = "rgba(255, 217, 61, 0.2)";
              shadowColor = "rgba(255, 217, 61, 0.4)";
            }
            return {
              value: item.value,
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: topColor },
                  { offset: 0.5, color: midColor },
                  { offset: 1, color: bottomColor },
                ]),
                borderRadius: [6, 6, 0, 0],
                shadowColor: shadowColor,
                shadowBlur: 10,
              },
            };
          }),
          emphasis: {
            itemStyle: {
              shadowBlur: 20,
              shadowColor: "rgba(0, 212, 255, 0.6)",
            },
          },
          label: {
            show: true,
            position: "top",
            color: "#fff",
            fontSize: 11,
            fontWeight: "bold",
            formatter: function (params) {
              return params.value.toLocaleString();
            },
          },
        },
      ],
      animationDuration: 1500,
      animationEasing: "elasticOut",
    };

    chart.setOption(option);
  },

  /**
   * 更新图表数据
   */
  updateChartData: function (chartName, newData) {
    var chart = this.charts[chartName];
    if (chart && newData) {
      chart.setOption(newData);
    }
  },
};

// 导出图表管理器
window.ChartManager = ChartManager;
