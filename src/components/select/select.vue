<template>
  <div 
    class="select"
    @mouseover="showPopup = true"
    @mouseleave="showPopup = false">
    <input 
      type="text" 
      name="select-input"
      @input="input"
      :value="inputValue"
      v-if="showSearch"
    />
    <p v-else>{{ inputValue }}</p>
    <Transition name="popup">
      <div v-if="showPopup" class="select-popup">
        <div 
          class="select-option"
          v-for="item in data"
          :key="item.key"
          @click="select(item)">
          <p>{{ item.text }}</p>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, withDefaults } from 'vue'

interface SelectOption {
  key: string | number,
  text: string
}

interface Props {
  modelValue?: string | number,
  data: Array<SelectOption>,
  showSearch?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  data: () => []
})

const emits = defineEmits(['update:modelValue', 'input', 'select'])

const showPopup = ref(false)
const inputValue = ref<string | undefined>(props.data.find(p => p.key===props.modelValue)?.text)

const select = (item: SelectOption) => {
  inputValue.value = item.text
  emits('update:modelValue', item.key)
  emits('select', item)
}

const input = (e: any) => {
  inputValue.value = e.target.value
  emits('input', e.target.value)
}
</script>

<style scoped lang="less">
.select {
  --select-height: 30px;
  height: var(--select-height);
  max-height: var(--select-height);
  width: 200px;
  background: #fff;
  display: flex;
  align-items: center;
  position: relative;
  border: 1px solid #888888;
  cursor: pointer;
  border-radius: 3px;
  &::before {
    content: "";
    position: absolute;
    right: 15px;
    height: 6px;
    width: 12px;
    background: #000;
    clip-path: polygon(0 0, 50% 100%, 100% 0);
    transition: 0.4s;
  }
  & > input {
    border: none;
    outline: none;
    background: none;
    margin-left: 10px;
    width: 80%;
    height: 100%;
    font-size: 16px;
  }
  & > p {
    margin: 0 30px 0 10px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .select-popup {
    background: #fff;
    position: absolute;
    width: inherit;
    max-height: calc(var(--select-height) * 5 + 10px);
    top: 0;
    transform: translateY(var(--select-height));
    padding: 5px 5px 5px 10px;
    border-radius: 5px;
    transition: .4s;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    box-shadow: 0 0 5px #b3b3b3;
    overflow-y: scroll;
    overflow-x: hidden;
    z-index: 99;
    .select-option {
      height: var(--select-height);
      min-height: var(--select-height);
      font-size: 16px;
      color: #303030;
      border-bottom: 1px solid #ececec;
      cursor: pointer;
      display: flex;
      align-items: center;
      & > p {
        transition: 0.2s;
        display: block;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      &:hover {
        background: var(--theme-o2);
        & > p {
          transform: translateX(15px);
        }
      }
    }
    &::-webkit-scrollbar {
      width: 5px;
    }
    &::-webkit-scrollbar-track {
      background-color: #fff;
      border-radius: 2px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #d9dce3;
      border-radius: 2px;
    }
  }
  &:hover {
    &::before {
      transform: rotate(180deg);
    }
  }
}
.popup-enter-active,
.popup-leave-active {
  opacity: 1;
  transform: translateY(var(--select-height));
}
.popup-enter-from,
.popup-leave-to {
  opacity: 0;
  transform: translateY(0) !important;
}
</style>
