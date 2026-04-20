<template>
  <div class="dashboard">
    <!-- 顶部导航 -->
    <div class="topbar">
      <div class="topbar-left">
        <span class="logo">🚴</span>
        <span class="title">骑行平台管理后台</span>
      </div>
      <div class="topbar-right">
        <el-dropdown>
          <span class="user-info">
            <span class="avatar">👤</span>
            <span>管理员</span>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>个人信息</el-dropdown-item>
              <el-dropdown-item>修改密码</el-dropdown-item>
              <el-dropdown-item divided>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>

    <div class="dashboard-body">
      <!-- 左侧菜单 -->
      <aside class="sidebar">
        <el-menu :default-active="activeMenu" class="sidebar-menu" router>
          <el-menu-item index="/dashboard">
            <span>📊</span><span>工作台</span>
          </el-menu-item>
          <el-menu-item index="/activity-admin">
            <span>🏆</span><span>活动管理</span>
          </el-menu-item>
          <el-menu-item index="/signup-admin">
            <span>📋</span><span>报名管理</span>
          </el-menu-item>
          <el-menu-item index="/store-admin">
            <span>📍</span><span>门店管理</span>
          </el-menu-item>
          <el-menu-item index="/user-admin">
            <span>👥</span><span>用户管理</span>
          </el-menu-item>
          <el-menu-item index="/charity-admin">
            <span>❤️</span><span>公益管理</span>
          </el-menu-item>
          <el-menu-item index="/settings">
            <span>⚙️</span><span>系统设置</span>
          </el-menu-item>
        </el-menu>
      </aside>

      <!-- 右侧内容 -->
      <main class="main-content">
        <!-- 统计卡片 -->
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon" style="background:#e6f7ff;color:#1a5f9e;">🏆</div>
            <div class="stat-info">
              <div class="stat-value">12</div>
              <div class="stat-label">进行中活动</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon" style="background:#fff7e6;color:#f5a623;">📋</div>
            <div class="stat-info">
              <div class="stat-value">1,286</div>
              <div class="stat-label">总报名人数</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon" style="background:#f6ffed;color:#52c41a;">👥</div>
            <div class="stat-info">
              <div class="stat-value">4,521</div>
              <div class="stat-label">注册用户</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon" style="background:#fff0f0;color:#ff4d4f;">💰</div>
            <div class="stat-info">
              <div class="stat-value">¥286,480</div>
              <div class="stat-label">累计报名收入</div>
            </div>
          </div>
        </div>

        <!-- 待处理报名 -->
        <div class="panel">
          <div class="panel-header">
            <h3>⏰ 待处理报名</h3>
            <el-button size="small" type="primary">查看全部</el-button>
          </div>
          <el-table :data="pendingList" size="small">
            <el-table-column prop="id" label="报名编号" width="140" />
            <el-table-column prop="name" label="姓名" width="100" />
            <el-table-column prop="activity" label="活动名称" />
            <el-table-column prop="time" label="报名时间" width="120" />
            <el-table-column label="状态" width="100">
              <template #default="{ row }">
                <el-tag :type="row.status === '待支付' ? 'warning' : 'success'" size="small">{{ row.status }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="120">
              <template #default>
                <el-button size="small" type="primary">审核</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <!-- 最近活动 -->
        <div class="panel">
          <div class="panel-header">
            <h3>🏃 最近活动</h3>
            <el-button size="small">新建活动</el-button>
          </div>
          <el-table :data="recentActivities" size="small">
            <el-table-column prop="name" label="活动名称" />
            <el-table-column prop="date" label="活动时间" width="120" />
            <el-table-column prop="location" label="地点" width="140" />
            <el-table-column label="报名/限额" width="100">
              <template #default="{ row }">{{ row.signups }}/{{ row.limit }}</template>
            </el-table-column>
            <el-table-column label="状态" width="100">
              <template #default="{ row }">
                <el-tag :type="row.statusType" size="small">{{ row.status }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="140">
              <template #default>
                <el-button size="small" type="primary">管理</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeMenu = ref('/dashboard')

const pendingList = ref([
  { id: 'RB20260420001', name: '李明', activity: '2026环青海湖国际骑行挑战赛', time: '2026-04-20 09:23', status: '待支付' },
  { id: 'RB20260420002', name: '王芳', activity: '2026暑期亲子骑行夏令营', time: '2026-04-20 08:45', status: '待审核' },
  { id: 'RB20260419015', name: '张伟', activity: '2026环青海湖国际骑行挑战赛', time: '2026-04-19 18:30', status: '已通过' },
  { id: 'RB20260419014', name: '刘强', activity: '2026春季高原骑行邀请赛', time: '2026-04-19 16:20', status: '待支付' },
  { id: 'RB20260419013', name: '陈静', activity: '"骑向未来"亲子骑行活动', time: '2026-04-19 14:05', status: '已通过' },
])

const recentActivities = ref([
  { name: '2026 环青海湖国际骑行挑战赛', date: '2026-07-15', location: '青海西宁', signups: 386, limit: 500, status: '报名中', statusType: 'success' },
  { name: '2026 暑期亲子骑行夏令营', date: '2026-07-20', location: '青海湖', signups: 45, limit: 60, status: '报名中', statusType: 'success' },
  { name: '2026 春季高原骑行邀请赛', date: '2026-04-05', location: '四川康定', signups: 120, limit: 120, status: '已满员', statusType: 'warning' },
  { name: '2025 拉萨国际自行车挑战赛', date: '2025-08-10', location: '西藏拉萨', signups: 280, limit: 280, status: '已结束', statusType: 'info' },
])
</script>

<style scoped>
.dashboard { min-height: 100vh; background: #f0f4f8; }
.topbar { height: 60px; background: white; border-bottom: 1px solid #eee; display: flex; align-items: center; justify-content: space-between; padding: 0 20px; position: sticky; top: 0; z-index: 100; }
.topbar-left { display: flex; align-items: center; gap: 10px; }
.logo { font-size: 24px; }
.title { font-size: 16px; font-weight: 600; color: #1a5f9e; }
.topbar-right { display: flex; align-items: center; gap: 16px; }
.user-info { display: flex; align-items: center; gap: 6px; cursor: pointer; font-size: 14px; }
.avatar { font-size: 20px; }
.dashboard-body { display: flex; }
.sidebar { width: 200px; background: white; min-height: calc(100vh - 60px); border-right: 1px solid #eee; }
.sidebar-menu { border: none; }
.sidebar-menu span { margin-right: 8px; }
.main-content { flex: 1; padding: 20px; }
.stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 20px; }
.stat-card { background: white; border-radius: 12px; padding: 20px; display: flex; align-items: center; gap: 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
.stat-icon { width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 24px; }
.stat-value { font-size: 24px; font-weight: 700; color: #333; }
.stat-label { font-size: 13px; color: #999; margin-top: 4px; }
.panel { background: white; border-radius: 12px; padding: 16px; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
.panel-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
.panel-header h3 { font-size: 16px; font-weight: 600; }
</style>
