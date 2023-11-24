<template>
  <div class="drawer-box" ref="drawerBoxEl">
    <Transition name="background">
      <div v-if="open" class="drawer-background"></div>
    </Transition>
    <div 
      class="drawer" 
      ref="drawer"
      :class="[{'show-drawer': open}, placementStyle]">
      <slot/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  open: Boolean,
  placement: {
    type: String,
    default: 'right'
  }
})

const emits = defineEmits(['update:open'])

const drawer = ref()
const drawerBoxEl = ref()
const placementStyle = ref('placement-right')

onMounted(() => {
  drawerBoxEl?.value.addEventListener('click', clickOther)
  switch (props.placement) {
    case 'right':
      placementStyle.value = 'placement-right'
      break;
    case 'left':
      placementStyle.value = 'placement-left'
      break;
    default:
      break;
  }
})

onBeforeUnmount(() => {
  drawerBoxEl.value?.removeEventListener("click", clickOther);
});

const clickOther = (event: any) => {
  const e = event || window.event
  if (!drawer.value?.contains(e.target)) {
    emits('update:open', false)
  }
}

</script>

<style scoped lang="less">
.drawer-box {
  position: absolute;
  top: 0;
  left: 0;
  .drawer-background {
    position: absolute;
    height: 100vh;
    width: 100vw;
    background: #0000002f;
    transition: 0.4s;
  }
  .drawer {
    position: fixed;
    // right: 0;
    // transform: translateX(400px);
    width: 400px;
    height: 100vh;
    background: #fff;
    transition: 0.4s;
    display: flex;
  }
}
.placement-right {
  right: 0;
  transform: translate(400px);
}
.placement-left {
  left: 0;
  transform: translate(-400px);
}
.show-drawer {
  transform: translateX(0) !important;
}
.background-enter-active,
.background-leave-active {
  opacity: 1;
}
.background-enter-from,
.background-leave-to {
  opacity: 0;
}
</style>