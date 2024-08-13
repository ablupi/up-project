<template>
  <div class="views-main">
    <div class="layout-sider">
      <div class="layout-sider-head">
        <img src="../assets/img/logo.png" alt="">
      </div>
      <o-menu :options="treeData" v-model="checkedItem">

      </o-menu>
    </div>
    <router-view v-slot="{ Component }">
      <Transition :name="transitionName">
        <component :is="Component" />
      </Transition>
    </router-view>

  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import OMenu from '@/components/menu/menu-vertical.vue'
import store from '@/store/index'
import { useRouter } from 'vue-router'

const router = useRouter()


// 创建数据
const treeData = ref([
  { key: 'Msg', label: '消息弹窗' },
  { key: 'Modal', label: '对话框' },
  { key: 'Search', label: '搜索' },
  { key: 'Tooltip', label: '文字提示' },
  { key: 'Pagination', label: '分页' },
  { key: 'popover', label: '气泡卡片' },
  { key: 'Select', label: '下拉选择' },
  { key: 'Drawer', label: '抽屉' },
  { key: 'Switch', label: '开关' },
  { key: 'Slider', label: '滑动条' },
  { key: 'Menu', label: '水平菜单' },
  { key: 'Cascader', label: '级联下拉选择器' },
  { key: 'TreeSelect', label: '树选择' },
])
const transitionName = ref()
const checkedItem = ref('Msg')

onMounted(() => {
  console.log(router.options.routes)
  
})

// 在路由守卫中通过meta来判断页面切换时的方向
router.beforeEach((to: any, from: any) => {
  if (to.meta.index > from.meta.index) {
    transitionName.value = 'slide-right'
  }
  else if (to.meta.index < from.meta.index) {
    transitionName.value = 'slide-left'
  }
  else {
    transitionName.value = ''
  }
})


</script>

<style lang="less" scoped>
.views-main {
  display: flex;
  position: relative;

  // height: 100vh;
  // width: 100vw;
  .layout-sider {
    background: #fff;
    height: 100%;

    .layout-sider-head {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100px;
      border-bottom: 1px solid var(--border-color);

      img {
        height: 80px;
      }
    }
  }
}

// 编写页面切换动画
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.5s;
}
.slide-right-enter-from {
  transform: translateX(100%);
}
.slide-right-enter-to {
  transform: translateX(0);
}
.slide-right-leave-from {
  transform: translateX(0);
}
.slide-right-leave-to {
  transform: translateX(-100%);
}

.slide-left-enter-from {
  transform: translateX(-100%);
}
.slide-left-enter-to {
  transform: translateX(0);
}
.slide-left-leave-from {
  transform: translateX(0);
}
.slide-left-leave-to {
  transform: translateX(100%);
}
</style>