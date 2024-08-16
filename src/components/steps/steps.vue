<template>
  <div class="steps-main" :class="{ 'steps-main-vertical': direction === 'vertical' }">
    <div 
      class="step-item-layout" 
      :class="{ finish: itemsStatus[index] }"
      v-for="(item, index) in items"
      :key="index">
      <div class="step-line" ref="lineEls"></div>
      <div class="step-item">
        <p>{{ item.title }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, withDefaults, onMounted, watch } from 'vue'

export interface StepsOption {
  title: string
  status?: boolean
  key: string
}

interface Props {
  items: Array<StepsOption>
  current?: string | number
  direction?: string
}

const props = withDefaults(defineProps<Props>(), {
  items: () => [],
  direction: 'horizontal'   // 默认水平，可选 horizontal | vertical
})

const lineEls = ref()
const itemsStatus = ref<Array<boolean>>(
  Array(props.items.length).fill(false)
)

watch(() => props.current, () => {
  update()
})

onMounted(() => {
  // 将多余的line删除
  const lastLine = lineEls.value.shift()
  lastLine.style.display = 'none'
  update()
})

const update = () => {
  let flag = true
  for (const [index, item] of props.items.entries()) {
    itemsStatus.value[index] = flag
    if (item.key === props.current) flag = false
  }
}
</script>

<style lang="less" scoped>
.steps-main {
  display: flex;
  align-items: center;
  margin: 0 40px;
  .step-item-layout {
    display: flex;
    align-items: center;
    .step-item {
      background: transparent;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      display: flex;
      position: relative;
      justify-content: center;
      align-items: center;
      transition: .3s all;
      p {
        position: absolute;
        font-size: 14px;
        color: #2c2d30;
        line-height: 18px;
        top: 24px;
        text-align: center;
        min-width: 160px;
      }
      &::before {
        content: "";
        height: 8px;
        width: 8px;
        background: #d9d9d9;
        border-radius: 50%;
      }
      
    }
    
    .step-line {
      width: 160px;
      height: 1px;
      background: #d9d9d9;
    }
  }
  .finish {
    .step-item {
      background: var(--theme);
      &::before {
        background: #fff;
      }
    }
    .step-line {
      background: var(--theme);
    }
  }
}
.steps-main-vertical {
  flex-direction: column;
  .step-item-layout {
    flex-direction: column;
    .step-item {
      p {
        top: initial;
        left: 36px;
        text-align: left;
      }
    }
  }
  .step-line {
    height: 160px !important;
    width: 1px !important;
  }
}
</style>