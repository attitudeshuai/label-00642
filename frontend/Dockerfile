# 数据可视化大屏 - Dockerfile
# 使用多阶段构建，支持 ARM64 和 AMD64 架构

FROM --platform=$BUILDPLATFORM nginx:1.25-alpine AS production

# 设置工作目录
WORKDIR /usr/share/nginx/html

# 删除默认的 nginx 静态文件
RUN rm -rf ./*

# 复制静态文件
COPY index.html .
COPY css/ ./css/
COPY js/ ./js/

# 复制 nginx 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 设置文件权限
RUN chmod -R 755 /usr/share/nginx/html

# 暴露端口
EXPOSE 80

# 健康检查
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost/health || exit 1

# 启动 nginx
CMD ["nginx", "-g", "daemon off;"]
