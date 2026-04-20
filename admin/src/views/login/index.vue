<template>
  <div class="login-container">
    <div class="login-box">
      <div class="login-header">
        <div class="logo">🚴</div>
        <h1>骑行平台</h1>
        <p>管理后台</p>
      </div>
      <el-form :model="form" class="login-form">
        <el-form-item>
          <el-input v-model="form.username" placeholder="请输入管理员账号" size="large" prefix-icon="User" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.password" type="password" placeholder="请输入密码" size="large" prefix-icon="Lock" show-password />
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="form.remember">记住密码</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="large" style="width:100%;" @click="handleLogin">登 录</el-button>
        </el-form-item>
      </el-form>
      <div class="login-footer">
        <span>西藏骑闯第三极体育文化传播有限公司</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { ElMessage } from 'element-plus'

const form = reactive({
  username: 'admin',
  password: 'admin123',
  remember: false
})

const handleLogin = () => {
  if (!form.username || !form.password) {
    ElMessage.warning('请输入账号和密码')
    return
  }
  ElMessage.success('登录成功')
  window.location.href = '/dashboard'
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #1a5f9e 0%, #2d8bc9 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}
.login-box {
  background: white;
  border-radius: 16px;
  padding: 40px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.2);
}
.login-header {
  text-align: center;
  margin-bottom: 32px;
}
.logo {
  font-size: 48px;
  margin-bottom: 12px;
}
.login-header h1 {
  font-size: 24px;
  font-weight: 700;
  color: #1a5f9e;
  margin-bottom: 4px;
}
.login-header p {
  color: #999;
  font-size: 14px;
}
.login-form {
  margin-top: 20px;
}
.login-footer {
  text-align: center;
  margin-top: 24px;
  font-size: 12px;
  color: #999;
}
</style>
