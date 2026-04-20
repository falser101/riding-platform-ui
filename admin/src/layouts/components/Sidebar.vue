<template>
  <div class="sidebar-container">
    <div class="logo-container">
      <img src="@/assets/images/logo.png" alt="logo" class="logo" v-if="showLogo" />
      <span class="title" v-if="!isCollapse">{{ title }}</span>
    </div>
    <el-menu
      :default-active="activeMenu"
      :collapse="isCollapse"
      :background-color="variables.menuBg"
      :text-color="variables.menuText"
      :active-text-color="variables.menuActiveText"
      :unique-opened="false"
      :collapse-transition="false"
      mode="vertical"
    >
      <sidebar-item
        v-for="route in routes"
        :key="route.path"
        :item="route"
        :base-path="route.path"
      />
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import SidebarItem from './SidebarItem.vue'
import variables from '@/assets/styles/variables.scss'

defineProps({
  isCollapse: {
    type: Boolean,
    default: false
  },
  showLogo: {
    type: Boolean,
    default: true
  }
})

const title = '骑行平台'

const route = useRoute()
const activeMenu = computed(() => {
  const { path } = route
  return path
})

const routes = computed(() => {
  return route.matched.filter(item => item.children && item.children.length > 0)
})
</script>

<style lang="scss" scoped>
.sidebar-container {
  width: $sidebar-width;
  height: 100vh;
  background-color: $menuBg;
  overflow-x: hidden;
  overflow-y: auto;
  transition: width 0.3s;

  &:hover {
    overflow-x: auto;
  }
}

.logo-container {
  display: flex;
  align-items: center;
  height: $header-height;
  padding: 0 16px;

  .logo {
    width: 32px;
    height: 32px;
    margin-right: 12px;
  }

  .title {
    font-size: 16px;
    font-weight: 600;
    color: #fff;
    white-space: nowrap;
  }
}

:deep(.el-menu) {
  border: none;
  height: calc(100vh - 60px);
}
</style>
