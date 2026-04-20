<template>
  <div class="user-admin">
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
          <h2>👥 用户管理</h2>
          <el-button type="primary">+ 新建用户</el-button>
        </div>

        <!-- 筛选 -->
        <div class="filter-bar">
          <el-select v-model="filterLevel" placeholder="会员等级" style="width:140px;" clearable>
            <el-option label="全部" value="" />
            <el-option label="普通用户" value="normal" />
            <el-option label="银卡会员" value="silver" />
            <el-option label="金卡会员" value="gold" />
            <el-option label="理事单位" value="director" />
          </el-select>
          <el-input v-model="searchKeyword" placeholder="搜索姓名/手机/昵称" style="width:200px;" clearable />
          <el-button @click="resetFilter">重置</el-button>
        </div>

        <!-- 表格 -->
        <div class="table-panel">
          <el-table :data="users" border stripe>
            <el-table-column prop="id" label="用户ID" width="80" />
            <el-table-column label="头像" width="70">
              <template #default>
                <div style="width:36px;height:36px;background:#1a5f9e;border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;font-size:16px;">👤</div>
              </template>
            </el-table-column>
            <el-table-column prop="nickname" label="昵称" width="120" />
            <el-table-column prop="phone" label="手机号" width="120" />
            <el-table-column label="会员等级" width="100">
              <template #default="{ row }">
                <el-tag :type="getLevelType(row.level)" size="small">{{ row.level }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="registerDate" label="注册时间" width="120" />
            <el-table-column prop="lastLogin" label="最近登录" width="160" />
            <el-table-column prop="totalRides" label="累计骑行" width="100">
              <template #default="{ row }">{{ row.totalRides }} km</template>
            </el-table-column>
            <el-table-column label="状态" width="80">
              <template #default="{ row }">
                <el-switch v-model="row.active" :active-value="true" :inactive-value="false" />
              </template>
            </el-table-column>
            <el-table-column label="操作" width="140" fixed="right">
              <template #default>
                <el-button size="small" type="primary">编辑</el-button>
                <el-button size="small" type="danger">禁用</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <!-- 分页 -->
        <div class="pagination">
          <el-pagination
            v-model:current-page="currentPage"
            :page-size="10"
            :total="452"
            layout="total, prev, pager, next"
          />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeMenu = ref('/user-admin')
const filterLevel = ref('')
const searchKeyword = ref('')
const currentPage = ref(1)

const users = ref([
  { id: 10001, nickname: '高原骑行者', phone: '138****6789', level: '金卡会员', registerDate: '2025-01-15', lastLogin: '2026-04-20 10:30', totalRides: 5680, active: true },
  { id: 10002, nickname: '骑行爱好者', phone: '139****1234', level: '银卡会员', registerDate: '2025-03-22', lastLogin: '2026-04-19 18:45', totalRides: 2340, active: true },
  { id: 10003, nickname: '周末骑士', phone: '136****5678', level: '普通用户', registerDate: '2025-06-10', lastLogin: '2026-04-18 09:20', totalRides: 890, active: true },
  { id: 10004, nickname: '山地狂人', phone: '137****9012', level: '理事单位', registerDate: '2024-11-05', lastLogin: '2026-04-20 08:00', totalRides: 12050, active: true },
  { id: 10005, nickname: '骑行新手', phone: '135****3456', level: '普通用户', registerDate: '2026-02-28', lastLogin: '2026-04-15 14:30', totalRides: 120, active: false },
])

const getLevelType = (level: string) => {
  const map: Record<string, string> = { '普通用户': 'info', '银卡会员': 'default', '金卡会员': 'warning', '理事单位': 'danger' }
  return map[level] || 'info'
}

const resetFilter = () => {
  filterLevel.value = ''
  searchKeyword.value = ''
}
</script>

<style scoped>
.user-admin { min-height: 100vh; background: #f0f4f8; }
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
.filter-bar { background: white; padding: 16px; border-radius: 8px; margin-bottom: 16px; display: flex; gap: 12px; align-items: center; }
.table-panel { background: white; border-radius: 12px; padding: 16px; }
.pagination { display: flex; justify-content: flex-end; margin-top: 16px; }
</style>
