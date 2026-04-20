<template>
  <div class="store-admin">
    <!-- 顶部导航 -->
    <div class="topbar">
      <div class="topbar-left">
        <span class="logo">🚴</span>
        <span class="title">骑行平台管理后台</span>
      </div>
      <div class="topbar-right">
        <el-dropdown>
          <span class="user-info"><span class="avatar">👤</span><span>管理员</span></span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>个人信息</el-dropdown-item>
              <el-dropdown-item divided>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>

    <div class="admin-body">
      <!-- 左侧菜单 -->
      <aside class="sidebar">
        <el-menu :default-active="activeMenu" class="sidebar-menu">
          <el-menu-item index="/dashboard"><span>📊</span><span>工作台</span></el-menu-item>
          <el-menu-item index="/activity-admin"><span>🏆</span><span>活动管理</span></el-menu-item>
          <el-menu-item index="/signup-admin"><span>📋</span><span>报名管理</span></el-menu-item>
          <el-menu-item index="/store-admin"><span>📍</span><span>门店管理</span></el-menu-item>
          <el-menu-item index="/user-admin"><span>👥</span><span>用户管理</span></el-menu-item>
        </el-menu>
      </aside>

      <!-- 右侧内容 -->
      <main class="main-content">
        <div class="content-header">
          <h2>📍 门店管理</h2>
          <el-button type="primary">+ 新建门店</el-button>
        </div>

        <!-- 门店卡片列表 -->
        <div class="store-grid">
          <div class="store-card" v-for="store in stores" :key="store.id">
            <div class="store-card-img" :style="{ background: store.bg }">
              <span class="store-tag" v-if="store.isNew">新店</span>
            </div>
            <div class="store-card-content">
              <div class="store-card-header">
                <h3>{{ store.name }}</h3>
                <el-tag :type="store.status === '营业中' ? 'success' : 'info'" size="small">{{ store.status }}</el-tag>
              </div>
              <div class="store-card-info">
                <div class="info-row"><span class="info-icon">📞</span> {{ store.phone }}</div>
                <div class="info-row"><span class="info-icon">📍</span> {{ store.address }}</div>
                <div class="info-row"><span class="info-icon">🕐</span> {{ store.hours }}</div>
              </div>
              <div class="store-card-actions">
                <el-button size="small" type="primary">编辑</el-button>
                <el-button size="small">查看详情</el-button>
                <el-button size="small" type="danger">删除</el-button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeMenu = ref('/store-admin')

const stores = ref([
  { id: 1, name: '高原骑行体验店（西宁旗舰店）', phone: '0971-6258888', address: '青海省西宁市城中区长江路98号', hours: '09:00 - 21:00', status: '营业中', bg: 'linear-gradient(135deg, #8B4513, #a0522d)', isNew: false },
  { id: 2, name: '环湖驿站（青海湖二郎剑店）', phone: '0978-1234567', address: '青海湖二郎剑景区停车场南侧50米', hours: '08:00 - 20:00', status: '营业中', bg: 'linear-gradient(135deg, #1a5f9e, #2d8bc9)', isNew: false },
  { id: 3, name: '格尔木骑行补给站', phone: '0979-8888888', address: '青海省格尔木市黄河东路58号', hours: '07:00 - 22:00', status: '营业中', bg: 'linear-gradient(135deg, #52c41a, #73d13d)', isNew: false },
  { id: 4, name: '拉萨骑行服务站（西藏总店）', phone: '0891-6666666', address: '西藏拉萨市城关区北京中路120号', hours: '09:00 - 21:00', status: '营业中', bg: 'linear-gradient(135deg, #8B4513, #a0522d)', isNew: false },
  { id: 5, name: '成都分站', phone: '028-88888888', address: '四川省成都市武侯区科华北路66号', hours: '10:00 - 20:00', status: '装修中', bg: 'linear-gradient(135deg, #f5a623, #ff8c00)', isNew: true },
])
</script>

<style scoped>
.store-admin { min-height: 100vh; background: #f0f4f8; }
.topbar { height: 60px; background: white; border-bottom: 1px solid #eee; display: flex; align-items: center; justify-content: space-between; padding: 0 20px; position: sticky; top: 0; z-index: 100; }
.topbar-left { display: flex; align-items: center; gap: 10px; }
.logo { font-size: 24px; }
.title { font-size: 16px; font-weight: 600; color: #1a5f9e; }
.topbar-right { display: flex; align-items: center; gap: 16px; }
.user-info { display: flex; align-items: center; gap: 6px; cursor: pointer; font-size: 14px; }
.avatar { font-size: 20px; }
.admin-body { display: flex; }
.sidebar { width: 200px; background: white; min-height: calc(100vh - 60px); border-right: 1px solid #eee; }
.sidebar-menu { border: none; }
.sidebar-menu span { margin-right: 8px; }
.main-content { flex: 1; padding: 20px; }
.content-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.content-header h2 { font-size: 20px; font-weight: 600; }
.store-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
.store-card { background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
.store-card-img { height: 120px; position: relative; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px; }
.store-tag { position: absolute; top: 10px; right: 10px; background: #ff4d4f; color: white; padding: 2px 8px; border-radius: 4px; font-size: 11px; }
.store-card-content { padding: 16px; }
.store-card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
.store-card-header h3 { font-size: 15px; font-weight: 600; }
.store-card-info { margin-bottom: 12px; }
.info-row { font-size: 13px; color: #666; margin-bottom: 6px; display: flex; align-items: center; gap: 6px; }
.info-icon { font-size: 12px; }
.store-card-actions { display: flex; gap: 8px; }
</style>
