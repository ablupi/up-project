<template>
  <div class="views-main">
    <div class="tree-main">
      <o-tree 
        :tree-options="treeData"
        :padding="20"
        is-accordion
        @click-item="clickItem">
      </o-tree>
    </div>
  </div>
</template>

<script setup lang="ts">
import OTree from '@/components/tree/tree.vue'
import { ref } from 'vue'

// 创建数据
const treeData = ref([
  { key: 1, label: '选项1', children: [
    { key: 7, label: '选项2' },
    { key: 8, label: '选项2', children: [
      { key: 13, label: '选项2' },
      { key: 14, label: '选项2' },
      { key: 15, label: '选项2' },
    ]  },
    { key: 9, label: '选项2', children: [
      { key: 16, label: '选项2' },
      { key: 17, label: '选项2' },
      { key: 18, label: '选项2' },
    ] },
  ] },
  { key: 2, label: '选项2', children: [
    { key: 10, label: '选项2' },
    { key: 11, label: '选项2' },
    { key: 12, label: '选项2', children: [
      { key: 19, label: '选项2', children: [
        { key: 20, label: '选项2' },
        { key: 21, label: '选项2' },
      ] },
    ] },
  ]  },
  { key: 3, label: '选项3' },
  { key: 4, label: '选项4' },
  { key: 5, label: '选项5' },
  { key: 6, label: '选项6', children: [
    { key: 22, label: '选项2' },
    { key: 23, label: '选项2' },
    { key: 24, label: '选项2' },
    { key: 25, label: '选项2' },
    { key: 26, label: '选项2' },
    { key: 27, label: '选项2' },
  ] },
])

const clickItem = (item: any) => {
  console.log(item)
}

</script>

<style scoped lang="less">
.views-main::before {
  background-image: none;
}
.tree-main {
  /* height: 300px; */
  /* max-height: 250px; */
  // width: 200px;
  position: relative;
  height: 500px;
  // background: #fff;
}
</style>