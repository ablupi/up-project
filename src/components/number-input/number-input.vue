<template>
  <div class="count-layout">
    <div class="count-input">
      <button class="count-icon-layout">
        <svg-icon class="count-icon" :class="{ 'no-count-icon': isNoDeduct }" name="jian" w="16px" h="16px"
          color="#2C2D30" @click="deductCount">
        </svg-icon>
      </button>
      <!-- 是否可输入，如果允许输入就要验证，注释保留 -->
      <!-- <input type="text" class="count" v-model="count"> -->
      <p class="count">{{ count }}</p>
      <button class="count-icon-layout">
        <svg-icon class="count-icon" :class="{ 'no-count-icon': isNoAdd }" name="jia" w="16px" h="16px" color="#2C2D30"
          @click="addCount">
        </svg-icon>
      </button>
    </div>
    <!-- 数量说明，注释保留 -->
    <!-- <p class="count-msg">数量说明数量说明数量说明数量说明数量说明</p> -->
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits, onMounted, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Number,
    required: true
  },
})

const emits = defineEmits(['update:modelValue', 'change'])

const isNoDeduct = ref(false)
const isNoAdd = ref(false)
const count = ref(1)

watch(count, (value) => {
  if (value <= 1) isNoDeduct.value = true
  else isNoDeduct.value = false
})

onMounted(() => {
  if (count.value <= 1) isNoDeduct.value = true
  count.value = props.modelValue
})

const deductCount = () => {
  if (count.value <= 1)
    return
  count.value--
  emits('update:modelValue', count.value)
  emits('change', count.value)
}
const addCount = () => {
  count.value++
  emits('update:modelValue', count.value)
  emits('change', count.value)
}

</script>

<style lang="less" scoped>
.count-layout {
  display: flex;
  align-items: center;
  

  .count-input {
    height: 48px;
    border: 1px solid #E1E1E1;
    display: flex;
    align-items: center;
    padding: 0 18px;
    box-sizing: border-box;
    border-radius: 8px;
    margin-right: 24px;
    background: #fff;

    .count {
      background: none;
      border: none;
      outline: none;
      width: 30px;
      text-align: center;
      margin: 0 8px;
      font-size: 16px;
    }

    .count-icon-layout {
      background: none;
      border: none;
      outline: none;
      width: 32px;
      height: 32px;
      background: #FAFAFA;
      border-radius: 4px;
      display: flex;
      justify-content: center;
      align-items: center
    }

    .count-icon {
      cursor: pointer;
      transition: .3s;
      // 会影响禁止样式的颜色
      // &:hover {
      //   color: #000 !important;
      // }
    }

    .no-count-icon {
      cursor: not-allowed;
      color: #D9D9D9 !important;
    }
  }

  .count-msg {
    font-size: 12px;
    color: var(--grey);
    width: 120px;
    text-overflow: ellipsis;
    overflow: hidden;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    display: -webkit-box;
  }
}
</style>