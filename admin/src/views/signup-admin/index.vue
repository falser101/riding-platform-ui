<template>
  <div class="signup-admin">
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
          <h2>📋 报名管理</h2>
          <el-button type="success" @click="exportData">📥 导出Excel</el-button>
        </div>

        <!-- 筛选 -->
        <div class="filter-bar">
          <el-select v-model="filterActivity" placeholder="选择活动" style="width:220px;" clearable>
            <el-option label="2026 环青海湖国际骑行挑战赛" value="qhzth" />
            <el-option label="2026 暑期亲子骑行夏令营" value="qzxly" />
            <el-option label="2026 春季高原骑行邀请赛" value="cygj" />
            <el-option label="" value="all" />
          </el-select>
          <el-select v-model="filterStatus" placeholder="报名状态" style="width:140px;" clearable>
            <el-option label="全部" value="" />
            <el-option label="待支付" value="pending" />
            <el-option label="已支付" value="paid" />
            <el-option label="已核销" value="checked" />
            <el-option label="已取消" value="cancelled" />
          </el-select>
          <el-date-picker v-model="dateRange" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" style="width:240px;" />
          <el-input v-model="searchKeyword" placeholder="搜索姓名/手机/编号" style="width:180px;" clearable />
          <el-button @click="resetFilter">重置</el-button>
        </div>

        <!-- 表格 -->
        <div class="table-panel">
          <el-table :data="signups" border stripe>
            <el-table-column prop="id" label="报名编号" width="160" />
            <el-table-column prop="name" label="姓名" width="90" />
            <el-table-column prop="phone" label="手机号" width="120" />
            <el-table-column prop="activity" label="活动名称" min-width="200" />
            <el-table-column prop="payTime" label="支付时间" width="160" />
            <el-table-column prop="fee" label="费用" width="80">
              <template #default="{ row }">¥{{ row.fee }}</template>
            </el-table-column>
            <el-table-column label="状态" width="100">
              <template #default="{ row }">
                <el-tag :type="getStatusType(row.status)" size="small">{{ row.status }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="160" fixed="right">
              <template #default="{ row }">
                <el-button v-if="row.status === '已支付'" size="small" type="success">核销签到</el-button>
                <el-button v-else size="small" type="primary">详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <!-- 分页 -->
        <div class="pagination">
          <el-pagination
            v-model:current-page="currentPage"
            :page-size="10"
            :total="128"
            layout="total, prev, pager, next"
          />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeMenu = ref('/signup-admin')
const filterActivity = ref('')
const filterStatus = ref('')
const dateRange = ref([])
const searchKeyword = ref('')
const currentPage = ref(1)

const signups = ref([
  { id: 'RB20260420001', name: '李明', phone: '138****6789', activity: '2026 环青海湖国际骑行挑战赛', payTime: '2026-04-20 09:25', fee: 1680, status: '待支付' },
  { id: 'RB20260420002', name: '王芳', phone: '139****1234', activity: '2026 暑期亲子骑行夏令营', payTime: '-', fee: 2980, status: '待审核' },
  { id: 'RB20260419015', name: '张伟', phone: '136****5678', activity: '2026 环青海湖国际骑行挑战赛', payTime: '2026-04-19 19:00', fee: 1680, status: '已支付' },
  { id: 'RB20260419014', name: '刘强', phone: '137****9012', activity: '2026 春季高原骑行邀请赛', payTime: '2026-04-19 17:30', fee: 880, status: '已核销' },
  { id: 'RB20260419013', name: '陈静', phone: '135****3456', activity: '"骑向未来"亲子骑行活动', payTime: '2026-04-19 15:00', fee: 0, status: '已支付' },
  { id: 'RB20260418009', name: '周磊', phone: '158****7890', activity: '2026 环青海湖国际骑行挑战赛', payTime: '2026-04-18 20:00', fee: 1680, status: '已核销' },
  { id: 'RB20260418008', name: '吴霞', phone: '159****2345', activity: '2026 暑期亲子骑行夏令营', payTime: '-', fee: 2980, status: '已取消' },
])

const getStatusType = (status: string) => {
  const map: Record<string, string> = { '待支付': 'warning', '待审核': 'info', '已支付': 'success', '已核销': 'success', '已取消': 'danger' }
  return map[status] || 'info'
}

const exportData = () => {}
const resetFilter = () => {
  filterActivity.value = ''
  filterStatus.value = ''
  dateRange.value = []
  searchKeyword.value = ''
}
</script>

<style scoped>
.signup-admin { min-height: 100vh; background: #f0f4f8; }
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
.filter-bar { background: white; padding: 16px; border-radius: 8px; margin-bottom: 16px; display: flex; gap: 12px; align-items: center; flex-wrap: wrap; }
.table-panel { background: white; border-radius: 12px; padding: 16px; }
.pagination { display: flex; justify-content: flex-end; margin-top: 16px; }
</style>
