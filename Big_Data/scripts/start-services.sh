#!/bin/bash
set -e

echo "🚀 开始启动HTTPS网站服务..."

echo "删除默认的Nginx配置..."
rm -f /etc/nginx/sites-enabled/default

echo "测试Nginx配置..."
nginx -t

echo "启动Nginx（过滤调试信息）..."
# 启动Nginx并过滤掉调试信息
exec nginx -g "daemon off; error_log /dev/stderr error;" 2>&1 | \
    grep -E '(\\[error\\]|[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}.*HTTP/[0-9]\\.[0-9]" [4-5][0-9][0-9])'