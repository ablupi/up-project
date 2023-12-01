<template>
    <input 
      type="range" 
      class="slider"
      :min="min" 
      :max="max" 
      :value="modelValue" 
      ref="sliderEl" 
      @input="input"
      @change="change"
      :style="{backgroundSize: `${leftSize}% 100%`}"
    />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

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
  emits('change', props.modelValue)
}

const calcSlider = () => {
  leftSize.value = (sliderEl.value.value - sliderEl.value.min)/(sliderEl.value.max - sliderEl.value.min)*100
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
  &::-ms-thumb {
    background: var(--theme);
  }
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
  &::-moz-range-thumb {
    background: var(--theme);
  }
}
</style>
