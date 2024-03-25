<template>
  <div 
    class="cascade-popup"
    v-for="item in data"
    :key="item.key">
    <input 
      type="radio" 
      :id="`${item.key}`"
      hidden
      :checked="item.isChecked"
      name="tree-item"
      @click="toggle(item)"
      >
    <!-- 菜单模式 -->
    <label 
      :for="`${item.key}`" 
      class="title title-menu"
      v-if="state.isMenu">
      <p :style="{paddingLeft: padding+'px'}">{{ item.label }}</p>
      <div 
        v-if="item.isFolder" 
        class="icon-triangle"
        :class="{'icon-open': item.isOpen}">
      </div>
    </label>
    <!-- 默认树状样式 -->
    <label 
      :for="`${item.key}`" 
      class="title title-default"
      v-else>
      <div 
        v-if="item.isFolder" 
        class="icon-triangle"
        :class="{'icon-open': item.isOpen}"
        :style="{left: padding+'px'}">
      </div>
      <p :style="{marginLeft: padding+16+'px'}">{{ item.label }}</p>
      
    </label>
    <!-- 联级模式 -->
    <div class="cascade" :class="{'cascade-show': item.isOpen}">
      <o-cascade 
        :data="item.children"
        :padding="padding + 14"
        @click-item="$emit('clickItem', $event)"
        @expand="$emit('expand', $event)"
        v-model="treeValue"
        v-model:checked-keys="childCheckedKeys"
        v-model:expanded-keys="childExpandedKeys">
        >
      </o-cascade>
    </div>
  </div>
</template>

<script setup lang="ts">
import { withDefaults, defineProps, onMounted, defineEmits, reactive, ref, computed } from 'vue'
import OCascade from '@/components/tree/cascade.vue'
export interface CascadeOption {
  key: number | string,
  label: string,
  isFolder?: boolean,
  children?: Array<CascadeOption>,
  isOpen?: boolean,
  isChecked?: boolean
}

interface Props {
  data: Array<CascadeOption>,
  padding?: number,
  modelValue?: string | number | undefined,
  checkedKeys?: Array<string | number>,
  expandedKeys?: Array<string | number>,
}

const props = withDefaults(defineProps<Props>(), {
  treeOptions: () => [],
  padding: 20,
  checkedKeys: () => [],
  expandedKeys: () => [],
 })

const emits = defineEmits([
  'update:modelValue', 
  'update:checkedKeys', 
  'update:expandedKeys', 
  'clickItem', 
  'expand'
])

const treeValue = computed({
  get() {
    return props.modelValue; 
  },
  set(value) {
    emits('update:modelValue', value); 
  }
});

const childCheckedKeys = ref<Array<string | number>>(props.checkedKeys)
const childExpandedKeys = ref<Array<string | number>>(props.expandedKeys)
const state = reactive({
  isMenu: false
})

onMounted(() => {
  // 预处理数据
  props.data.forEach(p => {
    if (p.children && p.children.length) {
      p.isFolder = true
      if (props.expandedKeys.includes(p.key)) {
        p.isOpen = true
      }
    }
    if (props.modelValue && props.modelValue === p.key) {
      p.isChecked = true
      emits('clickItem', p)
    }
  })
})

// 处理选择事件
const toggle = (item: CascadeOption) => {
  if (item.isFolder) {
    item.isOpen = !item.isOpen
    expandHandle(item)
  }
  else {
    treeValue.value = item.key
    emits('clickItem', item)
  }
}

const expandHandle = (item: CascadeOption) => {
  if (item.isOpen) {
    childExpandedKeys.value.push(item.key)
  }
  else {
    const index = childExpandedKeys.value.findIndex(p => p === item.key)
    if (index !== -1) {
      childExpandedKeys.value.splice(index, 1)
    }
  }
  emits('update:expandedKeys', childExpandedKeys.value)
  emits('expand', childExpandedKeys.value)
}

</script>

<style scoped lang="less">
// .cascade-popup {
//   width: 200px;
//     border-radius: 5px;
//     // display: none;
//     position: absolute;
//     right: -200px;
//     border: 1px solid red;

// }
.cascade-popup {
  color: #242527;
  font-size: 14px;
  position: absolute;
  --tree-item-height: 30px;
  --tree-transition-duration: .4s;
  border: 1px solid #000;
  right: -200px;
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
    .icon-open {
      transform: rotate(45deg);
    }
    p {
      padding: 4px;
      border-radius: 3px;
      transition: var(--tree-transition-duration);
    }
  }
  .title-menu {
    &:hover::before {
      background: var(--theme-o1);
    }
  }
  .title-default {
    justify-content: left;
    &:hover > p {
      background: var(--theme-o1);
    }
  }
  input[type='radio']:checked + .title-menu::before {
    background: var(--theme-o2);
  }
  input[type='radio']:checked + .title-default > p {
    background: var(--theme-o2);
  }
  // .cascade {
  //   width: 200px;
  //   border-radius: 5px;
  //   // display: none;
  //   position: absolute;
  //   right: -200px;
  // }
  .cascade-show {
    
  }
  .radio-box {
    overflow: hidden;
    display: grid;
    grid-template-rows: 0fr;
    transition: var(--tree-transition-duration);
  }
  .radio-box-show {
    grid-template-rows: 1fr;
  }
}

</style>