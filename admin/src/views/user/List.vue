<template>
  <div class="user-list-container">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>用户列表</span>
        </div>
      </template>

      <div class="search-bar">
        <el-input
          v-model="searchForm.phone"
          placeholder="搜索手机号"
          style="width: 200px"
          clearable
        />
        <el-input
          v-model="searchForm.nickname"
          placeholder="搜索昵称"
          style="width: 200px; margin-left: 10px"
          clearable
        />
        <el-button type="primary" style="margin-left: 10px" @click="handleSearch">
          搜索
        </el-button>
        <el-button @click="handleReset">重置</el-button>
      </div>

      <el-table :data="tableData" stripe style="width: 100%; margin-top: 20px">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="phone" label="手机号" width="130">
          <template #default="{ row }">
            {{ formatPhone(row.phone) }}
          </template>
        </el-table-column>
        <el-table-column prop="nickname" label="昵称" width="120" />
        <el-table-column prop="avatar" label="头像" width="80">
          <template #default="{ row }">
            <el-avatar :src="row.avatar" :size="40">
              {{ row.nickname?.charAt(0) }}
            </el-avatar>
          </template>
        </el-table-column>
        <el-table-column prop="role" label="角色" width="100">
          <template #default="{ row }">
            <el-tag :type="row.role === 'admin' ? 'danger' : 'success'">
              {{ row.role === 'admin' ? '管理员' : '普通用户' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.status === 1 ? 'success' : 'danger'">
              {{ row.status === 1 ? '正常' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="注册时间" width="180">
          <template #default="{ row }">
            {{ formatDate(row.createTime) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="150">
          <template #default="{ row }">
            <el-button type="primary" link @click="handleView(row)">查看</el-button>
            <el-button type="primary" link @click="handleEdit(row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        v-model:current-page="pagination.page"
        v-model:page-size="pagination.pageSize"
        :total="pagination.total"
        :page-sizes="[10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        style="margin-top: 20px"
        @size-change="loadData"
        @current-change="loadData"
      />
    </el-card>

    <!-- 用户详情弹窗 -->
    <el-dialog v-model="detailVisible" title="用户详情" width="500px">
      <el-descriptions :column="2" border>
        <el-descriptions-item label="ID">{{ currentUser?.id }}</el-descriptions-item>
        <el-descriptions-item label="手机号">{{ currentUser?.phone }}</el-descriptions-item>
        <el-descriptions-item label="昵称">{{ currentUser?.nickname }}</el-descriptions-item>
        <el-descriptions-item label="角色">
          <el-tag :type="currentUser?.role === 'admin' ? 'danger' : 'success'">
            {{ currentUser?.role === 'admin' ? '管理员' : '普通用户' }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="状态">
          <el-tag :type="currentUser?.status === 1 ? 'success' : 'danger'">
            {{ currentUser?.status === 1 ? '正常' : '禁用' }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="注册时间">
          {{ formatDate(currentUser?.createTime) }}
        </el-descriptions-item>
      </el-descriptions>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { getUserList } from '@/api/modules/user'
import { formatPhone, formatDate } from '@/utils/format'
import { ElMessage } from 'element-plus'

const searchForm = reactive({
  phone: '',
  nickname: ''
})

const pagination = reactive({
  page: 1,
  pageSize: 10,
  total: 0
})

const tableData = ref<any[]>([])
const detailVisible = ref(false)
const currentUser = ref<any>(null)

// 模拟数据
const mockData = [
  { id: '1', phone: '13800138000', nickname: '骑行达人', avatar: '', role: 'user', status: 1, createTime: '2024-01-15T10:30:00Z' },
  { id: '2', phone: '13800138001', nickname: '骑行新手', avatar: '', role: 'user', status: 1, createTime: '2024-01-16T14:20:00Z' },
  { id: '3', phone: '13900139000', nickname: '管理员', avatar: '', role: 'admin', status: 1, createTime: '2024-01-01T00:00:00Z' }
]

const loadData = async () => {
  // 模拟加载数据
  tableData.value = mockData
  pagination.total = mockData.length
}

const handleSearch = () => {
  pagination.page = 1
  loadData()
}

const handleReset = () => {
  searchForm.phone = ''
  searchForm.nickname = ''
  loadData()
}

const handleView = (row: any) => {
  currentUser.value = row
  detailVisible.value = true
}

const handleEdit = (row: any) => {
  currentUser.value = row
  ElMessage.info('编辑功能开发中...')
}

onMounted(() => {
  loadData()
})
</script>

<style lang="scss" scoped>
.user-list-container {
  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .search-bar {
    display: flex;
    align-items: center;
  }
}
</style>
