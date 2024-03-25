<template>
  <div class="tree-select-main">
    <div 
      class="input-main" 
      ref="inputRef"
      @click="state.isShow = !state.isShow">
      <div v-if="showSearch" class="select-layout">
        <input 
          type="text"
          v-model="state.current"
          :placeholder="placeholder"
          @input="inputSearch">
        <div class="icon-triangle" :class="{ 'icon-open': state.isShow }"></div>
      </div>
      <div v-else class="select-layout">
        <p>{{ state.current }}</p>
      </div>
    </div>
    <transition name="drop">
      <div class="tree-main" ref="treeRef" v-show="state.isShow">
        <o-tree
          :tree-options="treeSelectData"
          :is-accordion="isAccordion"
          type="menu"
          @click-item="clickItem"
          @expand="treeExpand"
          v-model="treeValue"
          v-model:expanded-keys="expandedKeys">
        </o-tree>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, withDefaults, defineProps, defineEmits, onMounted, onBeforeMount, reactive } from 'vue'
import OTree, { TreeOption } from '@/components/tree/tree.vue'
export interface TreeSelectOption extends TreeOption {}
interface Props {
  treeSelectData: Array<TreeSelectOption>,
  modelValue?: string | number,
  placeholder?: string,
  expandedKeys?: Array<string> | Array<number>,
  isAccordion?: boolean,
  showSearch?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  treeSelectData: () => [],
  placeholder: '请选择',
  expandedKeys: () => [],
  isAccordion: false,
  showSearch: false
})

const emits = defineEmits([
  'update:modelValue',
  'update:expandedKeys',
  'selectItem',
  'input',
  'expand'
])

const state = reactive({
  current: '',
  isShow: false
})

const treeRef = ref()
const inputRef = ref()
const treeValue = ref(props.modelValue)
const expandedKeys = ref(props.expandedKeys)

onMounted(() => {
  window.addEventListener('click', clickOther)
})

onBeforeMount(() => {
  window.removeEventListener('click', clickOther)
})

const clickItem = (item: TreeSelectOption) => {
  state.current = item.label
  state.isShow = false
  emits('update:modelValue', item.key)
  emits('selectItem', item)
}

// 菜单展开事件
const treeExpand = () => {
  emits('expand', expandedKeys.value)
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

const inputSearch = () => {
  state.isShow = true
  emits('input', state.current)
}

</script>

<style scoped lang="less">
.tree-select-main {
  width: 210px;
  position: relative;
  .input-main {
    display: flex;
    background: #fff;
    border-radius: 6px;
    width: inherit;
    height: 36px;
    .select-layout {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-left: 10px;
      font-size: 14px;
    }
    input {
      inset-inline: none;
      border: none;
      outline: none;
      display: block;
      padding: 0;
      height: 18px;
      line-height: 18px;
      width: 170px;
      font-size: 14px;
      &::-webkit-input-placeholder {
        line-height: normal;
        font-size: 12px;
      }
      &:-ms-input-placeholder {
        line-height: normal;
        font-size: 12px;
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
      transition: .4s;
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
    background: #fff;
    box-shadow: 0 2px 10px 0 #c5c9cf80;
    border-radius: 6px;
    margin-top: 8px;
    overflow-y: auto;
    padding: 6px 0;
    box-sizing: border-box;
    &::-webkit-scrollbar {
      width: 5px;
    }
    &::-webkit-scrollbar-track {
      background: #fff;
      border-radius: 2px;
    }
    &::-webkit-scrollbar-thumb {
      background: #d9dce3;
      border-radius: 2px;
    }
  }
}
.drop-enter-active {
  animation: drop-anim .4s;
}
.drop-leave-active {
  animation: drop-anim .4s reverse;
}
@keyframes drop-anim {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
}
</style>