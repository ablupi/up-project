<template>
  <div class="tree-select-main">
    <div
      class="input-main"
      @click="state.isShow = !state.isShow"
      ref="inputRef"
    >
      <form>
        <input
          type="search"
          :placeholder="placeholder"
          v-model="state.current"
          @keyup.enter="inputSearch(state.current)"
        />
      </form>
      <div class="icon-triangle" :class="{ 'icon-open': state.isShow }"></div>
    </div>
    <!-- 下拉菜单选项内容 -->
    <transition name="drop">
      <div class="tree-main" ref="treeRef" v-show="state.isShow">
        <o-tree 
          :tree-options="treeSelectData"
          is-accordion
          type="menu"
          @click-item="clickItem"
          v-model="treeValue"
          v-model:expanded-keys="expandedKeys">
        </o-tree>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import OTree, {TreeOption} from '@/components/tree/tree.vue'
import { ref, defineProps, reactive, onMounted, defineEmits, onBeforeUnmount } from 'vue'
export interface TreeSelectOption extends TreeOption {}

interface Props {
  treeSelectData: Array<TreeSelectOption>,
  modelValue?: string | number,
  placeholder?: string,
  expandedKeys?: Array<string> | Array<number>
}

const props = withDefaults(defineProps<Props>(), {
  treeSelectData: () => [],
  placeholder: '请选择',
  expandedKeys: () => []
})

const emits = defineEmits([
  'update:modelValue', 
  'update:expandedKeys',
  'selectItem', 
  'loadMore', 
  'inputClick'
])



const state = reactive({
  current: '',
  isShow: false,
})

const treeRef = ref()
const inputRef = ref()
const treeValue = ref(props.modelValue)
const expandedKeys = ref(props.expandedKeys)

onMounted(() => {
  window.addEventListener('click', clickOther)
})

onBeforeUnmount(() => {
  window.removeEventListener('click', clickOther)
  // if (props.modelValue)

})

const clickItem = (item: TreeSelectOption) => {
  state.current = item.label
  state.isShow = false
  emits('update:modelValue', item.key)
  emits('selectItem', item)
}
const clickOther = (event: any) => {
  const e = event || window.event
  if (
    treeRef.value &&
    !treeRef.value.contains(e.target) &&
    !inputRef.value.contains(e.target)
  ) {
    state.isShow = false
  }
}
const inputSearch = (value: any) => {
  state.isShow = true
  emits('inputClick', value)
}
</script>

<style scoped lang="less">
.tree-select-main {
  width: 210px;
  position: relative;
  .input-main {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    border-radius: 7px;
    width: inherit;
    height: 36px;
    input {
      inset-inline: none;
      border: none;
      outline: none;
      display: block;
      padding: 0;
      height: 18px;
      line-height: 18px;
      margin-left: 10px; 
      width: 170px; 
      font-size: 14px;
      &::-webkit-input-placeholder {
        line-height: normal;
        font-size: 12px;
      }
      &::-ms-input-placeholder {
        line-height: normal;
        font-size: 12px;
      }

      &::-webkit-search-cancel-button {
        -webkit-appearance: none;
      }
    }
    .icon-triangle {
      width: 6px;
      height: 6px;
      border-top: 3px solid transparent;
      border-left: 3px solid transparent;
      border-right: 3px solid #2c2d30;
      border-bottom: 3px solid #2c2d30;
      box-sizing: border-box;
      margin-right: 12px;
      transform: rotate(-45deg);
      transition: 0.4s;
    }
    .icon-open {
      transform: rotate(45deg);
    }
  }
  .tree-main {
    width: inherit;
    overflow: hidden;
    transform: rotate(0deg);
    max-height: 210px;
    position: absolute;
    background-color: #fff;
    box-shadow: 0px 2px 10px 0px #c5c9cf80;
    border-radius: 10px;
    margin-top: 8px;
    overflow-y: auto;
    padding: 6px 0px;
    box-sizing: border-box;
    &::-webkit-scrollbar {
      width: 5px;
    }
    &::-webkit-scrollbar-track {
      background-color: #fff;
      border-radius: 2px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #d9dce3;
      border-radius: 2px;
    }
  }
}
.drop-enter-active {
  animation: drop-anim 0.4s;
}
.drop-leave-active {
  animation: drop-anim 0.4s reverse;
}
@keyframes drop-anim {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
}
</style>
