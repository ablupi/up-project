<template>
  <div class="tree-select-main">
    <div class="input-main" ref="inputRef" @click="isShow = !isShow" :class="{ 'input-main-select': isShow }">
      <div class="select-layout">
        <input type="text" v-model="current" :placeholder="placeholder">
        <div class="icon-triangle" :class="{ 'icon-open': isShow }"></div>
      </div>
      <div class="select-layout-shade"></div>
    </div>
    <transition name="drop">
      <div class="tree-main" v-if="isShow" ref="treeRef">
        <o-cascader
          :tree-options="treeSelectData"
          @click-item="clickItem"
          @expand="treeExpand"
          v-model="treeValue"
          v-model:expanded-keys="expandedKeys"
          v-bind:expandeds="childExpandeds"
          >
        </o-cascader>
      </div>
    </transition>

  </div>
</template>

<script setup lang="ts">
import OCascader, { TreeOption } from '@/components/tree/tree-cascader.vue'
import { ref, withDefaults, defineEmits, defineProps, onMounted, onBeforeMount } from 'vue'

export interface TreeSelectOption extends TreeOption {}
interface Props {
  treeSelectData: Array<TreeSelectOption>
  modelValue?: string | number
  placeholder?: string
  expandedKeys?: Array<string | number>
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
  'expand'
])

const treeValue = ref(props.modelValue)
const expandedKeys = ref(props.expandedKeys)
const childExpandeds = ref([])
const current = ref('')
const inputRef = ref()
const treeRef = ref()
const isShow = ref(false)

onMounted(() => {
  window.addEventListener('click', clickOther)
  // 数据初始化
  init(props.treeSelectData)
})

onBeforeMount(() => {
  window.removeEventListener('click', clickOther)
})

const init = (list: Array<TreeSelectOption>) => {
  list.forEach(value => {
    if (props.expandedKeys.includes(value.key)) {
      current.value = current.value ? `${current.value}/${value.label}` : value.label
      if (value.children)
        init(value.children)
    }
  })
}

const clickItem = (args: any) => {
  const { item, expandeds } = args
  current.value = expandeds?.map((p: TreeSelectOption) => p.label).join('/')
  isShow.value = false
  emits('update:modelValue', item.key)
  emits('selectItem', { item, expandeds })
}

const treeExpand = () => {
  emits('expand', expandedKeys.value)
}

const clickOther = (event: any) => {
  const e = event || window.event
  if (treeRef.value && !treeRef.value.contains(e.target) && !inputRef.value.contains(e.target)) {
    isShow.value = false
  }
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
    position: relative;
    border: 1px solid var(--border-color);
    transition: .4s;

    .select-layout {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-left: 10px;
      font-size: 14px;
    }

    .select-layout-shade {
      position: absolute;
      width: 100%;
      height: 100%;
      cursor: pointer;
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
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;

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

    &:hover {
      border-color: var(--theme);
    }
  }

  .input-main-select {
    border-color: var(--theme);
  }

  .tree-main {
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