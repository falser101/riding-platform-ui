<template>
  <div class="activity-admin">
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
          <h2>🏆 活动管理</h2>
          <el-button type="primary" @click="dialogVisible = true">+ 新建活动</el-button>
        </div>

        <!-- 筛选 -->
        <div class="filter-bar">
          <el-select v-model="filterStatus" placeholder="活动状态" style="width:120px;" clearable>
            <el-option label="全部" value="" />
            <el-option label="报名中" value="signup" />
            <el-option label="进行中" value="ongoing" />
            <el-option label="已结束" value="finished" />
            <el-option label="草稿" value="draft" />
          </el-select>
          <el-input v-model="searchKeyword" placeholder="搜索活动名称" style="width:200px;" clearable />
          <el-button @click="resetFilter">重置</el-button>
        </div>

        <!-- 表格 -->
        <div class="table-panel">
          <el-table :data="activities" border stripe>
            <el-table-column prop="id" label="ID" width="60" />
            <el-table-column label="活动封面" width="100">
              <template #default>
                <div style="width:60px;height:40px;background:linear-gradient(135deg,#1a5f9e,#2d8bc9);border-radius:4px;"></div>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="活动名称" min-width="200" />
            <el-table-column prop="date" label="活动时间" width="130" />
            <el-table-column prop="location" label="地点" width="120" />
            <el-table-column prop="fee" label="费用" width="80">
              <template #default="{ row }">¥{{ row.fee }}</template>
            </el-table-column>
            <el-table-column label="报名/限额" width="100">
              <template #default="{ row }">
                <span :style="{ color: row.signups >= row.limit ? '#ff4d4f' : '#52c41a' }">{{ row.signups }}/{{ row.limit }}</span>
              </template>
            </el-table-column>
            <el-table-column label="状态" width="100">
              <template #default="{ row }">
                <el-tag :type="getStatusType(row.status)" size="small">{{ row.status }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="200" fixed="right">
              <template #default>
                <el-button size="small" type="primary">编辑</el-button>
                <el-button size="small">报名名单</el-button>
                <el-button size="small" type="danger">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <!-- 分页 -->
        <div class="pagination">
          <el-pagination
            v-model:current-page="currentPage"
            :page-size="10"
            :total="50"
            layout="total, prev, pager, next"
          />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeMenu = ref('/activity-admin')
const filterStatus = ref('')
const searchKeyword = ref('')
const currentPage = ref(1)
const dialogVisible = ref(false)

const activities = ref([
  { id: 1, name: '2026 环青海湖国际骑行挑战赛', date: '2026-07-15', location: '青海西宁', fee: 1680, signups: 386, limit: 500, status: '报名中' },
  { id: 2, name: '2026 暑期亲子骑行夏令营', date: '2026-07-20', location: '青海湖', fee: 2980, signups: 45, limit: 60, status: '报名中' },
  { id: 3, name: '2026 春季高原骑行邀请赛', date: '2026-04-05', location: '四川康定', fee: 880, signups: 120, limit: 120, status: '已满员' },
  { id: 4, name: '"骑向未来"亲子骑行活动', date: '每周六/日', location: '青海湖', fee: 0, signups: 280, limit: 500, status: '报名中' },
  { id: 5, name: '2025 拉萨国际自行车挑战赛', date: '2025-08-10', location: '西藏拉萨', fee: 1980, signups: 280, limit: 280, status: '已结束' },
])

const getStatusType = (status: string) => {
  const map: Record<string, string> = { '报名中': 'success', '进行中': 'warning', '已结束': 'info', '草稿': 'default', '已满员': 'danger' }
  return map[status] || 'info'
}

const resetFilter = () => {
  filterStatus.value = ''
  searchKeyword.value = ''
}
</script>

<style scoped>
.activity-admin { min-height: 100vh; background: #f0f4f8; }
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
