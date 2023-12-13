<template>
  <div 
    class="item-box"
    v-for="item in treeOptions"
    :key="item.key">
    <input 
      type="radio" 
      :id="`${item.key}`"
      hidden
      name="tree-item"
      @click="toggle(item)">
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
    <div class="radio-box" :class="{'radio-box-show': item.isOpen}">
      <div style="min-height: 0;">
        <o-tree-item 
          :tree-options="item.children"
          :type="type"
          :padding="padding + 14"
          @click-item="$emit('clickItem', $event)"
          :is-accordion="isAccordion">
        </o-tree-item>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { withDefaults, defineProps, onMounted, defineEmits, reactive } from 'vue'
import OTreeItem from '@/components/tree/tree.vue'

interface TreeOption {
  key: number | string,
  label: string,
  isFolder?: boolean,
  children?: Array<TreeOption>,
  isOpen?: boolean
}

interface Props {
  treeOptions: Array<TreeOption>,
  padding?: number,
  isAccordion?: boolean,
  type?: string
}

const props = withDefaults(defineProps<Props>(), {
  treeOptions: () => [],
  padding: 20,
  isAccordion: false,
  type: 'default'
})

const emits = defineEmits(['clickItem'])

const state = reactive({
  isMenu: false
})

onMounted(() => {
  // 预处理数据
  props.treeOptions.forEach(p => {
    if (p.children && p.children.length) {
      p.isFolder = true
    }
  })
  if (props.type === 'menu')
    state.isMenu = true
})

// 处理选择事件
const toggle = (item: TreeOption) => {
  if (item.isFolder) {
    // 手风琴模式
    if (props.isAccordion) {
      for (const p of props.treeOptions) {
        if (p.key === item.key)
          p.isOpen = !p.isOpen
        else
          p.isOpen = false
      }
    }
    else {
      item.isOpen = !item.isOpen
    }
  }
  else {
    emits('clickItem', item)
  }
}
</script>

<style scoped lang="less">
.item-box {
  color: #242527;
  font-size: 14px;
  position: relative;
  --tree-item-height: 30px;
  --tree-transition-duration: .4s;
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