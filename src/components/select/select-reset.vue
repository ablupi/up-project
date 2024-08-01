<template>
  <div class="tree-select-main">
    <div class="input-main" ref="inputRef" @click="state.isShow = !state.isShow">
      <div v-if="showSearch" class="select-layout">
        <input type="text" v-model="state.current" :placeholder="placeholder" @input="inputSearch">
        <div class="icon-triangle" :class="{ 'icon-open': state.isShow }"></div>
      </div>
      <div v-else class="select-layout">
        <p>{{ state.current }}</p>
      </div>
    </div>
    <transition name="drop">
      <div class="tree-main" ref="treeRef" v-show="state.isShow">
        <div class="item-box" v-for="item in data" :key="item.key">
          <input type="radio" :id="`${item.key}`" hidden :checked="modelValue === item.key" name="tree-item"
            @click="select(item)">
          <label :for="`${item.key}`" class="title title-menu">
            <p>{{ item.label }}</p>
          </label>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, withDefaults, defineProps, defineEmits, onMounted, onBeforeMount, reactive } from 'vue'

interface SelectOption {
  key: string | number,
  label: string
}

interface Props {
  modelValue?: string | number,
  placeholder?: string,
  expandedKeys?: Array<string> | Array<number>,
  isAccordion?: boolean,
  showSearch?: boolean,
  data: Array<SelectOption>,
}

const props = withDefaults(defineProps<Props>(), {
  treeSelectData: () => [],
  placeholder: '请选择',
  expandedKeys: () => [],
  isAccordion: false,
  showSearch: false,
  data: () => []
})

const emits = defineEmits([
  'update:modelValue',
  'update:expandedKeys',
  'selectItem',
  'input',
  'select'
])

const state = reactive({
  current: '',
  isShow: false
})

const treeRef = ref()
const inputRef = ref()
const treeValue = ref(props.modelValue)
const expandedKeys = ref(props.expandedKeys)

onMounted(() => {
  window.addEventListener('click', clickOther)
})

onBeforeMount(() => {
  window.removeEventListener('click', clickOther)
})

const clickOther = (event: any) => {
  const e = event || window.event
  if (
    treeRef.value &&
    !treeRef.value.contains(e.target) &&
    !inputRef.value.contains(e.target)
  ) {
    state.isShow = false
  }
}

const inputSearch = () => {
  state.isShow = true
  emits('input', state.current)
}




const showPopup = ref(false)
const inputValue = ref<string | undefined>(props.data.find(p => p.key === props.modelValue)?.label)

const select = (item: SelectOption) => {
  inputValue.value = item.label
  emits('update:modelValue', item.key)
  emits('select', item)
}

const input = (e: any) => {
  inputValue.value = e.target.value
  emits('input', e.target.value)
}

</script>

<style scoped lang="less">
.tree-select-main {
  width: 210px;
  position: relative;

  .input-main {
    display: flex;
    background: #fff;
    border-radius: 6px;
    width: inherit;
    height: 36px;

    .select-layout {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-left: 10px;
      font-size: 14px;
    }

    input {
      inset-inline: none;
      border: none;
      outline: none;
      display: block;
      padding: 0;
      height: 18px;
      line-height: 18px;
      width: 170px;
      font-size: 14px;

      &::-webkit-input-placeholder {
        line-height: normal;
        font-size: 12px;
      }

      &:-ms-input-placeholder {
        line-height: normal;
        font-size: 12px;
      }
    }

    .icon-triangle {
      width: 6px;
      height: 6px;
      border-top: 3px solid transparent;
      border-left: 3px solid transparent;
      border-right: 3px solid #2c2d30;
      border-bottom: 3px solid #2c2d30;
      box-sizing: border-box;
      margin-right: 12px;
      transform: rotate(-45deg);
      transition: .4s;
    }

    .icon-open {
      transform: rotate(45deg);
    }
  }

  .tree-main {
    width: inherit;
    overflow: hidden;
    transform: rotate(0deg);
    max-height: 210px;
    position: absolute;
    background: #fff;
    box-shadow: 0 2px 10px 0 #c5c9cf80;
    border-radius: 6px;
    margin-top: 8px;
    overflow-y: auto;
    padding: 6px 0;
    box-sizing: border-box;

    &::-webkit-scrollbar {
      width: 5px;
    }

    &::-webkit-scrollbar-track {
      background: #fff;
      border-radius: 2px;
    }

    &::-webkit-scrollbar-thumb {
      background: #d9dce3;
      border-radius: 2px;
    }
  }
}

.drop-enter-active {
  animation: drop-anim .4s;
}

.drop-leave-active {
  animation: drop-anim .4s reverse;
}

@keyframes drop-anim {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
}






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

    &:hover>p {
      background: var(--theme-o1);
    }
  }

  input[type='radio']:checked+.title-menu::before {
    background: var(--theme-o2);
  }

  input[type='radio']:checked+.title-default>p {
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