<template>
  <el-menu-item :index="resolvePath(item.path)" @click="handleLink">
    <svg-icon v-if="item.meta?.icon" :name="item.meta.icon" />
    <template #title>
      <span v-if="item.meta?.title">{{ item.meta.title }}</span>
    </template>
  </el-menu-item>
</template>

<script setup lang="ts">
import { RouteRecordRaw } from 'vue-router'

const props = defineProps({
  item: {
    type: Object as () => RouteRecordRaw,
    required: true
  },
  basePath: {
    type: String,
    default: ''
  }
})

const resolvePath = (routePath: string) => {
  if (routePath.startsWith('http')) {
    return routePath
  }
  if (routePath.startsWith('/')) {
    return routePath
  }
  return `${props.basePath}/${routePath}`.replace(/\/+/g, '/')
}

const handleLink = () => {
  const path = resolvePath(props.item.path)
  // 使用 router.push 进行导航
}
</script>
