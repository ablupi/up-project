<template>
  <div class="search-view-main">
    <o-search 
      v-model="state.inputValue"
      @search="search"
      @input="input">
    </o-search>
  </div>
  
</template>

<script setup lang="ts">
import OSearch from '@/components/search/search.vue'
import { reactive } from 'vue'

const state = reactive({
  inputValue: ''
})

const search = () => {
  console.log(state.inputValue)
}

const input = () => {
  console.log(state.inputValue)
}
</script>

<style scoped lang="less">
.search-view-main {
  display: flex;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
  background: #838383;
}
</style>

