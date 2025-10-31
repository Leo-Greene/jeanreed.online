# HTTPS演示网站

这是一个使用Nginx配置的HTTPS安全演示网站，展示了现代Web安全的最佳实践。

## 🚀 快速开始

### 前提条件
- Docker 和 Docker Compose
- 自签名SSL证书（已包含在项目中）

### 启动服务

1. **生成SSL证书**（如果尚未生成）：
```bash
cd scripts
./setup-ssl.sh
```

2. **启动所有服务**：
```bash
cd scripts
./start-services.sh
```

3. **访问网站**：
- HTTPS: https://localhost
- HTTP: http://localhost（会自动重定向到HTTPS）

## 📁 项目结构

```
website/
├── index.html          # 首页 - 安全特性展示
├── about.html          # 关于页面 - 技术细节
├── contact.html        # 联系页面 - 安全表单
├── css/
│   └── style.css       # 样式文件
├── js/
│   └── script.js       # JavaScript功能
└── README.md          # 说明文档
```

## 🔐 安全特性

### 1. SSL/TLS加密
- 使用自签名证书演示TLS加密
- 支持HTTP/2协议
- 强密码套件配置

### 2. HSTS保护
- 强制浏览器使用HTTPS
- 防止SSL剥离攻击
- 包含子域名保护

### 3. 安全头部
- `X-Frame-Options: DENY` - 防止点击劫持
- `X-Content-Type-Options: nosniff` - 防止MIME嗅探
- 其他安全头部配置

### 4. HTTP到HTTPS重定向
- 自动将HTTP请求重定向到HTTPS
- 保留原始请求URI和参数

## 🌐 网站功能

### 首页 (index.html)
- 安全连接状态检测
- 核心安全特性展示
- 实时安全状态监控

### 关于页面 (about.html)
- 技术栈介绍
- 安全配置详情
- 演示目的说明

### 联系页面 (contact.html)
- 安全联系表单
- HTTPS加密传输演示
- 安全状态指示

## 🛠️ 技术栈

- **Web服务器**: Nginx
- **SSL证书**: 自签名证书（演示用）
- **前端技术**: HTML5, CSS3, JavaScript
- **容器化**: Docker + Docker Compose
- **安全配置**: 基于Nginx安全最佳实践

## 📊 性能优化

- HTTP/2多路复用
- 静态资源缓存
- Gzip压缩
- 浏览器缓存策略

## 🔧 配置说明

### Nginx配置
配置文件位置：`nginx-config/development/localhost1.conf`

主要配置项：
- SSL证书路径
- HTTP重定向规则
- 安全头部设置
- 静态资源缓存

### SSL证书
- 证书位置：`ssl-certs/localhost/`
- 包含：`localhost.crt` 和 `localhost.key`
- 自签名证书，仅用于演示

## 🧪 测试方法

### 安全连接测试
1. 访问 https://localhost
2. 点击"检测当前连接安全性"按钮
3. 查看安全状态报告

### 重定向测试
1. 访问 http://localhost
2. 观察是否自动重定向到HTTPS

### 安全头部检查
使用浏览器开发者工具检查响应头部：
- `Strict-Transport-Security`
- `X-Frame-Options`
- `X-Content-Type-Options`

## ⚠️ 注意事项

1. **自签名证书警告**：浏览器会显示安全警告，这是正常的演示行为
2. **生产环境**：实际部署时应使用受信任的CA颁发的证书
3. **本地测试**：仅支持localhost访问
4. **证书续期**：自签名证书需要定期更新

## 📈 监控和日志

- Nginx访问日志：`logs/nginx/access.log`
- Nginx错误日志：`logs/nginx/error.log`
- SSL握手日志：可通过Nginx配置启用

## 🔄 更新和维护

### 更新网站内容
直接修改HTML、CSS、JS文件，然后重启Nginx服务。

### 更新SSL证书
```bash
cd scripts
./setup-ssl.sh
```

### 重启服务
```bash
cd scripts
./start-services.sh
```

## 🤝 贡献

欢迎提交Issue和Pull Request来改进这个演示项目。

## 📄 许可证

本项目仅用于教育和演示目的。

---

**注意**: 这是一个演示项目，生产环境部署需要额外的安全配置和优化。