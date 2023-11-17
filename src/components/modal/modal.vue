<template>
  <div class="modal-main" :class="{open: open}" ref="modalMainEl">
    <div class="animate__animated animate__fadeInUp modal" ref="modalEl" :style="{height: height, width: width}">
      <p class="modal-title" v-if="title">{{ title }}</p>
      <div class="modal-content">
        <slot/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, onMounted, ref, defineEmits, onBeforeUnmount } from 'vue';

defineProps({
  open: {
    type: Boolean,
    default: false
  },
  title: {
    type: String
  },
  height: {
    type: String,
    default: '200px'
  },
  width: {
    type: String,
    default: '85%'
  }
})

const emits = defineEmits(['close'])

const modalEl = ref()
const modalMainEl = ref()

onMounted(() => {
  modalMainEl.value.addEventListener('click', closeModal)
})

onBeforeUnmount(() => {
  modalMainEl.value.removeEventListener('click', closeModal)
})

const closeModal = (event: any) => {
  const e = event || window.event
  if (!modalEl.value.contains(e.target) && !modalEl.value.contains(e.target)) {
    emits('close')
  }
}
</script>

<style scoped lang="less">
.modal-main {
  height: 100vh;
  width: 100%;
  background: #0000004d;
  display: none;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  .modal {
    background: #fff;
    position: relative;
    animation-duration: 0.5s;
    .modal-title {
      height: 30px;
      color: #000;
      width: 100%;
      font-size: 16px;
      line-height: 30px;
      text-align: center;
    }
    .modal-content {
      height: 100%;
      width: 100%;
      position: relative;
    }
  }
}
.open {
  display: flex;
}
</style>