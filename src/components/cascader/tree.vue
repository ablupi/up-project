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
    <!-- <transition name="item-show">
      <div v-show="state.isOpen" v-if="isFolder" class="fake-radio-box" :style="{height: childHeight}"></div>
    </transition> -->
    <!-- <transition name="item-show"> -->
      <!-- <div
        class="radio-box"
        v-show="state.isOpen"
        v-if="isFolder"
        ref="childEl"
      > -->
      <div
        class="radio-box"
        :class="{ 'radio-box-show': state.isOpen }"
        ref="childEl"
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
    <!-- </transition> -->
    
  </div>
</template>

<script setup lang="ts">
import TreeItem from './tree.vue'
import { ref, defineProps, reactive, computed, onMounted } from 'vue'
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
  temporaryHeight: 0,
  resizeObserver: null as any,
  isResizing: false,
  timer: null as any,
  timeHeight: 0
})
const isFolder = computed(() => {
  return props.item.children && props.item.children.length
})

const childHeight = ref(isFolder.value ? props.item.children.length * 30 + 'px' : 0)

const childEl = ref()

onMounted(() => {
  // const resizeObserver = new ResizeObserver(entries => {
  //   const { width, height } = entries[0].contentRect;
  //   state.temporaryHeight =  height
  //   if (!state.isResizing) {
  //     state.isResizing = true
  //     resizeHandler()
  //   }
  // });
  // setTimeout(() => {
  //   resizeObserver.observe(childEl.value)
  // }, 1000);
})

// const resizeHandler = () => {
//   state.timer = setTimeout(() => {
//     if (state.temporaryHeight == state.timeHeight) {
//       state.isResizing = false
//       state.timer = null
//       childHeight.value = state.timeHeight + 'px'
//     }
//     else {
//       state.timeHeight = state.temporaryHeight
//       resizeHandler()
//     }
//   }, 20)
// }

const toggle = (keyId: any) => {
  // console.log(state.isOpen)
  if (isFolder.value) {
    state.isOpen = !state.isOpen
  } else {
    if (keyId !== 0) {
      // console.log(this.isChecked)
      // this.color = '#F9F9F9'
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

const childBoxChange = () => {
  console.log(childEl.value.clientHeight)
}

// const calcChildLength = (count: number) => {
//   allChildLength.value = allChildLength.value+count
//   console.log(allChildLength.value)
// }
</script>

<style scoped>
.tree-main {
  background-color: #fff;
  border-radius: 10px;
  height: auto;
  /* max-height: 250px; */
  width: 208px;
  overflow: auto;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

.title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: 0.4s;
  height: 30px;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  background: #fff;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  /* width: 120px; */
}

.item-box {
  color: #242527;
  font-size: 14px;
  position: relative;
  
}

.item-check {
  background-color: #f9f9f9;
}

/* .item-show-enter-active {
  animation: item-anim 0.2s linear;
}
.item-show-leave-active {
  animation: item-anim 0.2s linear reverse;
}
@keyframes item-anim {
  from {
    height: 0;
  }
} */

.item-show-enter-active,
.item-show-leave-active {
  height: auto;
}
.item-show-enter-from,
.item-show-leave-to {
  height: 0;
}

input[type='radio']:checked + label {
  background-color: #f9f9f9;
}

/* .label-checked {
  background-color: #ffffff;
} */

.radio-box {
  overflow: hidden;
  display: grid;
  grid-template-rows: 0fr;
  transition: .2s;
  /* height: initial;
  position: absolute;
  top: 30px;
  width: 100%; */
}
.radio-box-show {
  grid-template-rows: 1fr;
}
.fake-radio-box {
  /* position: absolute; */
  /* pointer-events: none; */
  background: transparent;
  transition: .2s;
}
.item {
  
  /* cursor: pointer; */
  /* line-height: 30px; */
  /* -webkit-tap-highlight-color: transparent; */
  /* border-bottom: 1px solid #F5F5F5; */
}
.line {
  border-bottom: 1px solid #f5f5f5;
  margin: 0 20px;
}

ul {
  padding-left: 1em;
  line-height: 1.5em;
  list-style-type: dot;
}

li {
  list-style: none;
}
.icon-triangle {
  width: 6px;
  height: 6px;
  /* background-color: black; */
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
