<template>
  <div class="views-main">
    <o-pagination
      :page="page"
      @data-prev="dataPrev"
      @data-next="dataNext"
      @navi-change="naviChange"
      @to-page="toPage"
    >
    </o-pagination>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import OPagination from '@/components/pagination/pagination.vue'

// 具体字段名要看后端列表接口的分页字段
interface Page {
  limit?: number,
  max_count: number,
  max_page: number,
  page_count: number
}

let page = reactive<Page>({
  limit: 8,
  max_count: 30,
  max_page: 4,
  page_count: 1
})

const dataPrev = () => {

}

const dataNext = () => {

}

const naviChange = () => {
  
}
const toPage = () => {
  
}

</script>

<style lang="less" scoped>
</style>
