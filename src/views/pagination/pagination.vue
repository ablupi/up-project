<template>
  <div class="views-main">
    <o-pagination
      v-model:page-size="pageSize"
      :page="page"
      @data-prev="dataPrev"
      @data-next="dataNext"
      @navi-change="naviChange"
      @to-page="toPage"
      show-size
    >
    </o-pagination>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import OPagination, { Page } from '@/components/pagination/pagination.vue'

let page = reactive<Page>({
  limit: 8,
  max_count: 30,
  max_page: 15,
  page_count: 1
})

const pageSize = ref('5')

const dataPrev = () => {
  page.page_count = page.page_count - 1
}

const dataNext = () => {
  page.page_count = page.page_count + 1
}

const naviChange = (pageCount: number) => {
  page.page_count = pageCount
}
const toPage = (count: number) => {
  page.page_count = count

}

</script>

<style lang="less" scoped>
</style>
