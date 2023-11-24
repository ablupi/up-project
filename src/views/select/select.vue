<template>
  <div class="views-main">
    <o-select 
      :data="selectData"
      v-model="selectValue"
      @select="select"
      @input="input"
      show-search>
    </o-select>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import OSelect from '@/components/select/select.vue'

const originData = [
  { key: 1, text: '测试长选项测试长选项测试长选项' },
  { key: 2, text: '选项2' },
  { key: 3, text: '选项3' },
  { key: 4, text: '选项4' },
  { key: 5, text: '选项5' },
  { key: 6, text: '选项6' },
  { key: 7, text: '选项7' },
]

const selectData = ref(JSON.parse(JSON.stringify(originData)))
const selectValue = ref(1)

const select = () => {
  console.log(selectValue.value)
}

const input = (value: string) => {
  console.log(value)
  selectData.value = originData.filter(p => p.text.includes(value))
}
</script>

<style scoped lang="less">

</style>