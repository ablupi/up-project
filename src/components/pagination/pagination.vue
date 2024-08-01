<template>
  <div class="pagination">
    <button class="paging-count" :class="{ 'paging-slide-not': page.current === 1 }" @click="dataPrev">
      上一页
    </button>
    <div class="paging-child" v-if="page.page < 10">
      <div v-for="count in page.page" :key="count">
        <input type="radio" name="pagination" :id="`paging${count}`" hidden :checked="count === page.current"
          @change="pagingChange(count)">
        <label :for="`paging${count}`" class="paging-count">{{ count }}</label>
      </div>
    </div>
    <div class="paging-child" v-else-if="page.page >= 10 && page.current < 5">
      <div v-for="count in 5" :key="count">
        <input type="radio" name="pagination" :id="`paging${count}`" hidden :checked="count === page.current"
          @change="pagingChange(count)">
        <label :for="`paging${count}`" class="paging-count">{{ count }}</label>
      </div>
      <div class="paging-count">···</div>
      <div class="paging-count" @click="emits('toPage', page.page)">{{ page.page }}</div>
    </div>
    <div class="paging-child" v-else-if="page.page >= 10 && page.current < page.page - 3">
      <div class="paging-count" @click="emits('toPage', 1)">1</div>
      <div class="paging-count">···</div>
      <div v-for="count in 5" :key="count">
        <div :for="`paging${count}`" class="paging-count"
          :class="{ 'div-checked': page.page + count - 3 === page.page }"
          @click="pagingChange(page.current + count - 3)">{{ page.current + count - 3 }}</div>
      </div>
      <div class="paging-count">···</div>
      <div class="paging-count" @click="emits('toPage', page.page)">{{ page.page }}</div>
    </div>
    <div class="paging-child" v-else-if="page.page >= 10 && page.current >= page.page - 3">
      <div class="paging-count" @click="emits('toPage', 1)">1</div>
      <div class="paging-count">···</div>
      <div v-for="count in 5" :key="count">
        <input type="radio" name="pagination" :id="`paging${count}`" hidden
          :checked="page.page + count - 5 === page.current" @change="pagingChange(page.page + count - 5)">
        <label :for="`paging${count}`" class="paging-count">{{ page.page + count - 5 }}</label>
      </div>
    </div>
    <button class="paging-count" :class="{ 'paging-slide-not': page.current === page.page || page.page === 0 }"
      @click="dataNext">
      下一页
    </button>
    <div class="search-layout">
      <p>前往</p>
      <div class="paging-count count-input">
        <form @submit.prevent="toPage">
          <input type="text" v-model="searchText">
        </form>
      </div>
      <p>页</p>
    </div>
    <o-tree-select :tree-select-data="treeData" v-model="page.limit" @select-item="selectItem" is-menu
      class="select-reset"></o-tree-select>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, withDefaults, ref, computed } from 'vue';
import OTreeSelect, { TreeSelectOption } from '@/components/treeSelect/treeSelect.vue'

export interface Page {
  limit: number
  count: number
  page: number
  current: number
}

interface Props {
  page: Page
  showSize: boolean
  pageSizeOptions?: number[]
}

const props = withDefaults(defineProps<Props>(), {
  page: () => ({
    limit: 10,    // 每页数量
    count: 0,     // 总计
    page: 0,      // 总页数
    current: 1    // 当前页
  }),
  showSize: false,
  pageSizeOptions: () => [10, 20, 30, 40]
})

const emits = defineEmits([
  'dataPrev',       // 上一页
  'pagingChange',   // 页码改变事件
  'dataNext',       // 下一页
  'toPage',         // 页面跳转
  'selectChange'    // 每页数量改变事件
])

const searchText = ref('1')

const treeData = computed<Array<TreeSelectOption>>(() => {
  return props.pageSizeOptions.map(item => {
    return { key: item, label: `${item} 条/页` }
  })
})

const pagingChange = (count: number) => {
  emits('pagingChange', count)
}

const dataPrev = () => {
  if (props.page.current != 1)
    emits('dataPrev')
}

const dataNext = () => {
  if (props.page.current != props.page.page)
    emits('dataNext')
}

const toPage = () => {
  const count = parseInt(searchText.value)
  if (!count || count > props.page.page) return
  emits('toPage', count)
}

const selectItem = () => {
  emits('selectChange', props.page.limit)
}

</script>

<style lang="less" scoped>
.pagination {
  display: flex;
  align-items: center;
  margin: 40px 0;
  gap: 9px;
  align-self: center;

  .paging-child {
    display: flex;
    gap: 9px;
  }

  .paging-count {
    height: 32px;
    min-height: 32px;
    background: #fff;
    font-size: 14px;
    color: var(--font-color);
    line-height: 30px;
    padding: 0 12px;
    box-shadow: border-box;
    cursor: pointer;
    transition: .4s;
    display: block;
    border-radius: 4px;
    border: 1px solid #e1e1e1;
    text-wrap: nowrap;

    &:hover {
      border-color: var(--theme);
      color: var(--theme);
    }
  }

  input:checked+label,
  .div-checked {
    background: var(--theme);
    color: #fff;

    &:hover {
      color: #fff;
      border-color: #e1e1e1;
    }
  }

  p {
    font-size: 14px;
    color: var(--font-color);
    line-height: 14px;
    text-wrap: nowrap;
  }

  .paging-slide-not {
    background: #dddddd;
    cursor: not-allowed;
    border-color: #dddddd !important;
    color: var(--font-color) !important;
  }

  .count-input {
    width: 36px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    margin: 0 6px;

    input {
      background: none;
      border: none;
      outline: none;
      height: 100%;
      font-size: 16px;
      color: var(--font-color);
      line-height: 36px;
      width: 20px;
      text-align: center;
    }
  }

  .search-layout {
    display: flex;
    align-items: center;
    margin-left: 12px
  }

  .select-reset {
    width: 100px;
    margin-left: 12px;
    & /deep/ .input-main {
      border: 1px solid #e1e1e1;
      .select-layout p {
        color: var(--font-color);
      }
    }
    & /deep/ .tree-main {
      .title-menu > p {
        color: var(--font-color);
      }
    }
  }
}
</style>