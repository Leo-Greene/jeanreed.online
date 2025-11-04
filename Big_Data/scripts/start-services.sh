#!/bin/bash
set -e

echo "🚀 开始启动HTTPS网站服务..."

echo "删除默认的Nginx配置..."
rm -f /etc/nginx/sites-enabled/default

# 检查证书是否存在，如果不存在则获取
if [ ! -f /etc/letsencrypt/live/www.jeanreed.online/fullchain.pem ]; then
    echo "[+]证书不存在，开始获取..."
    pkill nginx || true
    certbot certonly --standalone \
      -d www.jeanreed.online \
      -d jeanreed.online \
      --email 925606751@qq.com \
      --agree-tos \
      --no-eff-email \
      --non-interactive
    echo "[+]证书获取完成"
fi

# 配置Nginx使用证书
sed -i 's|# ssl_certificate .*|ssl_certificate /etc/letsencrypt/live/www.jeanreed.online/fullchain.pem;|' /etc/nginx/conf.d/production1.conf
sed -i 's|# ssl_certificate_key .*|ssl_certificate_key /etc/letsencrypt/live/www.jeanreed.online/privkey.pem;|' /etc/nginx/conf.d/production1.conf
echo "[+]Nginx证书配置成功加载到指定文件"


echo "测试Nginx配置..."
nginx -t

echo "启动Nginx（过滤调试信息）..."
启动Nginx并过滤掉调试信息
exec nginx -g "daemon off; error_log /dev/stderr error;" 2>&1 | \
    grep -E '(\\[error\\]|[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}.*HTTP/[0-9]\\.[0-9]" [4-5][0-9][0-9])'