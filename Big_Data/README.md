# OPAQUE DEMO - 安全登录注册演示系统

这是一个完整的全栈Web应用演示，展示了前后端分离的架构，包含用户认证系统和现代化的UI界面。

## 🚀 项目特性

### 前端特性
- **响应式设计** - 适配桌面和移动设备
- **现代化UI** - 使用CSS Grid和Flexbox布局
- **交互式界面** - 模态框、动画效果和实时状态更新
- **安全演示** - 展示HTTPS、安全协议等特性

### 后端特性
- **Django REST Framework** - 强大的API框架
- **自定义用户模型** - 扩展Django默认用户模型
- **会话认证** - 安全的用户认证系统
- **CORS支持** - 跨域资源共享配置
- **PostgreSQL支持** - 生产级数据库

### 部署特性
- **Docker容器化** - 完整的容器化部署
- **Nginx反向代理** - 高性能Web服务器
- **HTTPS支持** - 安全的SSL/TLS加密
- **环境配置** - 灵活的环境变量管理

## 📁 项目结构

```
Big_Data/
├── backend/                 # Django后端项目
│   ├── auth_app/           # 认证应用
│   │   ├── models.py       # 数据模型
│   │   ├── serializers.py  # API序列化器
│   │   ├── views.py        # API视图
│   │   ├── urls.py         # URL路由
│   │   └── migrations/     # 数据库迁移
│   ├── opaque_demo/        # Django项目配置
│   │   ├── settings.py     # 项目设置
│   │   ├── urls.py         # 主URL配置
│   │   └── wsgi.py         # WSGI入口
│   └── manage.py           # Django管理脚本
├── website/                # 前端静态文件
│   ├── index.html         # 主页面
│   ├── css/               # 样式文件
│   │   └── style.css      # 主样式表
│   └── js/                # JavaScript文件
│       └── script.js      # 前端交互逻辑
├── scripts/               # 工具脚本
│   ├── start-backend.bat # Windows启动脚本
│   ├── start-backend.sh   # Linux启动脚本
│   └── test-api.py        # API测试脚本
├── docker-compose.yml     # Docker编排配置
├── nginx.conf            # Nginx配置
└── requirements.txt       # Python依赖
```

## 🛠️ 快速开始

### 环境要求
- Python 3.8+
- Node.js (可选，用于前端开发)
- Docker & Docker Compose (用于容器化部署)

### 本地开发

1. **安装Python依赖**
   ```bash
   cd Big_Data
   pip install -r requirements.txt
   ```

2. **启动后端服务**
   ```bash
   # Windows
   scripts\start-backend.bat
   
   # Linux/Mac
   chmod +x scripts/start-backend.sh
   ./scripts/start-backend.sh
   ```

3. **访问应用**
   - 前端: http://localhost
   - 后端API: http://localhost:8000/api
   - Django管理后台: http://localhost:8000/admin

### Docker部署

1. **构建并启动服务**
   ```bash
   docker-compose up --build
   ```

2. **访问应用**
   - 主应用: https://localhost
   - API服务: https://localhost/api

## 🔧 配置说明

### 环境变量
复制 `.env.example` 为 `.env` 并配置相应参数：

```bash
# Django设置
SECRET_KEY=your-secret-key-here
DEBUG=True

# 数据库设置
DB_NAME=opaque_demo
DB_USER=postgres
DB_PASSWORD=your-password
DB_HOST=localhost
DB_PORT=5432

# 其他设置
USE_POSTGRESQL=False  # 开发时使用SQLite
```

### API端点

| 端点 | 方法 | 描述 |
|------|------|------|
| `/api/auth/register/` | POST | 用户注册 |
| `/api/auth/login/` | POST | 用户登录 |
| `/api/auth/logout/` | POST | 用户登出 |
| `/api/auth/profile/` | GET | 获取用户资料 |
| `/api/auth/status/` | GET | 检查认证状态 |

## 🧪 测试

运行API测试脚本验证系统功能：

```bash
python scripts/test-api.py
```

测试内容包括：
- ✅ 服务器连接
- ✅ 用户注册
- ✅ 用户登录  
- ✅ 资料获取
- ✅ 用户登出

## 🔒 安全特性

- **HTTPS加密** - 全站SSL/TLS加密
- **CSRF保护** - 跨站请求伪造防护
- **会话管理** - 安全的用户会话处理
- **密码哈希** - 使用Django内置密码哈希
- **CORS配置** - 安全的跨域资源共享

## 🚀 部署到生产环境

1. **配置生产环境变量**
   ```bash
   DEBUG=False
   USE_POSTGRESQL=True
   SECRET_KEY=your-production-secret-key
   ```

2. **构建生产镜像**
   ```bash
   docker-compose -f docker-compose.prod.yml up --build
   ```

3. **配置SSL证书**
   - 将SSL证书文件放置在 `ssl-certs/` 目录
   - 更新Nginx配置中的证书路径

## 📊 技术栈

### 后端
- **Django 4.2.7** - Python Web框架
- **Django REST Framework** - API框架
- **PostgreSQL** - 数据库
- **Gunicorn** - WSGI服务器

### 前端
- **HTML5** - 语义化标记
- **CSS3** - 现代化样式
- **JavaScript** - 交互逻辑
- **Fetch API** - HTTP请求

### 部署
- **Docker** - 容器化
- **Nginx** - Web服务器
- **Docker Compose** - 服务编排

## 🤝 贡献指南

1. Fork本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开Pull Request

## 📄 许可证

本项目采用MIT许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 📞 联系方式

如有问题或建议，请通过以下方式联系：
- 项目主页: https://jeanreed.online
- 邮箱: admin@jeanreed.online

---

**OPAQUE DEMO** - 安全、现代的全栈Web应用演示 💫