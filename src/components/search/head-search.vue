<template>
  <div class="search-main" ref="searchEl" :class="{ 'test': state.show }">
    <Transition name="search">
      <div
        class="header-search"
        :class="{ 'search-anim': state.show }"
        
        v-if="state.show"
      >
        <input
          :value="modelValue"
          type="text"
          :placeholder="$t('搜索')"
          @input="updateValue"
          ref="inputEl"
        />
      </div>
    </Transition>
    <svg-icon
      name="search"
      w="20px"
      h="20px"
      color="#fff"
      class="header-search-icon"
      @click="clickIcon"
      unit="px"
    >
    </svg-icon>
    <!-- <a-icon type="search" class="header-search-icon"  @click="clickIcon" style="font-size: 16px;"/> -->
  </div>
</template>

<script setup lang="ts">
import { defineProps, reactive, defineEmits, onMounted, ref } from 'vue'

const props = defineProps({
  modelValue: String,
})

const emits = defineEmits(['update:modelValue', 'input', 'search'])

const state = reactive({
  show: false,
})

const searchEl = ref()
const inputEl = ref()

onMounted(() => {
  window.addEventListener('click', clickOther)
})

const clickOther = (event: any) => {
  const e = event || window.event
  if (searchEl.value && !searchEl.value.contains(e.target)) {
    state.show = false
    
    // this.value = ''
    // this.$emit('clearValue', '')
  }
}
const clickIcon = () => {
  if (state.show) {
    emits('search', props.modelValue)
  }
  state.show = !state.show
  setTimeout(() => {
    inputEl.value.focus()
  }, 1000);
  
  // this.value = ''
  // this.$emit('clearValue', '')
}

const updateValue = (e: any) => {
  emits('input')
  emits('update:modelValue', e.target.value)
}
</script>

<style scoped lang="less">
.search-main {
  --theme: #0072f0;
  display: flex;
  align-items: center;
  position: relative;
  width: 36px;
    height: 30px;
    transition: 0.5s;
  .header-search {
    width: 30px;
    height: 30px;
    transition: 0.5s;
    border-radius: 15px;
    padding: 0 15px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    transform-origin: right;
    animation: search-anim-leave 0.8s forwards;
    input {
      outline: none;
      color: #fff;
      height: 100%;
      width: calc(100% - 30px);
      border: none;
      background: transparent;
      &::placeholder {
        color: #fff;
      }
    }
  }
  .search-anim {
    animation: search-anim-show 0.5s forwards;
  }
  .header-search-icon {
    cursor: pointer;
    position: absolute;
    right: 8px;
  }
  
  .header-search-icon:active,
  .header-search-icon:hover {
    color: var(--theme);
  }
}
.search-enter-active,
.search-leave-active {
  width: 200px;
  
}
.search-enter,
.search-leave-to {
  width: 30px;
}
.test {
    width: 200px;
  }
@keyframes search-anim-show {
  from {
    width: 30px;
    border: 1px solid #fff;
  }
  to {
    width: 200px;
    border: 1px solid #fff;
  }
}
@keyframes search-anim-leave {
  0% {
    width: 200px;
    border: 1px solid #fff;
  }
  62.5% {
    width: 30px;
    border: 1px solid #fff;
  }
  100% {
    border-color: #fff;
  }
}
</style>
