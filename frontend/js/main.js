/**
 * 数据可视化大屏 - 主逻辑模块
 * 负责页面初始化、数据更新、动画效果等
 */

const Dashboard = {
  // 配置
  config: {
    numberAnimationDuration: 2000,
    dataRefreshInterval: 5000,
    scrollSpeed: 20,
  },

  /**
   * 初始化大屏
   */
  init() {
    this.initDateTime();
    this.initStatNumbers();
    this.initRankList();
    this.initScrollContent();
    this.initProgressBars();
    this.initExportButton();

    // 初始化图表
    ChartManager.initAllCharts();

    // 启动定时更新
    this.startAutoUpdate();

    console.log("Dashboard initialized successfully");
  },

  /**
   * 初始化日期时间显示
   */
  initDateTime() {
    const updateDateTime = () => {
      const now = new Date();

      // 格式化日期
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      const weekDays = [
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六",
      ];
      const weekDay = weekDays[now.getDay()];

      // 格式化时间
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");

      // 更新 DOM
      const dateEl = document.getElementById("currentDate");
      const timeEl = document.getElementById("currentTime");

      if (dateEl) {
        dateEl.textContent = `${year}年${month}月${day}日 ${weekDay}`;
      }
      if (timeEl) {
        timeEl.textContent = `${hours}:${minutes}:${seconds}`;
      }
    };

    updateDateTime();
    setInterval(updateDateTime, 1000);
  },

  /**
   * 初始化统计数字动画
   */
  initStatNumbers() {
    const statValues = document.querySelectorAll(".stat-value[data-target]");

    statValues.forEach((el) => {
      const target = parseInt(el.dataset.target);
      this.animateNumber(el, 0, target, this.config.numberAnimationDuration);
    });
  },

  /**
   * 数字滚动动画
   */
  animateNumber(element, start, end, duration) {
    const startTime = performance.now();
    const range = end - start;

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // 使用 easeOutExpo 缓动函数
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.floor(start + range * easeProgress);

      element.textContent = this.formatNumber(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  },

  /**
   * 格式化数字（添加千分位）
   */
  formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  },

  /**
   * 初始化排行榜
   */
  initRankList() {
    const rankList = document.getElementById("rankList");
    if (!rankList) return;

    const data = MockData.regionRanking;
    const colors = ["#ffd700", "#c0c0c0", "#cd7f32", "#00d4ff", "#00d4ff"];

    rankList.innerHTML = data
      .map(
        (item, index) => `
            <div class="rank-item">
                <span class="rank-num ${index < 3 ? "top" + (index + 1) : "normal"}">${index + 1}</span>
                <span class="rank-name">${item.name}</span>
                <div class="rank-bar">
                    <div class="rank-bar-fill" style="width: ${item.percent}%; background: linear-gradient(90deg, ${colors[index]}, ${colors[index]}88);"></div>
                </div>
                <span class="rank-value">${this.formatNumber(item.value)}</span>
            </div>
        `,
      )
      .join("");
  },

  /**
   * 初始化实时滚动内容
   */
  initScrollContent() {
    const scrollContent = document.getElementById("scrollContent");
    if (!scrollContent) return;

    const events = MockData.realtimeEvents;

    // 生成两份内容实现无缝滚动
    const generateItems = (data) =>
      data
        .map(
          (item) => `
            <div class="scroll-item">
                <span class="scroll-time">${item.time}</span>
                <span class="scroll-text">${item.text}</span>
                <span class="scroll-tag ${item.tag}">${item.tagText}</span>
            </div>
        `,
        )
        .join("");

    scrollContent.innerHTML = generateItems(events) + generateItems(events);
  },

  /**
   * 初始化进度条动画
   */
  initProgressBars() {
    const progressFills = document.querySelectorAll(".progress-fill");

    progressFills.forEach((fill) => {
      const targetWidth = fill.style.width;
      fill.style.width = "0%";

      setTimeout(() => {
        fill.style.width = targetWidth;
      }, 500);
    });
  },

  /**
   * 启动自动更新
   */
  startAutoUpdate() {
    // 更新统计数字
    setInterval(() => {
      this.updateStatNumbers();
    }, this.config.dataRefreshInterval);

    // 更新实时动态
    setInterval(() => {
      this.addNewEvent();
    }, 3000);

    // 更新底部状态
    setInterval(() => {
      this.updateFooterStatus();
    }, 2000);
  },

  /**
   * 更新统计数字（模拟数据波动）
   */
  updateStatNumbers() {
    const statCards = document.querySelectorAll(".stat-value[data-target]");

    statCards.forEach((el) => {
      const baseValue = parseInt(el.dataset.target);
      const newValue = MockData.generateRandomValue(baseValue, 0.02);
      el.dataset.target = newValue;

      const currentValue = parseInt(el.textContent.replace(/,/g, ""));
      this.animateNumber(el, currentValue, newValue, 1000);
    });
  },

  /**
   * 添加新的实时事件
   */
  addNewEvent() {
    const scrollContent = document.getElementById("scrollContent");
    if (!scrollContent) return;

    const newEvent = MockData.generateRandomEvent();
    const newItem = document.createElement("div");
    newItem.className = "scroll-item";
    newItem.innerHTML = `
            <span class="scroll-time">${newEvent.time}</span>
            <span class="scroll-text">${newEvent.text}</span>
            <span class="scroll-tag ${newEvent.tag}">${newEvent.tagText}</span>
        `;

    // 在中间位置插入新事件
    const items = scrollContent.querySelectorAll(".scroll-item");
    if (items.length > 10) {
      const midPoint = Math.floor(items.length / 2);
      scrollContent.insertBefore(newItem.cloneNode(true), items[0]);
      scrollContent.insertBefore(newItem, items[midPoint]);
    }

    // 移除多余的项目
    while (scrollContent.children.length > 20) {
      scrollContent.removeChild(scrollContent.lastChild);
    }
  },

  /**
   * 更新底部状态
   */
  updateFooterStatus() {
    const loadValue = document.querySelector(".load-value");
    const onlineUsers = document.querySelector(".online-users");

    if (loadValue) {
      const load = Math.floor(Math.random() * 30 + 15);
      loadValue.textContent = load + "%";
    }

    if (onlineUsers) {
      const users = MockData.generateRandomValue(12847, 0.05);
      onlineUsers.textContent = this.formatNumber(users);
    }
  },

  /**
   * 更新中央大数字
   */
  updateCenterNumber() {
    const bigNumber = document.getElementById("totalAmount");
    if (!bigNumber) return;

    const baseValue = 9876543210;
    const newValue = MockData.generateRandomValue(baseValue, 0.001);
    bigNumber.textContent = this.formatNumber(newValue);
  },

  /**
   * 初始化导出按钮
   */
  initExportButton() {
    const exportBtn = document.getElementById("exportBtn");
    if (!exportBtn) return;

    exportBtn.addEventListener("click", () => {
      this.exportToExcel();
    });
  },

  /**
   * 导出数据到 Excel
   */
  exportToExcel() {
    const exportBtn = document.getElementById("exportBtn");
    if (exportBtn) {
      exportBtn.disabled = true;
      exportBtn.innerHTML = '<span class="export-icon">⏳</span><span class="export-text">导出中...</span>';
    }

    try {
      const now = new Date();
      const exportDateTime = this.formatDateTime(now);
      const fileName = `智慧城市数据_${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}_${String(now.getHours()).padStart(2, "0")}${String(now.getMinutes()).padStart(2, "0")}${String(now.getSeconds()).padStart(2, "0")}.xlsx`;

      const wb = XLSX.utils.book_new();
      const statsSheet = this.createStatsSheet(exportDateTime);
      const rankingSheet = this.createRankingSheet(exportDateTime);
      const summarySheet = this.createSummarySheet(exportDateTime);

      XLSX.utils.book_append_sheet(wb, summarySheet, "汇总数据");
      XLSX.utils.book_append_sheet(wb, statsSheet, "数据指标");
      XLSX.utils.book_append_sheet(wb, rankingSheet, "区域排行");

      XLSX.writeFile(wb, fileName);
    } catch (error) {
      console.error("导出失败:", error);
      alert("导出失败，请重试");
    } finally {
      if (exportBtn) {
        exportBtn.disabled = false;
        exportBtn.innerHTML = '<span class="export-icon">📥</span><span class="export-text">导出Excel</span>';
      }
    }
  },

  /**
   * 格式化完整日期时间
   */
  formatDateTime(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${year}年${month}月${day}日 ${hours}:${minutes}:${seconds}`;
  },

  /**
   * 创建汇总数据 Sheet
   */
  createSummarySheet(exportDateTime) {
    const data = [
      ["智慧城市数据可视化平台 - 数据导出"],
      [],
      ["导出时间", exportDateTime],
      [],
    ];

    const statCards = document.querySelectorAll(".stat-card");
    statCards.forEach((card) => {
      const label = card.querySelector(".stat-label")?.textContent || "";
      const value = card.querySelector(".stat-value")?.textContent || "";
      const unit = card.querySelector(".stat-unit")?.textContent || "";
      data.push([label, value + (unit ? " " + unit : "")]);
    });

    data.push([]);
    const totalAmountEl = document.getElementById("totalAmount");
    if (totalAmountEl) {
      data.push(["平台累计交易总额", totalAmountEl.textContent + " 元"]);
    }

    data.push([]);
    const loadValue = document.querySelector(".load-value")?.textContent || "";
    const onlineUsers = document.querySelector(".online-users")?.textContent || "";
    data.push(["服务器负载", loadValue]);
    data.push(["在线用户数", onlineUsers]);

    return XLSX.utils.aoa_to_sheet(data);
  },

  /**
   * 创建数据指标 Sheet
   */
  createStatsSheet(exportDateTime) {
    const data = [
      ["核心数据指标"],
      [],
      ["导出时间", exportDateTime],
      [],
      ["指标名称", "数值", "单位", "说明"],
    ];

    const statCards = document.querySelectorAll(".stat-card");
    statCards.forEach((card) => {
      const label = card.querySelector(".stat-label")?.textContent || "";
      const value = card.querySelector(".stat-value")?.textContent || "";
      const unit = card.querySelector(".stat-unit")?.textContent || "";
      data.push([label, value, unit || "-", "实时统计"]);
    });

    return XLSX.utils.aoa_to_sheet(data);
  },

  /**
   * 创建区域排行榜 Sheet
   */
  createRankingSheet(exportDateTime) {
    const data = [
      ["区域排行榜"],
      [],
      ["导出时间", exportDateTime],
      [],
      ["排名", "区域名称", "业务量", "占比"],
    ];

    const rankItems = document.querySelectorAll(".rank-item");
    rankItems.forEach((item, index) => {
      const rankNum = index + 1;
      const name = item.querySelector(".rank-name")?.textContent || "";
      const value = item.querySelector(".rank-value")?.textContent || "";
      const barFill = item.querySelector(".rank-bar-fill");
      const percent = barFill ? barFill.style.width : "";
      data.push([rankNum, name, value, percent]);
    });

    return XLSX.utils.aoa_to_sheet(data);
  },
};

// 页面加载完成后初始化
document.addEventListener("DOMContentLoaded", () => {
  const checkDependencies = () => {
    if (typeof echarts === "undefined" || typeof XLSX === "undefined") {
      setTimeout(checkDependencies, 100);
      return;
    }
    setTimeout(() => {
      Dashboard.init();
    }, 200);
  };
  checkDependencies();
});

// 窗口大小变化时重新调整图表
window.addEventListener("resize", () => {
  if (window.ChartManager && window.ChartManager.charts) {
    Object.values(window.ChartManager.charts).forEach((chart) => {
      if (chart) {
        chart.resize();
      }
    });
  }
});

// 导出 Dashboard
window.Dashboard = Dashboard;
