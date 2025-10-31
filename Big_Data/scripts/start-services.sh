#!/bin/bash
set -e

echo "🚀 开始启动HTTPS网站服务..."

echo "测试Nginx配置..."
nginx -t

echo "启动Nginx（过滤调试信息）..."
# 启动Nginx并过滤掉调试信息
nginx -g "daemon off; error_log /dev/stderr debug;" 2>&1 | grep -v "\[debug\]"