<template>
  <input 
    type="range"
    class="slider"
    ref="sliderEl"
    :value="modelValue"
    :min="min"
    :max="max"
    @input="input"
    @change="change"
    :style="{ backgroundSize: `${leftSize}% 100%` }"
  />
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps, defineEmits } from 'vue'

const props = defineProps({
  modelValue: Number,
  min: {
    type: Number,
    default: 0
  },
  max: {
    type: Number,
    default: 100
  }
})

const emits = defineEmits(['update:modelValue', 'input', 'change'])

const sliderEl = ref()
const leftSize = ref(100)

onMounted(() => {
  calcSlider()
})

const input = (e: any) => {
  calcSlider()
  emits('update:modelValue', parseInt(e.target.value))
  emits('input', props.modelValue)
}

const change = (e: any) => {
  emits('update:modelValue', parseInt(e.target.value))
  emits('input', props.modelValue)
}

const calcSlider = () => {
  const slider = sliderEl.value
  leftSize.value = (slider.value - slider.min) / (slider.max - slider.min) * 100
}
</script>

<style scoped lang="less">
.slider {
  -webkit-appearance: none;
  width: 200px;
  height: 8px;
  background: -webkit-linear-gradient(var(--theme), var(--theme)) no-repeat #ececec;
  background-size: 15% 100%;
  border-radius: 4px;
  cursor: pointer;
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    background: var(--theme);
    height: 15px;
    width: 15px;
    border-radius: 50%;
    transition: .4s;
    &:hover {
      transform: scale(1.2);
    }
  }
  &::-ms-thumb {
    border: none;
  }
  // 适配不同浏览器
  &::-moz-range-thumb {
    border: none;
    background: var(--theme);
    height: 15px;
    width: 15px;
    border-radius: 50%;
    transition: .4s;
    &:hover {
      transform: scale(1.2);
    }
  }
}
</style>