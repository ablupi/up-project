<template>
  <div class="views-main">
    <o-pagination
      :page="page"
      @data-prev="dataPrev"
      @data-next="dataNext"
      @to-page="toPage"
      @paging-change="pagingChange"
      @select-change="selectChange"
      show-size>
    </o-pagination>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import OPagination, { Page } from '@/components/pagination/pagination.vue'

const page = reactive<Page>({
  limit: 10,
  count: 150,
  page: 15,
  current: 1
})

const dataPrev = () => {
  page.current = page.current - 1
}

const dataNext = () => {
  page.current = page.current + 1
}

const toPage = (count: number) => {
  page.current = count
}

const pagingChange = (count: number) => {
  page.current = count
}

const selectChange = (limit: number) => {
  page.limit = limit
  page.page = Math.ceil(page.count / page.limit)
  page.current = 1
}

</script>

<style lang="less" scoped>
</style>
