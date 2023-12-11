<template>
  <div class="views-main">
    <o-cascader
      :treeDataBase="dropdownData"
      @select-item="selectItem"
      @input-click="inputClick"
      @load-more="loadMore">
    </o-cascader>
  </div>
</template>

<script setup lang="ts">
import OCascader from '@/components/cascader/cascader.vue'
import { ref } from 'vue'

const dropdownData = ref([
  { keyId: 1, name: '选项1', children: [
    { keyId: 7, name: '选项2' },
    { keyId: 8, name: '选项2', children: [
      { keyId: 13, name: '选项2' },
      { keyId: 14, name: '选项2' },
      { keyId: 15, name: '选项2' },
    ]  },
    { keyId: 9, name: '选项2', children: [
      { keyId: 10, name: '选项2' },
      { keyId: 11, name: '选项2' },
      { keyId: 12, name: '选项2' },
    ] },
  ] },
  { keyId: 2, name: '选项2', children: [
    { keyId: 7, name: '选项2' },
    { keyId: 8, name: '选项2' },
    { keyId: 9, name: '选项2', children: [
      { keyId: 10, name: '选项2', children: [
        { keyId: 16, name: '选项2' },
        { keyId: 17, name: '选项2' },
      ] },
    ] },
  ]  },
  { keyId: 3, name: '选项3' },
  { keyId: 4, name: '选项4' },
  { keyId: 5, name: '选项5' },
  { keyId: 6, name: '选项6' },
])

const selectItem = () => {

}

const inputClick = () => {

}

const loadMore = () => {

}

</script>