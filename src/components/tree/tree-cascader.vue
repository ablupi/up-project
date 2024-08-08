<template>
  <div class="cascade-main">
    <div>
      <div class="item-box" v-for="item in treeOptions" :key="item.key">
        <input type="radio" :name="`tree-item${id}`" :id="`${item.key}`" hidden 
          :checked="item.key === expandedKeys[id]" @click="toggle(item)">
        <label :for="`${item.key}`" class="title title-menu">
          <p>{{ item.label }}</p>
          <div class="icon-triangle" v-if="item.isFolder"></div>
        </label>
      </div>
    </div>
    <o-tree-item
      :tree-options="child"
      @click-item="emits('clickItem', $event)"
      @expand="emits('expand', $event)"
      v-model="treeValue"
      v-model:expanded-keys="childExpandedKeys"
      v-bind:expandeds="childExpandeds"
      :id="id + 1"
      v-if="child.length > 0 && reloadFolder">
    </o-tree-item>
  </div>
</template>

<script setup lang="ts">
import { withDefaults, defineEmits, defineProps, onMounted, ref, computed, watch } from 'vue'
import OTreeItem from '@/components/tree/tree-cascader.vue'

export interface TreeOption {
  key: number | string
  label: string
  isFolder?: boolean
  children?: Array<TreeOption>
}

interface Props {
  treeOptions: Array<TreeOption>
  modelValue?: string | number | undefined
  expandedKeys?: Array<string | number>
  expandeds?: Array<TreeOption>
  id: number
}

const props = withDefaults(defineProps<Props>(), {
  treeOptions: () => [],
  expandedKeys: () => [],
  expandeds: () => [],
  id: 0,
})

const emits = defineEmits([
  'update:modelValue',
  'update:expandedKeys',
  'update:expandeds',
  'clickItem',
  'expand'
])

const treeValue = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emits('update:modelValue', value)
  }
})

const childExpandedKeys = ref<Array<string | number>>(props.expandedKeys)
const childExpandeds = ref<Array<TreeOption>>(props.expandeds)
const child = ref<Array<TreeOption>>([])
const reloadFolder = ref(true)

watch(() => props.treeOptions, () => {
  reloadFolder.value = false
})

onMounted(() => {
  // 预处理数据
  props.treeOptions.forEach(p => {
    if (p.children && p.children.length) {
      p.isFolder = true
      if (props.expandedKeys.includes(p.key)) {
        child.value = p.children
        childExpandeds.value[props.id] = p
        childExpandedKeys.value[props.id] = p.key
      }
    }
  })
})

const toggle = (item: TreeOption) => {
  expandHandle(item)
  if (item.isFolder) {
    child.value = []
    setTimeout(() => {
      child.value = item.children || []
    }, 100)
  }
  else {
    treeValue.value = item.key
    child.value = []
    emits('clickItem', { item, expandeds: childExpandeds.value })
  }
}

const expandHandle = (item: TreeOption) => {
  childExpandeds.value.splice(props.id + 1)
  childExpandeds.value[props.id] = item
  childExpandedKeys.value.splice(props.id + 1)
  childExpandedKeys.value[props.id] = item.key
  emits('update:expandedKeys', childExpandedKeys.value)
  emits('expand', childExpandedKeys.value)
}

</script>

<style scoped lang="less">
.cascade-main {
  display: flex;
  justify-content: flex-start;
  --tree-item-height: 30px;
  --tree-transition-duration: .4s;
}

.item-box {
  color: #242527;
  font-size: 14px;
  position: relative;
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: var(--tree-transition-duration);
    height: var(--tree-item-height);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    position: relative;
    cursor: pointer;
    min-width: 120px;
    width: 120px;
    max-height: 120px;

    &::before {
      content: "";
      position: absolute;
      height: 90%;
      width: calc(100% - 12px);
      margin: 0 6px;
      border-radius: 3px;
      transition: var(--tree-transition-duration);
    }

    .icon-triangle {
      width: 6px;
      height: 6px;
      border-top: 3px solid transparent;
      border-left: 3px solid transparent;
      border-right: 3px solid #242527;
      border-bottom: 3px solid #242527;
      box-sizing: border-box;
      margin-right: 20px;
      transform: rotate(-45deg);
      transition: .2s;
      position: absolute;
      right: 0;
    }
    p {
      padding: 4px;
      border-radius: 3px;
      transition: var(--tree-transition-duration);
      padding-left: 12px;
      width: 80%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  .title-menu {
    &:hover::before {
      background: var(--theme-o1);
    }
  }

  input[type="radio"]:checked + .title-menu::before {
    background: var(--theme-o2) !important;
  }
} 
</style>