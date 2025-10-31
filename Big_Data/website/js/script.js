// 网站JavaScript功能

// 联系表单处理
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // 模拟表单提交
            showSecurityAlert('success', '消息已通过安全连接发送！');
            
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
    

});

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