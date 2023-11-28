<template>
  <div class="views-main">
    <div class="views-item">
      <p>常用开关：</p>
      <p>禁用开关：</p>
    </div>
    <div class="views-item">
      <o-switch v-model="switch1" @change="switchChange"></o-switch>
      <o-switch v-model="switch2" :disabled="true"></o-switch>
    </div>
    
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import OSwitch from '@/components/switch/switch.vue'

const switch1 = ref(false)
const switch2 = ref(false)

const switchChange = (value: boolean) => {
  console.log(value)
}
</script>

<style scoped lang="less">
.views-item {
  display: grid;
  grid-row-gap: 15px;
  text-align: center;
  & > p {
    color: #000000c0;
  }
}
</style>