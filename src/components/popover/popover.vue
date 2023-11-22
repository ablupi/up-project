<template>
  <button 
    class="popover-main" 
    ref="el"
    @focus="show = true"
    @blur="show = false">
    <Transition name="popover">
      <div 
        v-if="show" 
        class="popover-content"
        :class="[state.placement]"
        :style="{
          top: state.top,
          right: state.right,
          bottom: state.bottom,
          left: state.left
        }">
        <slot name="content"/>
      </div>
    </Transition>
    <slot/>
  </button>
</template>

<script setup lang="ts">
import { ref, defineProps, reactive, onMounted } from 'vue'

const props = defineProps({
  placement: {
    type: String,
    default: 'top'
  }
})

const state = reactive({
  placement: 'popover-content-top',
  top: '',
  right: '',
  bottom: '',
  left: ''
})

const el = ref()
const show = ref(false)

onMounted(() => {
  const contentEl = el.value.lastElementChild
  switch (props.placement) {
    case 'top':
      state.placement = 'popover-content-top'
      state.bottom = `${contentEl.offsetHeight + 20}px`
      break;
    case 'right':
      state.placement = 'popover-content-right'
      state.left = `${contentEl.offsetWidth + 25}px`
      break;
    case 'bottom':
      state.placement = 'popover-content-bottom'
      state.top = `${contentEl.offsetHeight + 20}px`
      break;
    case 'left':
      state.placement = 'popover-content-left'
      state.right = `${contentEl.offsetWidth + 25}px`
      break;
    default:
      break;
  }
})
</script>

<style scoped lang="less">
.popover-main {
  outline: none;
  border: none;
  background: none;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  .popover-content {
    box-shadow: 0 0 5px #b3b3b3;
    min-height: 60px;
    min-width: 140px;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
    border-radius: 5px;
    transition: .6s;
    z-index: 99;
    &::before {
      content: "";
      height: 20px;
      width: 20px;
      box-sizing: border-box;
      position: absolute;
      box-shadow: 2px -2px 5px -2px #b3b3b3;
      background: #fff;
    }
  }
  .popover-content-top {
    &::before {
      bottom: -10px;
      transform: rotate(135deg);
    }
  }
  .popover-content-right {
    &::before {
      left: -10px;
      transform: rotate(225deg);
    }
  }
  .popover-content-bottom {
    &::before {
      top: -10px;
      transform: rotate(-45deg);
    }
  }
  .popover-content-left {
    &::before {
      right: -10px;
      transform: rotate(45deg);
    }
  }
}
.popover-enter-active,
.popover-leave-active {
  opacity: 1;
}
.popover-enter-from,
.popover-leave-to {
  opacity: 0;
}
</style>