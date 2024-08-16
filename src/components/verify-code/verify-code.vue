<template>
  <button class="verify-code-main" @click="focus" @blur="blur">
    <div 
      class="code-item"
      :class="{ 'code-item-input': count.isInput }"
      v-for="(count, index) in countList"
      :key="index">
      {{ count.num }}
    </div>
  </button>
</template>

<script lang="ts" setup>
import { ref, defineEmits, defineProps,withDefaults, onMounted, computed } from 'vue'

interface VerifyOption {
  num?: number | string
  isInput: boolean
}

interface Props {
  counts: number
  type?: string
}

const props = withDefaults(defineProps<Props>(), {
  counts: 6,
  type: 'default'   // default: 字母数字，number: 纯数字
})

const emits = defineEmits(['verifyEvent', 'change'])

const countList = ref<Array<VerifyOption>>(
  Array.from(Array(props.counts), () => ({ num: '', isInput: false }))
)

const count = computed(() => countList.value.map(p => p.num).join(''))

onMounted(() => {
  document.onkeydown = inputCode
})

const inputCode = (e: any) => {
  // 回退
  if (e.keyCode === 8) {
    countList.value.reduce((prev, cur) => {
      if (!cur.num) {
        prev.num = ''
      }
      return cur
    }, {} as VerifyOption)
    focus()
    return
  }
  switch (props.type) {
    case 'number':
      if (e.keyCode < 48 || (e.keyCode > 57 && e.keyCode  < 96) || e.keyCode > 105)
        return
      break;
    default:
      if (e.keyCode < 48 || (e.keyCode > 57 && e.keyCode  < 65) || (e.keyCode > 90 && e.keyCode  < 96) || e.keyCode > 105)
        return  
      break;
  }
  for (const [index, item] of countList.value.entries()) {
    if (!item.num) { 
      item.num = e.key
      focus()
      if (index === props.counts - 1)
        emits('verifyEvent', count.value)
      break
    }
  }
}

const focus = () => {
  let flag = true
  for (const item of countList.value) {
    if ((item.num !== '' && flag) || (item.num === '' && !flag)) {
      item.isInput = false
    }
    else {
      item.isInput = true
      flag = false
    }
  }
  emits('change', count.value)
}

const blur = () => {
  for (const item of countList.value) {
    item.isInput = false
  }
}
</script>

<style lang="less" scoped>
.verify-code-main {
  border: none;
  background: none;
  outline: none;
  display: flex;
  gap: 12px;
  .code-item {
    height: 50px;
    width: 50px;
    border-radius: 5px;
    background: #f8f8f8;
    border: 1px solid #d6d6d6;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    color: var(--grey);
    cursor: text;
    transition: .4s;
  }
  .code-item-input {
    &::before {
      content: "";
      height: 20px;
      width: 2px;
      background: #bbbbbb;
      animation: input-line-anim 0.6s linear infinite alternate;
    }
  }

  &:hover, &:focus {
    .code-item {
      border-color: var(--theme);
    }
  }
}

@keyframes input-line-anim {
  0% {
    opacity: 1;
  }
  30% {
    opacity: 1;
  }
  70% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}
</style>