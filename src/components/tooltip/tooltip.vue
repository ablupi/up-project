<template>
  <button class="tooltip-main" ref="content">
    <div 
      class="animate__animated tooltip"
      :class="[state.animate]"
      :style="{
        top: state.top,
        right: state.right,
        bottom: state.bottom,
        left: state.left
      }">
      <slot name="tooltip"/>
    </div>
    <slot/>
  </button>
</template>

<script setup lang="ts">
import { defineProps, onMounted, reactive, ref } from 'vue';

const props = defineProps({
  placement: {
    type: String,
    default: 'top'
  }
})

const state = reactive({
  animate: 'animate__fadeInUp',
  top: '',
  right: '',
  bottom: '',
  left: ''
})

const content = ref()

onMounted(() => {
  const contentEl = content.value.lastElementChild
  switch (props.placement) {
    case 'top':
      state.animate = 'animate__fadeInUp'
      state.bottom = `${contentEl.offsetHeight + 20}px`
      break;
    case 'right':
      state.animate = 'animate__fadeInLeft'
      state.left = `${contentEl.offsetWidth + 20}px`
      break;
    case 'bottom':
      state.animate = 'animate__fadeInDown'
      state.top = `${contentEl.offsetHeight + 20}px`
      break;
    case 'left':
      state.animate = 'animate__fadeInRight'
      state.right = `${contentEl.offsetWidth + 20}px`
      break;
    default:
      break;
  }
})
</script>

<style scoped lang="less">
.tooltip-main {
  outline: none;
  border: none;
  background: none;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  &:focus {
    .tooltip {
      display: flex;
    }
  }
}
.tooltip {
  border-radius: 27px;
  position: absolute;
  background: #24252733;
  padding: 10px;
  box-sizing: border-box;
  transition: .4s;
  display: none;
  animation-duration: .5s;
  z-index: 99;
}
</style>