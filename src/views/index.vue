<template>
  <div class="system-main">
    <div class="layout-sider">
      <div class="layout-sider-head">
        <img src="../assets/img/logo.png" alt="">
      </div>
      <o-menu :options="treeData" v-model="checkedItem" @change="menuChange">

      </o-menu>
    </div>
    <div class="layout-content">
      <router-view v-slot="{ Component }">
        <Transition :name="transitionName">
          <component :is="Component" />
        </Transition>
      </router-view>

    </div>

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
  { key: 'VerifyCode', label: '验证码输入框' },
  { key: 'Steps', label: '步骤条' },
  { key: 'Icon', label: '图标' },
])
const transitionName = ref()
const checkedItem = ref(store.getters.getMenuKey) || 'NumberInput'

// 在路由守卫中通过meta来判断页面切换时的方向
router.beforeEach((to: any, from: any) => {
  console.log(to)
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

const menuChange = () => {
  // console.log(checkedItem.value)
}


</script>

<style lang="less" scoped>
.system-main {
  display: flex;
  position: relative;
  background-image: none;
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
      margin-bottom: 10px;

      img {
        height: 80px;
      }
    }
  }
  .layout-content {
    overflow: hidden;
    display: flex;
    position: relative; 
    flex-grow: 1;
    height: 100vh;

    &::before {
    content: "";
    z-index: -1;
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: url(../assets/img/common_bg.jpg) no-repeat;
    // background-color: #ec846433;
    background-size:cover;
    // background-size: 100% auto;
    background-position: center;
    // backdrop-filter: blur(100px);
    // -webkit-backdrop-filter: blur(100px);
    // filter: blur(2px);
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