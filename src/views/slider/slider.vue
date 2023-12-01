<template>
  <div class="views-main">
    <o-slider 
      v-model="sliderValue"
      @input="sliderInput"
      @change="sliderChange"
    />
    <div class="binning">{{ sliderValue }}</div>
  </div>

</template>

<script setup lang="ts">
import OSlider from '@/components/slider/slider.vue'
import { ref } from 'vue'

const sliderValue = ref(20)

const sliderInput = (value: number) => {
  console.log(value)
}

const sliderChange = (value: number) => {
  console.log(value)
}

</script>

<style scoped lang="less">
.binning {
  height: 30px;
  width: 80px;
  border-radius: 6px;
  border: 1px solid var(--theme);
  text-align: center;
  font-size: 16px;
  line-height: 30px;
  background: #ececec;
  margin-left: 20px;
}
</style>