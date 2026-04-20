<template>
  <div class="hamburger" @click="handleClick">
    <svg-icon :name="isActive ? 'hamburger-opened' : 'hamburger-closed'" />
  </div>
</template>

<script setup lang="ts">
defineProps({
  isActive: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['toggle'])
const handleClick = () => {
  emit('toggle')
}
</script>

<style scoped>
.hamburger {
  display: flex;
  align-items: center;
  padding: 0 12px;
  cursor: pointer;
}
</style>
