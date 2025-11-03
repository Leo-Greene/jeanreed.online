# 使用官方Ubuntu LTS作为基础镜像
FROM ubuntu:22.04

# 设置环境变量，避免交互式提示
ENV DEBIAN_FRONTEND=noninteractive
ENV TZ=UTC

# 设置工作目录
WORKDIR /app

# 创建必要的目录结构
RUN mkdir -p /app/scripts /app/config /var/www/html /var/log/nginx

RUN sed -i 's/archive.ubuntu.com/mirrors.aliyun.com/g' /etc/apt/sources.list && \
    sed -i 's/security.ubuntu.com/mirrors.aliyun.com/g' /etc/apt/sources.list
    
# 一次性安装所有包（减少镜像层，提高构建速度）
RUN apt-get update && apt-get install -y \
    # 基础工具
    curl \
    wget \
    vim \
    nano \
    git \
    htop \
    net-tools \
    dnsutils \
    iputils-ping \
    # Web服务器
    nginx \
    # Certbot和ACME相关
    python3 \
    python3-pip \
    python3-venv \
    python3-certbot-nginx \
    certbot \
    # SSL工具
    openssl \
    ssl-cert \
    ca-certificates \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# 配置Nginx用户和权限
RUN usermod -a -G www-data root && \
    chown -R www-data:www-data /var/www/html && \
    chmod -R 755 /var/www/html

# 暴露端口
EXPOSE 80
EXPOSE 443

# 创建健康检查
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/ || exit 1

# 复制脚本文件
COPY scripts/*.sh /app/scripts/

# 设置脚本权限
RUN chmod +x /app/scripts/*.sh


# 设置启动脚本
CMD ["/app/scripts/start-services.sh"]