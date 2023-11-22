<template>
  <div class="views-main">
    <o-tooltip placement="top">
      <div class="btn-1">消息提示-朝上</div>
      <template #tooltip>
        <p class="msg">消息提示</p>
      </template>
    </o-tooltip>
    <o-tooltip placement="right">
      <div class="btn-1">消息提示-朝右</div>
      <template #tooltip>
        <p class="msg">消息提示</p>
      </template>
    </o-tooltip>
    <o-tooltip  placement="bottom">
      <div class="btn-1">消息提示-朝下</div>
      <template #tooltip>
        <p class="msg">消息提示</p>
      </template>
    </o-tooltip>
    <o-tooltip placement="left">
      <div class="btn-1">消息提示-朝左</div>
      <template #tooltip>
        <p class="msg">消息提示</p>
      </template>
    </o-tooltip>
  </div>
</template>

<script setup lang="ts">
import OTooltip from '@/components/tooltip/tooltip.vue'
</script>

<style scoped lang="less">
.tooltip-view-main {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  
}
  .msg {
    white-space: nowrap;
  }
</style>
