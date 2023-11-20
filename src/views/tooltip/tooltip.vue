<template>
  <div class="tooltip-view-main">
    <o-tooltip placement="top">
      <div class="tooltip-button">消息提示-朝上</div>
      <template #tooltip>
        <p class="msg">消息提示</p>
      </template>
    </o-tooltip>
    <o-tooltip placement="right">
      <div class="tooltip-button">消息提示-朝右</div>
      <template #tooltip>
        <p class="msg">消息提示</p>
      </template>
    </o-tooltip>
    <o-tooltip  placement="bottom">
      <div class="tooltip-button">消息提示-朝下</div>
      <template #tooltip>
        <p class="msg">消息提示</p>
      </template>
    </o-tooltip>
    <o-tooltip placement="left">
      <div class="tooltip-button">消息提示-朝左</div>
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
  .tooltip-button {
    background: var(--theme);
    height: 30px;
    padding: 0 8px;
    margin: 0 8px;
    box-sizing: border-box;
    line-height: 30px;
    border-radius: 5px;
    color: #fff;
  }
  .msg {
    white-space: nowrap;
  }
}
</style>
