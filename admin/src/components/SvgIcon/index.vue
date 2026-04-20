<template>
  <svg :class="svgClass" v-bind="$attrs" :style="getStyle">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  size: {
    type: [Number, String],
    default: 16
  }
})

const iconName = computed(() => `#icon-${props.name}`)
const svgClass = computed(() => `svg-icon svg-icon-${props.name}`)
const getStyle = computed(() => {
  const { size } = props
  const s = typeof size === 'number' ? `${size}px` : size
  return {
    width: s,
    height: s
  }
})
</script>

<style scoped>
.svg-icon {
  fill: currentColor;
  outline: none;
}
</style>
