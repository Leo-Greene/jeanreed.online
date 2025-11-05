#!/usr/bin/env python3
"""
API测试脚本 - 测试Django后端API功能
"""

import requests
import json

# API基础URL
BASE_URL = "http://localhost:8000/api"

def test_connection():
    """测试服务器连接"""
    try:
        response = requests.get(f"{BASE_URL}/auth/status/")
        print(f"✅ 服务器连接正常 - 状态码: {response.status_code}")
        return True
    except requests.exceptions.ConnectionError:
        print("❌ 无法连接到服务器，请确保Django服务器正在运行")
        return False

def test_user_registration():
    """测试用户注册功能"""
    print("\n📝 测试用户注册功能...")
    
    # 测试数据
    user_data = {
        "username": "testuser",
        "email": "test@example.com",
        "password": "testpassword123",
        "password_confirm": "testpassword123"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/auth/register/", json=user_data)
        
        if response.status_code == 201:
            print("✅ 用户注册成功")
            return True
        elif response.status_code == 400:
            data = response.json()
            if "username" in data and "A user with that username already exists." in data["username"]:
                print("⚠️  用户已存在，跳过注册测试")
                return True
            else:
                print(f"❌ 注册失败 - 错误信息: {data}")
                return False
        else:
            print(f"❌ 注册失败 - 状态码: {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ 注册测试异常: {e}")
        return False

def test_user_login():
    """测试用户登录功能"""
    print("\n🔐 测试用户登录功能...")
    
    login_data = {
        "username": "testuser",
        "password": "testpassword123"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/auth/login/", json=login_data)
        
        if response.status_code == 200:
            data = response.json()
            print("✅ 用户登录成功")
            print(f"   用户信息: {data.get('user', {}).get('username')}")
            
            # 保存session用于后续测试
            session = requests.Session()
            session.cookies.update(response.cookies)
            return session
        else:
            print(f"❌ 登录失败 - 状态码: {response.status_code}")
            print(f"   响应内容: {response.text}")
            return None
            
    except Exception as e:
        print(f"❌ 登录测试异常: {e}")
        return None

def test_user_profile(session):
    """测试用户资料获取"""
    print("\n👤 测试用户资料获取...")
    
    try:
        response = session.get(f"{BASE_URL}/auth/profile/")
        
        if response.status_code == 200:
            data = response.json()
            print("✅ 用户资料获取成功")
            print(f"   用户名: {data.get('username')}")
            print(f"   邮箱: {data.get('email')}")
            return True
        else:
            print(f"❌ 资料获取失败 - 状态码: {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ 资料测试异常: {e}")
        return False

def test_user_logout(session):
    """测试用户登出功能"""
    print("\n🚪 测试用户登出功能...")
    
    try:
        response = session.post(f"{BASE_URL}/auth/logout/")
        
        if response.status_code == 200:
            print("✅ 用户登出成功")
            return True
        else:
            print(f"❌ 登出失败 - 状态码: {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ 登出测试异常: {e}")
        return False

def main():
    """主测试函数"""
    print("🚀 开始测试OPAQUE DEMO API功能")
    print("=" * 50)
    
    # 测试连接
    if not test_connection():
        return
    
    # 测试注册
    if not test_user_registration():
        return
    
    # 测试登录
    session = test_user_login()
    if not session:
        return
    
    # 测试资料获取
    if not test_user_profile(session):
        return
    
    # 测试登出
    if not test_user_logout(session):
        return
    
    print("\n" + "=" * 50)
    print("🎉 所有API测试通过！前后端交互功能正常")
    print("\n📋 测试总结:")
    print("   ✅ 服务器连接正常")
    print("   ✅ 用户注册功能正常") 
    print("   ✅ 用户登录功能正常")
    print("   ✅ 用户资料获取正常")
    print("   ✅ 用户登出功能正常")

if __name__ == "__main__":
    main()