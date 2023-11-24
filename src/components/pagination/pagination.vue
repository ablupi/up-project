<template>
  <div class="navigation">
    <div 
      class="navi-count navi-slide" 
      :class="{'navi-slide-not': page.page_count==1}" 
      @click="emits('dataPrev', page.page_count!=1)">
      上一页
    </div>
    <div v-for="count in page.max_page" :key="count">
      <input 
        type="radio" 
        name="navigation" 
        :id="`navi${count}`" 
        hidden 
        :checked="count == page.page_count"
        @change="emits('naviChange', count)">
      <label class="navi-count" :for="`navi${count}`">{{ count }}</label>
    </div>
    <div 
      class="navi-count navi-slide" 
      :class="{'navi-slide-not': page.page_count==page.max_page || page.max_page==0}" 
      @click="emits('dataNext', page.page_count!=page.max_page)">
      下一页
    </div>
    <o-select 
      :data="selectData"
      v-model="selectValue"
      @select="select">
    </o-select>
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
import { reactive, defineProps, defineEmits, ref, computed } from 'vue'
import message from '@/components/msg/msg'
import OSelect from '@/components/select/select.vue'

interface Props {
  pageSize: string | number,
  pageSizeOptions: Array<string> | Array<number>,
  page: any,
}

const props = withDefaults(defineProps<Props>(), {
  pageSize: '5',
  pageSizeOptions: () => ['5', '10', '20', '50'],
  page: () => ({
    max_count: 0,
    max_page: 0,
    page_count: 1
  })
})

const emits = defineEmits([ 
  'update:pageSize',
  'dataPrev', 
  'naviChange', 
  'dataNext', 
  'toPage'
])

const state = reactive({
  searchText: '1'
})

const selectData = computed(() => 
  props.pageSizeOptions.map(p => ({key: p, text: `${p}条/页`}))
)
const selectValue = ref(props.pageSize)



const toPage = () => {
  const count = parseInt(state.searchText)
  if (!count) return
  if (count > props.page.max_page) {
    message.success('没有更多内容')
    return
  }
  emits('toPage', count)
}



const select = (value: any) => {
  emits('update:pageSize', value.key)
}

</script>

<style lang="less" scoped>
.navigation {
  display: flex;
  align-items: center;
  .navi-count {
    height: 36px;
    min-height: 36px;
    background: #fff;
    font-size: 16px;
    font-family: OpenSans-Regular, OpenSans;
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
    line-height: 14px;
  }
  .navi-slide-not {
    background: var(--theme-gray);
    cursor:not-allowed;
    color: #82868C;
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
      line-height: 36px;
      width: 10px;
    }
  }
  &  .select {
    --select-height: 36px;
    width: 120px;
    border: none;
    border-radius: 0;
    margin-right: 32px;
  }
}
</style>