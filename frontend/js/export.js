(function () {
  function getDateTimeInfo() {
    var now = new Date();
    var year = now.getFullYear();
    var month = String(now.getMonth() + 1).padStart(2, "0");
    var day = String(now.getDate()).padStart(2, "0");
    var weekDays = [
      "\u661f\u671f\u65e5",
      "\u661f\u671f\u4e00",
      "\u661f\u671f\u4e8c",
      "\u661f\u671f\u4e09",
      "\u661f\u671f\u56db",
      "\u661f\u671f\u4e94",
      "\u661f\u671f\u516d",
    ];
    var weekDay = weekDays[now.getDay()];
    var hours = String(now.getHours()).padStart(2, "0");
    var minutes = String(now.getMinutes()).padStart(2, "0");
    var seconds = String(now.getSeconds()).padStart(2, "0");
    return {
      date: year + "\u5e74" + month + "\u6708" + day + "\u65e5",
      weekDay: weekDay,
      time: hours + ":" + minutes + ":" + seconds,
      full: year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds + " " + weekDay,
    };
  }

  function buildStatCardsSheet() {
    var rows = [];
    rows.push(["\u6838\u5fc3\u6570\u636e\u6307\u6807"]);
    rows.push(["\u6307\u6807\u540d\u79f0", "\u6570\u503c", "\u5355\u4f4d"]);

    var cards = document.querySelectorAll(".stat-card");
    cards.forEach(function (card) {
      var label = "";
      var value = "";
      var unit = "";

      var labelEl = card.querySelector(".stat-label");
      var valueEl = card.querySelector(".stat-value");
      var unitEl = card.querySelector(".stat-unit");

      if (labelEl) label = labelEl.textContent.trim();
      if (valueEl) value = valueEl.textContent.trim();
      if (unitEl) unit = unitEl.textContent.trim();

      rows.push([label, value, unit]);
    });

    var bigNumberEl = document.getElementById("totalAmount");
    if (bigNumberEl) {
      rows.push([]);
      rows.push(["\u5e73\u53f0\u7d2f\u8ba1\u4ea4\u6613\u603b\u989d", bigNumberEl.textContent.trim(), "\u5143"]);
    }

    return rows;
  }

  function buildRankingSheet() {
    var rows = [];
    rows.push(["\u533a\u57df\u6392\u884c\u699c"]);
    rows.push(["\u6392\u540d", "\u533a\u57df", "\u6570\u503c", "\u5360\u6bd4(%)"]);

    var data = MockData.regionRanking;
    data.forEach(function (item, index) {
      rows.push([index + 1, item.name, item.value, item.percent]);
    });

    return rows;
  }

  function buildMonthlySheet() {
    var rows = [];
    rows.push(["\u6708\u5ea6\u6570\u636e\u7edf\u8ba1"]);
    var headers = ["\u6708\u4efd"];
    MockData.monthlyData.series.forEach(function (s) {
      headers.push(s.name);
    });
    rows.push(headers);

    MockData.monthlyData.categories.forEach(function (cat, i) {
      var row = [cat];
      MockData.monthlyData.series.forEach(function (s) {
        row.push(s.data[i]);
      });
      rows.push(row);
    });

    return rows;
  }

  function buildBusinessTypesSheet() {
    var rows = [];
    rows.push(["\u4e1a\u52a1\u7c7b\u578b\u5206\u5e03"]);
    rows.push(["\u7c7b\u578b", "\u5360\u6bd4(%)"]);

    MockData.businessTypes.forEach(function (item) {
      rows.push([item.name, item.value]);
    });

    return rows;
  }

  function buildCityDataSheet() {
    var rows = [];
    rows.push(["\u57ce\u5e02\u4e1a\u52a1\u91cf"]);
    rows.push(["\u57ce\u5e02", "\u4e1a\u52a1\u91cf", "\u7b49\u7ea7"]);

    var levelMap = { high: "TOP\u57ce\u5e02", medium: "\u4e2d\u7b49\u57ce\u5e02", low: "\u53d1\u5c55\u4e2d\u57ce\u5e02" };
    MockData.cityData.forEach(function (item) {
      rows.push([item.name, item.value, levelMap[item.level] || item.level]);
    });

    return rows;
  }

  function buildTrendSheet() {
    var rows = [];
    rows.push(["\u8d8b\u52bf\u5206\u6790"]);
    var headers = ["\u65f6\u6bb5"];
    MockData.trendData.series.forEach(function (s) {
      headers.push(s.name);
    });
    rows.push(headers);

    MockData.trendData.categories.forEach(function (cat, i) {
      var row = [cat];
      MockData.trendData.series.forEach(function (s) {
        row.push(s.data[i]);
      });
      rows.push(row);
    });

    return rows;
  }

  function buildProgressSheet() {
    var rows = [];
    rows.push(["\u76ee\u6807\u5b8c\u6210\u5ea6"]);
    rows.push(["\u9879\u76ee", "\u5b8c\u6210\u5ea6(%)"]);

    var items = document.querySelectorAll(".progress-item");
    items.forEach(function (item) {
      var labelEl = item.querySelector(".progress-label");
      var valueEl = item.querySelector(".progress-value");
      if (labelEl && valueEl) {
        rows.push([labelEl.textContent.trim(), valueEl.textContent.trim()]);
      }
    });

    return rows;
  }

  function exportToExcel() {
    var wb = XLSX.utils.book_new();
    var dt = getDateTimeInfo();

    var overviewRows = [];
    overviewRows.push(["\u667a\u6167\u57ce\u5e02\u6570\u636e\u53ef\u89c6\u5316\u5e73\u53f0 - \u6570\u636e\u62a5\u8868"]);
    overviewRows.push([]);
    overviewRows.push(["\u5bfc\u51fa\u65e5\u671f", dt.date]);
    overviewRows.push(["\u661f\u671f", dt.weekDay]);
    overviewRows.push(["\u5bfc\u51fa\u65f6\u95f4", dt.time]);
    overviewRows.push([]);
    overviewRows.push(["\u6838\u5fc3\u6570\u636e\u6307\u6807"]);
    overviewRows.push(["\u6307\u6807\u540d\u79f0", "\u6570\u503c", "\u5355\u4f4d"]);

    var cards = document.querySelectorAll(".stat-card");
    cards.forEach(function (card) {
      var label = "";
      var value = "";
      var unit = "";
      var labelEl = card.querySelector(".stat-label");
      var valueEl = card.querySelector(".stat-value");
      var unitEl = card.querySelector(".stat-unit");
      if (labelEl) label = labelEl.textContent.trim();
      if (valueEl) value = valueEl.textContent.trim();
      if (unitEl) unit = unitEl.textContent.trim();
      overviewRows.push([label, value, unit]);
    });

    var bigNumberEl = document.getElementById("totalAmount");
    if (bigNumberEl) {
      overviewRows.push([]);
      overviewRows.push(["\u5e73\u53f0\u7d2f\u8ba1\u4ea4\u6613\u603b\u989d", bigNumberEl.textContent.trim(), "\u5143"]);
    }

    overviewRows.push([]);
    overviewRows.push(["\u533a\u57df\u6392\u884c\u699c"]);
    overviewRows.push(["\u6392\u540d", "\u533a\u57df", "\u6570\u503c", "\u5360\u6bd4(%)"]);
    MockData.regionRanking.forEach(function (item, index) {
      overviewRows.push([index + 1, item.name, item.value, item.percent]);
    });

    overviewRows.push([]);
    overviewRows.push(["\u76ee\u6807\u5b8c\u6210\u5ea6"]);
    overviewRows.push(["\u9879\u76ee", "\u5b8c\u6210\u5ea6(%)"]);
    var progressItems = document.querySelectorAll(".progress-item");
    progressItems.forEach(function (item) {
      var labelEl = item.querySelector(".progress-label");
      var valueEl = item.querySelector(".progress-value");
      if (labelEl && valueEl) {
        overviewRows.push([labelEl.textContent.trim(), valueEl.textContent.trim()]);
      }
    });

    var ws1 = XLSX.utils.aoa_to_sheet(overviewRows);
    ws1["!cols"] = [
      { wch: 18 },
      { wch: 22 },
      { wch: 10 },
      { wch: 12 },
    ];
    XLSX.utils.book_append_sheet(wb, ws1, "\u6570\u636e\u603b\u89c8");

    var monthlyRows = buildMonthlySheet();
    var ws2 = XLSX.utils.aoa_to_sheet(monthlyRows);
    ws2["!cols"] = [{ wch: 8 }, { wch: 10 }, { wch: 10 }];
    XLSX.utils.book_append_sheet(wb, ws2, "\u6708\u5ea6\u7edf\u8ba1");

    var businessRows = buildBusinessTypesSheet();
    var ws3 = XLSX.utils.aoa_to_sheet(businessRows);
    ws3["!cols"] = [{ wch: 14 }, { wch: 10 }];
    XLSX.utils.book_append_sheet(wb, ws3, "\u4e1a\u52a1\u5206\u5e03");

    var cityRows = buildCityDataSheet();
    var ws4 = XLSX.utils.aoa_to_sheet(cityRows);
    ws4["!cols"] = [{ wch: 10 }, { wch: 10 }, { wch: 14 }];
    XLSX.utils.book_append_sheet(wb, ws4, "\u57ce\u5e02\u4e1a\u52a1\u91cf");

    var trendRows = buildTrendSheet();
    var ws5 = XLSX.utils.aoa_to_sheet(trendRows);
    ws5["!cols"] = [{ wch: 10 }, { wch: 10 }, { wch: 10 }];
    XLSX.utils.book_append_sheet(wb, ws5, "\u8d8b\u52bf\u5206\u6790");

    var fileName = "\u667a\u6167\u57ce\u5e02\u6570\u636e\u62a5\u8868_" + dt.full.replace(/[\s:]/g, "_") + ".xlsx";
    XLSX.writeFile(wb, fileName);
  }

  document.addEventListener("DOMContentLoaded", function () {
    var btn = document.getElementById("exportBtn");
    if (btn) {
      btn.addEventListener("click", function () {
        exportToExcel();
      });
    }
  });
})();
