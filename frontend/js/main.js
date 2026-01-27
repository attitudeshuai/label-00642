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
};

// 页面加载完成后初始化
document.addEventListener("DOMContentLoaded", () => {
  // 延迟初始化，确保 DOM 完全渲染且容器有尺寸
  setTimeout(() => {
    Dashboard.init();
  }, 200);
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
