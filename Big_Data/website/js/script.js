// 网站JavaScript功能

// OPAQUE DEMO - 前端与Django后端交互

// API基础URL
const API_BASE_URL = '/api/auth';

// 全局状态
let currentUser = null;

// DOM加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initializeAuthSystem();
    checkAuthStatus();
});

// 初始化认证系统
function initializeAuthSystem() {
    // 模态框控制
    const modal = document.getElementById('auth-modal');
    const closeBtn = document.querySelector('.close');
    const loginLink = document.getElementById('login-link');
    const registerLink = document.getElementById('register-link');
    const demoLoginBtn = document.getElementById('demo-login');
    const demoRegisterBtn = document.getElementById('demo-register');
    const demoProfileBtn = document.getElementById('demo-profile');
    const logoutLink = document.getElementById('logout-link');
    const updateProfileBtn = document.getElementById('update-profile');
    
    // 切换登录/注册表单
    document.getElementById('switch-to-register').addEventListener('click', function(e) {
        e.preventDefault();
        showRegisterForm();
    });
    
    document.getElementById('switch-to-login').addEventListener('click', function(e) {
        e.preventDefault();
        showLoginForm();
    });
    
    // 打开模态框
    loginLink.addEventListener('click', function(e) {
        e.preventDefault();
        showLoginForm();
        modal.style.display = 'block';
    });
    
    registerLink.addEventListener('click', function(e) {
        e.preventDefault();
        showRegisterForm();
        modal.style.display = 'block';
    });
    
    // 演示按钮
    demoLoginBtn.addEventListener('click', function() {
        showLoginForm();
        modal.style.display = 'block';
    });
    
    demoRegisterBtn.addEventListener('click', function() {
        showRegisterForm();
        modal.style.display = 'block';
    });
    
    demoProfileBtn.addEventListener('click', function() {
        if (currentUser) {
            showUserDashboard();
        } else {
            showMessage('请先登录', 'error');
            showLoginForm();
            modal.style.display = 'block';
        }
    });
    
    // 关闭模态框
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // 表单提交
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    document.getElementById('registerForm').addEventListener('submit', handleRegister);
    
    // 登出
    logoutLink.addEventListener('click', function(e) {
        e.preventDefault();
        handleLogout();
    });
    
    // 更新资料
    updateProfileBtn.addEventListener('click', function() {
        showMessage('更新资料功能开发中...', 'success');
    });
}

// 显示登录表单
function showLoginForm() {
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('register-form').style.display = 'none';
}

// 显示注册表单
function showRegisterForm() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('register-form').style.display = 'block';
}

// 检查认证状态
async function checkAuthStatus() {
    try {
        const response = await fetch(`${API_BASE_URL}/check-auth/`, {
            method: 'GET',
            credentials: 'include'
        });
        
        const data = await response.json();
        
        if (data.authenticated) {
            currentUser = data.user;
            updateUIForAuthenticatedUser();
        } else {
            updateUIForUnauthenticatedUser();
        }
    } catch (error) {
        console.error('检查认证状态失败:', error);
        updateUIForUnauthenticatedUser();
    }
}

