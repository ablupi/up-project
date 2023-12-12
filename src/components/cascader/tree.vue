<template>
  <div class="item-box" id="item-template">
    <input
      type="radio"
      :id="getItemId(idKey)"
      @click="toggle(item.keyId)"
      name="tree-item"
      hidden
    />
    <label
      class="title"
      :for="getItemId(idKey)"
      :style="{ paddingLeft: padding + 'px' }"
    >
      {{ item.name }}
      <div
        v-if="isFolder"
        class="icon-triangle"
        :class="{ 'icon-open': state.isOpen }"
      ></div>
    </label>
    <div class="line"></div>
      <div
        class="radio-box"
        :class="{ 'radio-box-show': state.isOpen }"
      >
        <div style="min-height: 0;">
          <tree-item
            class="item"
            :padding="padding + 14"
            v-for="(child, index) in item.children"
            :key="index"
            :item="child"
            :dataIndex="index"
            :idKey="`${idKey}${index}`"
            @click-item="$emit('clickItem', $event)"
            @check-radio="$emit('checkRadio', $event)"
          ></tree-item>
        </div>
      </div>
  </div>
</template>

<script setup lang="ts">
import TreeItem from './tree.vue'
import { defineProps, defineEmits, reactive, computed } from 'vue'
const props = defineProps({
  item: Object,
  padding: Number,
  dataIndex: Number,
  isCheckedList: Array,
  idKey: String,
})

const emits = defineEmits(['clickItem', 'checkRadio'])
const state = reactive({
  isOpen: false,
  background: 'transparent',
})
const isFolder = computed(() => {
  return props.item.children && props.item.children.length
})

const toggle = (keyId: any) => {
  if (isFolder.value) {
    state.isOpen = !state.isOpen
  } else {
    if (keyId !== 0) {
      emits('clickItem', {
        name: props.item.name,
        groupId: props.item.group_id,
      })
    }
  }
}

const getItemId = (index: string) => {
  return `radio${index}`
}

</script>

<style scoped>

.title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: 0.4s;
  height: 30px;
  -webkit-tap-highlight-color: #00000000;
  background: #fff;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.item-box {
  color: #242527;
  font-size: 14px;
  position: relative;
  
}

input[type='radio']:checked + label {
  background-color: #f9f9f9;
}

.radio-box {
  overflow: hidden;
  display: grid;
  grid-template-rows: 0fr;
  transition: .2s;
}
.radio-box-show {
  grid-template-rows: 1fr;
}
.line {
  border-bottom: 1px solid #f5f5f5;
  margin: 0 20px;
}

.icon-triangle {
  width: 6px;
  height: 6px;
  border-top: 3px solid transparent;
  border-left: 3px solid transparent;
  border-right: 3px solid #d5d5d5;
  border-bottom: 3px solid #d5d5d5;
  box-sizing: border-box;
  margin-right: 20px;
  transform: rotate(-45deg);
  transition: 0.4s;
}
.icon-open {
  transform: rotate(45deg);
}
</style>
