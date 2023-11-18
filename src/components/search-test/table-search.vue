<template>
  <div class="search-main" :class="{ inputting: state.isInput }">
    <svg-icon v-if="icon" :name="icon" w="24px" h="24px" :color="state.iconColor"></svg-icon>
    <input 
      type="text" 
      :placeholder="placeholder" 
      :value="modelValue"
      @focus="inputting" 
      @blur="noInput"
      @input="updateValue">
  </div>
</template>

<script lang="ts" setup>
import { defineProps, reactive, defineEmits } from 'vue';

defineProps({
  placeholder: {
    type: String,
    default: '请输入...'
  },
  modelValue: String,
  icon: String
})

const emit = defineEmits(["update:modelValue", 'input']);

const state = reactive({
  isInput: false,
  iconColor: '#82868C'
})

const inputting = () => {
  state.isInput = true
  state.iconColor = '#1846DB'
}

const noInput = () => {
  state.isInput = false
  state.iconColor = '#82868C'
}

const updateValue = (e: any) => {
  emit('input')
  emit("update:modelValue", e.target.value);
}
</script>

<style lang="less" scoped>
.search-main {
  height: 36px;
  border: 1px solid #E7E7E7;
  background: #FBFBFB;
  display: flex;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;
  margin-right: 10px;
  transition: .4s;
  input {
    outline: none;
    border: none;
    background: none;
    margin-left: 12px;
    width: 100%;
    &::placeholder {
      font-size: 16px;
      color: #82868C;
    }
  }
}
.inputting {
  border-color: var(--theme);
  background: var(--theme-background);
}
</style>