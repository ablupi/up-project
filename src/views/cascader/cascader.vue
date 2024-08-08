<template>
  <div class="views-main">
    <o-cascader
      :tree-select-data="dropdownData"
      v-model:expanded-keys="expandedKeys"
      v-model="checkValue"
      @select-item="selectItem"
      @expand="expand">
    </o-cascader>
  </div>
</template>

<script setup lang="ts">
import OCascader, { TreeSelectOption } from '@/components/cascader/cascader.vue'
import { ref } from 'vue'

// 创建虚拟数据
const dropdownData = ref<Array<TreeSelectOption>>([
  { key: 1, label: '选项1', children: [
    { key: 7, label: '选项2', children: [
      { key: 13, label: '选项3' },
      { key: 14, label: '选项3' },
      { key: 15, label: '选项3' },
    ]  },
    { key: 8, label: '选项2'},
    { key: 9, label: '选项2', children: [
      { key: 16, label: '选项3' },
      { key: 17, label: '选项3' },
      { key: 18, label: '选项3' },
    ] },
  ] },
  { key: 2, label: '选项2', children: [
    { key: 10, label: '选项2' },
    { key: 11, label: '选项2' },
    { key: 12, label: '选项2', children: [
      { key: 19, label: '选项3', children: [
        { key: 20, label: '选项4' },
        { key: 21, label: '选项4' },
      ] },
      { key: 28, label: '选项3' }
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
const expandedKeys = ref([1, 7, 13])
const checkValue = ref(13)

const selectItem = (value: any) => {
  const { item, expandeds } = value
  console.log(item)
  console.log(expandeds)
}

const expand = () => {
  console.log(expandedKeys.value)
}

</script>