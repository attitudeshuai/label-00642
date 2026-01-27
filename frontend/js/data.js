/**
 * 数据可视化大屏 - 模拟数据模块
 * 提供各图表和组件所需的模拟数据
 */

const MockData = {
  // 月度数据（柱状图）
  monthlyData: {
    categories: [
      "1月",
      "2月",
      "3月",
      "4月",
      "5月",
      "6月",
      "7月",
      "8月",
      "9月",
      "10月",
      "11月",
      "12月",
    ],
    series: [
      {
        name: "订单量",
        data: [
          820, 932, 901, 1234, 1290, 1330, 1520, 1650, 1480, 1320, 1450, 1680,
        ],
      },
      {
        name: "成交额",
        data: [
          620, 732, 801, 934, 1090, 1130, 1220, 1350, 1180, 1120, 1250, 1480,
        ],
      },
    ],
  },

  // 业务类型分布（环形图）
  businessTypes: [
    { name: "电子商务", value: 35, color: "#00d4ff" },
    { name: "金融服务", value: 25, color: "#00ff88" },
    { name: "物流运输", value: 18, color: "#ffd93d" },
    { name: "医疗健康", value: 12, color: "#ff6b6b" },
    { name: "教育培训", value: 10, color: "#a855f7" },
  ],

  // 趋势数据（折线图）
  trendData: {
    categories: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00", "24:00"],
    series: [
      {
        name: "访问量",
        data: [150, 80, 320, 580, 620, 450, 280],
      },
      {
        name: "交易量",
        data: [80, 50, 180, 320, 380, 280, 150],
      },
    ],
  },

  // 区域排行数据
  regionRanking: [
    { name: "华东地区", value: 28956, percent: 100 },
    { name: "华南地区", value: 24532, percent: 85 },
    { name: "华北地区", value: 19876, percent: 69 },
    { name: "西南地区", value: 15234, percent: 53 },
    { name: "华中地区", value: 12890, percent: 45 },
  ],

  // 城市业务量数据（用于中央柱状图）
  cityData: [
    { name: "北京", value: 4500, level: "high" },
    { name: "上海", value: 5200, level: "high" },
    { name: "广州", value: 3800, level: "high" },
    { name: "深圳", value: 4100, level: "high" },
    { name: "杭州", value: 2900, level: "medium" },
    { name: "成都", value: 2600, level: "medium" },
    { name: "武汉", value: 2400, level: "medium" },
    { name: "西安", value: 1800, level: "low" },
    { name: "南京", value: 2100, level: "low" },
    { name: "重庆", value: 2300, level: "low" },
  ],

  // 实时动态数据
  realtimeEvents: [
    {
      time: "10:32:15",
      text: "用户 张** 完成订单支付，金额 ¥2,580.00",
      tag: "success",
      tagText: "支付成功",
    },
    {
      time: "10:31:48",
      text: "新用户 李** 完成注册，来源：微信小程序",
      tag: "info",
      tagText: "新用户",
    },
    {
      time: "10:31:22",
      text: "商户 科技有限公司 提交入驻申请",
      tag: "warning",
      tagText: "待审核",
    },
    {
      time: "10:30:56",
      text: "订单 #20241201001 已发货，物流单号：SF1234567890",
      tag: "info",
      tagText: "已发货",
    },
    {
      time: "10:30:33",
      text: "用户 王** 申请退款，金额 ¥199.00",
      tag: "warning",
      tagText: "退款中",
    },
    {
      time: "10:30:01",
      text: "系统完成每日数据备份，备份大小：2.3GB",
      tag: "success",
      tagText: "备份完成",
    },
    {
      time: "10:29:45",
      text: "用户 赵** 完成实名认证",
      tag: "success",
      tagText: "认证通过",
    },
    {
      time: "10:29:18",
      text: "营销活动「双十二大促」已自动上线",
      tag: "info",
      tagText: "活动上线",
    },
    {
      time: "10:28:52",
      text: "检测到异常登录行为，IP: 192.168.1.***",
      tag: "warning",
      tagText: "安全预警",
    },
    {
      time: "10:28:30",
      text: "用户 孙** 完成订单支付，金额 ¥8,999.00",
      tag: "success",
      tagText: "支付成功",
    },
  ],

  /**
   * 生成随机实时事件
   */
  generateRandomEvent() {
    const events = [
      { text: "用户完成订单支付", tag: "success", tagText: "支付成功" },
      { text: "新用户完成注册", tag: "info", tagText: "新用户" },
      { text: "商户提交入驻申请", tag: "warning", tagText: "待审核" },
      { text: "订单已发货", tag: "info", tagText: "已发货" },
      { text: "用户申请退款", tag: "warning", tagText: "退款中" },
      { text: "用户完成实名认证", tag: "success", tagText: "认证通过" },
    ];

    const randomEvent = events[Math.floor(Math.random() * events.length)];
    const now = new Date();
    const time = now.toTimeString().split(" ")[0];
    const amount = (Math.random() * 10000).toFixed(2);

    return {
      time,
      text:
        randomEvent.text +
        (randomEvent.tagText === "支付成功" ? `，金额 ¥${amount}` : ""),
      tag: randomEvent.tag,
      tagText: randomEvent.tagText,
    };
  },

  /**
   * 生成随机数据波动
   */
  generateRandomValue(base, fluctuation = 0.1) {
    const min = base * (1 - fluctuation);
    const max = base * (1 + fluctuation);
    return Math.floor(Math.random() * (max - min) + min);
  },
};

// 导出数据模块
window.MockData = MockData;
