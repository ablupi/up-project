<template>
  <div class="switch-main">
    <input 
      type="checkbox" 
      name="popup-checkbox" 
      :id="id" hidden 
      :checked="modelValue" 
      @change="change"
    />
    <label :for="id" class="open-spine-label" >
    </label>
    <div class="shade" v-if="disabled"></div>
  </div>

</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue'

defineProps({
  disabled: {
    type: Boolean,
    default: false
  },
  modelValue: Boolean
})

const emits = defineEmits(['update:modelValue', 'change'])

const id = computed(() => {
  return `swiper-${Math.random().toString(36).substr(2, 9)}`;
})

const change = (e: any) => {
  emits('change', e.target.checked)
}

</script>

<style scoped lang="less">
.switch-main {
  display: flex;
  overflow: hidden;
  position: relative;
  --off-color: #b4b4b4;
  input:checked + label {
    border-color: var(--theme);
    background: var(--theme);
    &::before {
      left: 20px;
    }
  }
  .open-spine-label {
    height: 20px;
    width: 40px;
    border: 2px solid var(--off-color);
    border-radius: 15px;
    position: relative;
    background: var(--off-color);
    transition: 0.4s;
    cursor: pointer;
    &::before {
      content: '';
      height: 20px;
      width: 20px;
      background: #fff;
      border-radius: 50%;
      position: absolute;
      left: 0;
      transition: 0.4s;
    }
  }
  .shade {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: #fff;
    border-radius: 15px;
    opacity: 0.3;
    cursor: not-allowed;
  }
}
</style>
