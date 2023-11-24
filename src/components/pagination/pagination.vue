<template>
  <div class="navigation">
    <div 
      class="navi-count navi-slide" 
      :class="{'navi-slide-not': page.page_count==1}" 
      @click="emit('dataPrev', page.page_count!=1)">
      上一页
    </div>
    <div v-for="count in page.max_page" :key="count">
      <input 
        type="radio" 
        name="navigation" 
        :id="`navi${count}`" 
        hidden 
        :checked="count == page.page_count"
        @change="emit('naviChange', count)">
      <label class="navi-count" :for="`navi${count}`">{{ count }}</label>
    </div>
    <div 
      class="navi-count navi-slide" 
      :class="{'navi-slide-not': page.page_count==page.max_page || page.max_page==0}" 
      style="margin-right: 32px;" 
      @click="emit('dataNext', page.page_count!=page.max_page)">
      下一页
    </div>
    <p>前往</p>
    <div class="navi-count count-input" style="margin: 0 6px;">
      <form @submit="toPage">
        <input type="text" v-model="state.searchText">
      </form>

    </div>
    <p>页</p>
  </div>
</template>

<script setup lang="ts">
import { reactive, defineProps, defineEmits } from 'vue'
import message from '@/components/msg/msg'

const props = defineProps({
  page: {
    type: Object,
    default: () => {
      return {
        limit: 8,
        max_count: 0,
        max_page: 0,
        page_count: 1
      }
    }
  },
})

const emit = defineEmits([ 'dataPrev', 'naviChange', 'dataNext', 'toPage'])

const state = reactive({
  searchText: '1'
})

const toPage = () => {
  const count = parseInt(state.searchText)
  if (!count) return
  if (count > props.page.max_page) {
    message.success('没有更多内容')
    return
  }
  emit('toPage', count)
}

</script>

<style lang="less" scoped>
.navigation {
  display: flex;
  align-items: center;
  margin-bottom: 185px;
  .navi-count {
    height: 36px;
    min-height: 36px;
    background: #fff;
    font-size: 16px;
    font-family: OpenSans-Regular, OpenSans;
    color: #82868C;
    line-height: 36px;
    padding: 0 15px;
    box-sizing: border-box;
    cursor: pointer;
    transition: .4s;
    margin-right: 20px;
    display: block;
    
  }
  input:checked + label {
    background: var(--theme);
    color: #fff;
  }
  & > p {
    font-size: 14px;
    font-family: SourceHanSansCN-Regular, SourceHanSansCN;
    color: #82868C;
    line-height: 14px;
  }
  .navi-slide-not {
    background: var(--theme-gray);
    cursor:not-allowed;
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
}
</style>