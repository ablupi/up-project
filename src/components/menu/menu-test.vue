<template>
  <div class="menu-dashboard">
    <div 
      v-for="item in options" 
      :key="item.key" 
      style="height: inherit;" 
      ref="menuItemEls" 
      :value="item.checked">
      <div class="menu-item" @click="linkRoute(item, $event)">
        <p>{{item.title}}</p>
        <div class="popup">
          <div 
            class="popup-item" 
            v-for="child in item.children" 
            :key="child.key"
            @click="linkRoute(child, $event)">
            {{  child.title  }}
          </div>
        </div>
      </div>
    </div>
    <div 
      class="menu-item-line" 
      :style="{
        width: itemWidth,
        left: lineLeft,
      }">
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, defineProps, defineEmits, watch, reactive, ref } from 'vue'
import { useRouter } from "vue-router";

const router = useRouter()

interface MenuOption {
  key: string,
  title: string,
  checked: boolean,
  link: string,
  props?: object,
  children?: Array<MenuOption>
}


interface Props {
  modelValue?: string,
  options: Array<MenuOption>,
}

const props = withDefaults(defineProps<Props>(), {
  options: () => []
})

const emit = defineEmits(['update:modelValue', 'change'])

const state = reactive({
  isFirstLoad: true,
})

const itemWidth = ref('0')
const lineLeft = ref('0')
const menuItemEls = ref()

watch(() => router.currentRoute.value, (value: any) => {
  // 防止首次加载时重复加载
  if (state.isFirstLoad) {
    state.isFirstLoad = false
    return
  }
  checkMenu(value.name, props.options)
  setTimeout(() => {
    calcItemWidth()
  }, 100);
  
},{ deep: true, immediate: true })

onMounted(() => {
  const topPath = props.modelValue || 'Home'
  checkMenu(topPath, props.options)
  setTimeout(() => {
    calcItemWidth()
  }, 100);
})

const linkRoute = (menu: MenuOption, e: any) => {
  e.stopPropagation();
  // props用于给url传递参数，需要配合route的props参数  
  if (menu.props) 
    router.push({name: menu.link, params: {...menu.props}})
  else
    router.push({name: menu.link})
  emit('update:modelValue', menu.link)
  emit('change')
}

const checkMenu = (name: string, menu: Array<MenuOption>, flag = 'main') => {
  for (const item of menu) {
    item.checked = false
    if (item.link === name && flag === 'node') {
      return true
    }
    else if (item.link === name && flag === 'main') {
      item.checked = true
    }
    if (item.children) {
      if (checkMenu(name, item.children, 'node'))  {
        item.checked = true
      }
    }
  }
  return false
}

const calcItemWidth = () => {
  let isChecked = false
  lineLeft.value = '0'
  let thisLineLeft = 0
  for (const item of menuItemEls.value) {
    isChecked = JSON.parse(item.getAttribute('value'))
    if (isChecked) {
      itemWidth.value = item.clientWidth + 'px'
      break;
    }
    else {
      thisLineLeft = thisLineLeft + item.clientWidth
    }
  }
  lineLeft.value = thisLineLeft+'px'
}

</script>
<style lang="less" scoped>
.menu-dashboard {
  height: inherit;
  display: flex;
  position: relative;
  .menu-item {
    position: relative;
    font-size: 14px;
    color: #000;
    padding: 0 20px;
    display: flex;
    height: inherit;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    cursor: pointer;
    & > p {
      font-size: 14px;
      color: #000;
    }
    
    &:hover {
      .popup {
        transform: scaleY(1);
      }
    }
    .popup {
      position: absolute;
      background: #fff;
      transition: .3s;
      top: 64px;
      transform: scaleY(0);
      transform-origin: top;
      z-index: 99;
      border-radius: 4px;
      .popup-item {
        height: 36px;
        box-sizing: border-box;
        padding: 0 22px;
        font-size: 14px;
        color: #27282B;
        line-height: 36px;
        margin: 5px;
        border-radius: 4px;
        cursor: pointer;
        transition: .4s;
        &:hover {
          background: var(--theme-o2);
        }
      }
    }

  }
  .menu-item-line {
    position: absolute;
    bottom: 0;
    height: 3px;
    background: var(--theme);
    left: 0;
    transition: .4s;
    border-radius: 2px;
  }
}
</style>