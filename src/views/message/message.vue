<template>
  <div class="views-main">
    <button @click="success">成功</button>
    <button @click="warning">警告</button>
    <button @click="error">错误</button>
  </div>
</template>

<script setup lang="ts">
import msg from '@/components/msg/msg.ts'

const success = () => {
  // 消息提示，显示时间，回调函数
  msg.success('提交成功', 2, () => {
    console.log('2秒之后调用此函数')
  })
}

const warning = () => {
  msg.warning('警告消息')
}

const error = () => {
  msg.error('发生错误！')
}
</script>

<style scoped lang="less">
.message-main {
  background: #d3d3d3;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
