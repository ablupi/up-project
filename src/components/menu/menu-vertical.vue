<template>
  <div class="tree-main">
    <o-tree 
      :tree-options="treeOptions" 
      is-accordion 
      type="menu" 
      @click-item="linkRoute" 
      v-model="checkedKey"
      id="menu"
      >
    </o-tree>
  </div>
</template>

<script setup lang="ts">
import OTree, { TreeOption } from '@/components/tree/tree.vue'
import { ref, defineEmits, defineProps, withDefaults, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

interface Props {
  modelValue?: string,
  options: Array<TreeOption>
}

const props = withDefaults(defineProps<Props>(),{
  options: () => []
})

const emits = defineEmits(['update:modelValue', 'change'])

const isFirstLoad = ref(true)
const checkedKey = ref(props.modelValue)
const treeOptions = ref(props.options)

// 需要监听路由跳转
watch(() => router.currentRoute.value, (value: any) => {
  // 防止首次加载时重复加载，需价格判断
  if (isFirstLoad.value) {
    isFirstLoad.value = false
    return
  }
  checkMenu(value.name, treeOptions.value)
}, { deep: true, immediate: true })

onMounted(() => {
  const topPath = checkedKey.value || 'Home'
  checkMenu(topPath, treeOptions.value)

})

// 菜单点击函数
const checkMenu = (name: string, menu: Array<TreeOption>, flag = 'main') => {
  for (const item of menu) {
    item.isChecked = false
    if (item.key === name && flag === 'node') {
      return true
    }
    else if (item.key === name && flag === 'main') {
      item.isChecked = true
    }
    // 需要判断是否有子项，并递归
    if (item.children) {
      if (checkMenu(name, item.children, 'node')) {
        item.isChecked = true
      }
    }
  }
  return false
}

// 路由跳转函数
const linkRoute = (menu: TreeOption) => {
  // 防止事件冒泡
  // e.stopPropagation()
  // props用于给url传递参数，需要配合route的props参数
  // if (menu.props)
  //   router.push({ name: menu.key.toString(), params: {...menu.props} })
  // else 
    router.push({ name: menu.key.toString() })
  emits('update:modelValue', menu.key)
  emits('change')
}

</script>

<style scoped lang="less">
.tree-main {
  background: #fff;
  width: 240px;

  & /deep/ .item-box {
    --tree-item-height: 40px !important;
  }

}
</style>