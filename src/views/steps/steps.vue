<template>
  <div class="views-main">
    <o-steps :items="stepsItems" :current="stepsCurrent" direction="horizontal">
    </o-steps>
    <div style="height: 100px;"></div>
    <div class="btn-layout">
      <button @click="stepsCurrent = 'Cart'"> 步骤一</button>
      <button @click="stepsCurrent = 'Pay'"> 步骤二</button>
      <button @click="stepsCurrent = 'OrderResult'"> 步骤三</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import OSteps, { StepsOption } from '@/components/steps/steps.vue'
import { ref } from 'vue'

const stepsItems = ref<Array<StepsOption>>([
  { title: '我的购物车', key: 'Cart' },
  { title: '填写核对订单', key: 'Pay' },
  { title: '成功提交订单', key: 'OrderResult' },
])

const stepsCurrent = ref('Cart')
</script>

<style lang="less" scoped>
.views-main {
  flex-direction: column;
  .btn-layout {
    display: flex;
    gap: 15px;
  }
}
</style>