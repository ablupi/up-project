<template>
  <div class="views-main">
    <div class="layout-head">
      <o-menu v-model="menuKey" :options="menuOptions"></o-menu>
    </div>
    <div class="layout-main">
      <!-- <router-view/> -->
      <router-view v-slot="{ Component }">
        <Transition :name="transitionName">
          <component :is="Component"/>
        </Transition>
      </router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import OMenu from '@/components/menu/menu.vue'
import store from '@/store/index'
import { useRouter } from 'vue-router'

const router = useRouter()

// 从store中获取全局的菜单key
const menuKey = ref(store.getters.getMenuKey)

const menuOptions = ref([
  { key: 'home', title: '首页', checked: false, link: 'Home' },
  { key: 'news', title: '新闻中心', checked: false, link: 'News' },
  { key: 'about', title: '关于', checked: false, link: 'About' },
  { key: 'contact', title: '联系我们', checked: false, link: 'Contact', children: [
    { key: 'contact', title: '联系我们', checked: false, link: 'Contact' },
    { key: 'recruit', title: '招贤纳士', checked: false, link: 'Recruit' },
  ]},
])

const transitionName = ref()

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

<style scoped lang="less">
.views-main {
  flex-direction: column;
  .layout-head {
    width: 400px;
    display: flex;
    justify-content: center;
    height: 60px;
    background: #fff;
    border-radius: 4px 4px 0 0;
  }
  .layout-main {
   height: 300px;
   width: 400px;
   background-color: #00000028;
   display: flex;
   overflow: hidden;
   position: relative; 
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