<template>
  <div class="search-main" ref="searchEl" :class="{'show': state.show}">
    <Transition name="search">
      <div 
        class="header-search" 
        :class="{'search-anim': state.show}"
        v-if="state.show">
        <input 
          type="text" 
          :value="modelValue"
          placeholder="搜索"
          @input="updateValue"
          ref="inputEl">
      </div>
    </Transition>
    <img 
      style="height: 20px;width: 20px;"
      class="header-search-icon"
      @click="clickIcon"
      src="data:image/svg+xml;charset=utf-8;base64,PHN2ZyB2aWV3Qm94PScwIDAgMTAyNCAxMDI0JyB2ZXJzaW9uPScxLjEnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycgeG1sbnM6eGxpbms9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnIHdpZHRoPScyMDAnIGhlaWdodD0nMjAwJz48cGF0aCBkPSdNNDMxLjYxNiA3OTEuMDRjLTIwOS40MDggMC0zNzkuOTA0LTE3MC40OTYtMzc5LjkwNC0zNzkuOTA0UzIyMi4yMDggMzEuMjMyIDQzMS42MTYgMzEuMjMyIDgxMS41MiAyMDEuNzI4IDgxMS41MiA0MTEuMTM2IDY0MS4wMjQgNzkxLjA0IDQzMS42MTYgNzkxLjA0eiBtMC02OTMuMjQ4Yy0xNzIuNTQ0IDAtMzEzLjM0NCAxNDAuMjg4LTMxMy4zNDQgMzEzLjM0NCAwIDE3Mi41NDQgMTQwLjI4OCAzMTMuMzQ0IDMxMy4zNDQgMzEzLjM0NCAxNzIuNTQ0IDAgMzEzLjM0NC0xNDAuMjg4IDMxMy4zNDQtMzEzLjM0NCAwLTE3Mi41NDQtMTQwLjgtMzEzLjM0NC0zMTMuMzQ0LTMxMy4zNDR6JyBmaWxsPScjZmZmZmZmJz48L3BhdGg+PHBhdGggZD0nTTY3Ni44NjQgNjYwLjQ4bDI3OC41MjggMjc4LjUyOGMxMi44IDEyLjggMTIuOCAzNC4zMDQgMCA0Ny4xMDQtMTIuOCAxMi44LTM0LjMwNCAxMi44LTQ3LjEwNCAwTDYyOS43NiA3MDcuNTg0Yy0xMi44LTEyLjgtMTIuOC0zNC4zMDQgMC00Ny4xMDQgMTIuOC0xMi44IDM0LjMwNC0xMi44IDQ3LjEwNCAweicgZmlsbD0nI2ZmZmZmZic+PC9wYXRoPjwvc3ZnPg==" alt="">
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, onMounted, onBeforeUnmount, reactive } from 'vue'

const props = defineProps({
  modelValue: String
})

const emits = defineEmits(['update:modelValue', 'input', 'search'])

const state = reactive({
  show: false
})

const inputEl = ref()
const searchEl = ref()

onMounted(() => {
  window.addEventListener('click', clickOther)
})

onBeforeUnmount(() => {
  window.removeEventListener('click', clickOther)
})

const clickIcon = () => {
  if (state.show) {
    emits('search', props.modelValue)
  }
  state.show = !state.show
}

const updateValue = (e: any) => {
  emits('input')
  emits('update:modelValue', e.target.value)
}

const clickOther = (event: any) => {
  const e = event || window.event
  if (searchEl.value && !searchEl.value.contains(e.target)) {
    state.show = false
  }
}
</script>

<style scoped lang="less">
.search-main {
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
.show {
  width: 200px;
}
.search-enter-active,
.search-leave-active {
  width: 200px;
}
.search-enter,
.search-leave-to {
  width: 30px;
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