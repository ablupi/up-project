<template>
  <div class="navigation">
    <div class="navi-count" :class="{ 'navi-slide-not': page.page_count == 1 }"
      @click="dataPrev">
      上一页
    </div>
    <div class="navi-child" v-if="page.max_page < 10">
      <div v-for="count in page.max_page" :key="count">
        <input type="radio" name="navigation" :id="`navi${count}`" hidden :checked="count == page.page_count"
          @change="naviChange(count)">
        <label class="navi-count" :for="`navi${count}`">{{ count }}</label>
      </div>
    </div>
    <div class="navi-child" v-else-if="page.max_page >= 10 && page.page_count < 5">
      <div v-for="count in 5" :key="count">
        <input type="radio" name="navigation" :id="`navi${count}`" hidden :checked="count == page.page_count"
          @change="naviChange(count)">
        <label class="navi-count" :for="`navi${count}`">{{ count }}</label>
      </div>
      <div class="navi-count">···</div>
      <div class="navi-count" @click="emit('toPage', page.max_page)">{{ page.max_page }}</div>
    </div>
    <div class="navi-child" v-else-if="page.max_page >= 10 && page.page_count < page.max_page - 3">
      <div class="navi-count" @click="emit('toPage', 1)">1</div>
      <div class="navi-count">···</div>
      <div v-for="count in 5" :key="count">
        <div class="navi-count" :class="{ 'div-checked': props.page.max_page + count - 3 == props.page.max_page }"
          @click="naviChange(page.page_count + count - 3)">{{ page.page_count + count - 3 }}</div>
      </div>
      <div class="navi-count">···</div>
      <div class="navi-count" @click="emit('toPage', page.max_page)">{{ page.max_page }}</div>
    </div>
    <div class="navi-child" v-else-if="page.max_page >= 10 && page.page_count >= page.max_page - 3">
      <div class="navi-count" @click="emit('toPage', 1)">1</div>
      <div class="navi-count">···</div>
      <div v-for="count in 5" :key="count">
        <input type="radio" name="navigation" :id="`navi${count}`" hidden
          :checked="page.max_page + count - 5 == page.page_count" @change="naviChange(page.max_page + count - 5)">
        <label class="navi-count" :for="`navi${count}`">{{ page.max_page + count - 5 }}</label>
      </div>
    </div>
    <div class="navi-count" :class="{ 'navi-slide-not': page.page_count == page.max_page || page.max_page == 0 }"
      style="margin-right: 32px;" @click="dataNext">
      下一页
    </div>
    <div class="search-layout" v-if="showSize">
      <p>前往</p>
      <div class="navi-count count-input" style="margin: 0 6px;">
        <form @submit.prevent="toPage">
          <input type="text" v-model="searchText">
        </form>
      </div>
      <p>页</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, withDefaults, ref } from 'vue'

export interface Page {
  limit?: number
  max_count: number
  max_page: number
  page_count: number
}

interface Props {
  page: Page
  showSize?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  page: () => ({
    limit: 8,
    max_count: 0,
    max_page: 0,
    page_count: 1
  }),
  showSize: false
})

const emit = defineEmits(['dataPrev', 'naviChange', 'dataNext', 'toPage'])

const searchText = ref('1')

const naviChange = (count: number) => {
  emit('naviChange', count)
}

const toPage = () => {
  const count = parseInt(searchText.value)
  if (!count || count > props.page.max_page) return
  emit('toPage', count)
}

const dataNext = () => {
  if (props.page.page_count != props.page.max_page)
    emit('dataNext')
}

const dataPrev = () => {
  if (props.page.page_count != 1) 
    emit('dataPrev')
}
</script>

<style lang="less" scoped>
.navigation {
  display: flex;
  align-items: center;
  margin: 40px 0;
  gap: 9px;
  align-self: center;

  .navi-child {
    display: flex;
    gap: 9px;
  }

  .navi-count {
    height: 32px;
    min-height: 32px;
    background: #fff;
    font-size: 14px;
    font-family: OpenSans-Regular, OpenSans;
    color: #82868C;
    line-height: 30px;
    padding: 0 12px;
    box-sizing: border-box;
    cursor: pointer;
    transition: .4s;
    display: block;
    border-radius: 4px;
    border: 1px solid #E1E1E1;

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
      border-color: #E1E1E1;
    }
  }

  p {
    font-size: 14px;
    font-family: SourceHanSansCN-Regular, SourceHanSansCN;
    color: #82868C;
    line-height: 14px;
  }

  .navi-slide-not {
    background: #dddddd;
    cursor: not-allowed;
    border-color: #dddddd !important; 
    color: #82868C !important;
  }

  .count-input {
    width: 36px;
    overflow: hidden;
    display: flex;
    justify-content: center;

    input {
      background: none;
      border: none;
      outline: none;
      height: 100%;
      font-size: 16px;
      font-family: OpenSans-Regular, OpenSans;
      color: #82868C;
      line-height: 36px;
      width: 10px;
    }
  }

  .search-layout {
    display: flex;
    align-items: center;
  }
}
</style>