// 处理登录
async function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    
    try {
        const response = await fetch(`${API_BASE_URL}/login/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCSRFToken()
            },
            credentials: 'include',
            body: JSON.stringify({ username, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            currentUser = data.user;
            updateUIForAuthenticatedUser();
            document.getElementById('auth-modal').style.display = 'none';
            showMessage('登录成功！', 'success');
            clearLoginForm();
        } else {
            showMessage(data.message || '登录失败', 'error');
        }
    } catch (error) {
        console.error('登录失败:', error);
        showMessage('网络错误，请稍后重试', 'error');
    }
}

// 处理注册
async function handleRegister(e) {
    e.preventDefault();
    
    const username = document.getElementById('reg-username').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;
    const passwordConfirm = document.getElementById('reg-password-confirm').value;
    
    if (password !== passwordConfirm) {
        showMessage('密码不匹配', 'error');
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/register/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCSRFToken()
            },
            credentials: 'include',
            body: JSON.stringify({ 
                username, 
                email, 
                password, 
                password_confirm: passwordConfirm 
            })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            currentUser = data.user;
            updateUIForAuthenticatedUser();
            document.getElementById('auth-modal').style.display = 'none';
            showMessage('注册成功！', 'success');
            clearRegisterForm();
        } else {
            showMessage(data.message || '注册失败', 'error');
        }
    } catch (error) {
        console.error('注册失败:', error);
        showMessage('网络错误，请稍后重试', 'error');
    }
}

// 处理登出
async function handleLogout() {
    try {
        const response = await fetch(`${API_BASE_URL}/logout/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCSRFToken()
            },
            credentials: 'include'
        });
        
        if (response.ok) {
            currentUser = null;
            updateUIForUnauthenticatedUser();
            showMessage('已成功登出', 'success');
        }
    } catch (error) {
        console.error('登出失败:', error);
    }
}

// 更新UI为已认证用户
function updateUIForAuthenticatedUser() {
    document.getElementById('auth-links').style.display = 'none';
    document.getElementById('user-info').style.display = 'block';
    document.getElementById('user-dashboard').style.display = 'block';
    
    document.getElementById('username-display').textContent = currentUser.username;
    document.getElementById('welcome-message').textContent = `欢迎，${currentUser.username}！`;
    document.getElementById('detail-username').textContent = currentUser.username;
    document.getElementById('detail-email').textContent = currentUser.email;
    document.getElementById('detail-joined').textContent = new Date().toLocaleDateString('zh-CN');
}

// 更新UI为未认证用户
function updateUIForUnauthenticatedUser() {
    document.getElementById('auth-links').style.display = 'block';
    document.getElementById('user-info').style.display = 'none';
    document.getElementById('user-dashboard').style.display = 'none';
}

// 显示用户控制面板
function showUserDashboard() {
    document.getElementById('user-dashboard').scrollIntoView({ behavior: 'smooth' });
}

// 显示消息
function showMessage(message, type) {
    // 移除现有消息
    const existingMessage = document.querySelector('.message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // 创建新消息
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    
    // 插入到页面顶部
    const main = document.querySelector('main');
    main.insertBefore(messageDiv, main.firstChild);
    
    // 3秒后自动移除
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.remove();
        }
    }, 3000);
}

// 获取CSRF Token
function getCSRFToken() {
    const name = 'csrftoken';
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

// 清空表单
function clearLoginForm() {
    document.getElementById('loginForm').reset();
}

function clearRegisterForm() {
    document.getElementById('registerForm').reset();
}

// 联系表单处理
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 获取表单数据
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // 模拟表单提交
        showMessage('消息已通过安全连接发送！', 'success');
        
        // 清空表单
        this.reset();
        
        // 更新表单安全状态
        const formStatus = document.getElementById('form-security-status');
        if (formStatus) {
            formStatus.innerHTML = `
                <span class="security-icon">✅</span>
                <span>消息已安全发送 (${new Date().toLocaleTimeString()})</span>
            `;
        }
    });
}

// 添加CSS动画
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .security-badge {
        display: inline-block;
        padding: 5px 10px;
        border-radius: 15px;
        font-size: 0.8rem;
        font-weight: bold;
        margin-left: 10px;
    }
    
    .security-badge.secure {
        background: #4caf50;
        color: white;
    }
    
    .security-badge.insecure {
        background: #f44336;
        color: white;
    }
`;

document.head.appendChild(style);



// 页面性能监控
window.addEventListener('load', function() {
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
    console.log(`页面加载时间: ${loadTime}ms`);
    
    if (loadTime < 1000) {
        console.log('%c⚡ 页面加载速度优秀', 'color: green; font-weight: bold;');
    } else if (loadTime < 3000) {
        console.log('%c⏱️ 页面加载速度良好', 'color: orange; font-weight: bold;');
    } else {
        console.log('%c🐌 页面加载较慢', 'color: red; font-weight: bold;');
    }
});