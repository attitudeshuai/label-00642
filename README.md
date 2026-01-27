# 智慧城市数据可视化大屏

一个专业的数据可视化大屏静态页面，采用深蓝科技风格设计，包含多种图表和实时数据展示效果。

## How to Run

### 方式一：Docker 部署（推荐）

```bash
# 进入项目目录
cd label-00642

# 构建并启动容器
docker-compose up --build -d

# 查看运行状态
docker-compose ps

# 停止服务
docker-compose down
```

### 方式二：直接打开

直接在浏览器中打开 `frontend/index.html` 文件即可预览（部分功能可能受限于跨域策略）。

### 方式三：本地 HTTP 服务器

```bash
# 使用 Python
cd frontend
python -m http.server 8081

# 或使用 Node.js
npx serve -p 8081
```

## Services

| 服务名称           | 端口 | 说明               |
| ------------------ | ---- | ------------------ |
| Dashboard Frontend | 8081 | 数据可视化大屏页面 |

访问地址：http://localhost:8081

## 测试账号

本项目为纯静态页面，无需登录账号。

## 题目内容

> 根据提供的图片，模拟一个大屏端静态html页面

---

## 项目介绍

### 技术栈

- HTML5 + CSS3 + JavaScript (ES6+)
- ECharts 5.4.3 (数据可视化图表库)
- Nginx 1.25 Alpine (静态资源服务器)
- Docker (容器化部署)

### 功能特性

1. **顶部标题栏**
   - 系统名称展示
   - 实时时间显示（精确到秒）
   - 装饰性动画效果

2. **左侧面板**
   - 核心数据指标卡片（数字滚动动画）
   - 月度数据柱状图
   - 业务类型环形图

3. **中央区域**
   - 平台累计交易总额（大数字展示）
   - 城市业务量柱状图（渐变色彩区分城市等级）
   - 实时动态信息滚动

4. **右侧面板**
   - 趋势分析折线图
   - 区域排行榜
   - 目标完成度进度条

5. **底部信息栏**
   - 系统运行状态
   - 服务器负载监控
   - 在线用户统计

### 设计规范

- **分辨率**: 1920 x 1080 (标准大屏尺寸)
- **主色调**: #00d4ff (科技蓝)
- **背景色**: #0d1b2a (深蓝黑)
- **字体**: Microsoft YaHei, PingFang SC

### 项目结构

```
label-00642/
├── frontend/                 # 前端静态文件
│   ├── index.html           # 主页面
│   ├── css/
│   │   └── style.css        # 样式文件
│   ├── js/
│   │   ├── main.js          # 主逻辑
│   │   ├── charts.js        # 图表配置
│   │   └── data.js          # 模拟数据
│   ├── nginx.conf           # Nginx 配置
│   └── Dockerfile           # Docker 构建文件
├── docs/
│   └── project_design.md    # 项目设计文档
├── docker-compose.yml       # Docker Compose 配置
├── .gitignore              # Git 忽略文件
└── README.md               # 项目说明
```

### 浏览器兼容性

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

### 截图预览

页面采用深蓝科技风格，包含：

- 渐变背景和发光边框效果
- 数字滚动动画
- 图表交互动效
- 实时数据更新模拟
