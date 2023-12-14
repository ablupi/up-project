import { createRouter, RouteRecordRaw, createWebHashHistory } from 'vue-router'
import store from '../store/index'

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    name: 'Index',
    component: () => import('@/views/index.vue'),
    redirect: '/treeSelect',
    children: [
      // 消息弹窗
      {
        path: '/msg',
        name: 'Msg',
        component: () => import('@/views/message/message.vue'),
      },
      // 对话框
      {
        path: '/modal',
        name: 'Modal',
        component: () => import('@/views/modal/modal.vue'),
      },
      // 输入框
      {
        path: '/search',
        name: 'Search',
        component: () => import('@/views/search/search.vue'),
      },
      // 文字提示/消息提示/提示框
      {
        path: '/tooltip',
        name: 'Tooltip',
        component: () => import('@/views/tooltip/tooltip.vue'),
      },
      // 分页
      {
        path: '/pagination',
        name: 'Pagination',
        component: () => import('@/views/pagination/pagination.vue'),
      },
      // 气泡卡片
      {
        path: '/popover',
        name: 'popover',
        component: () => import('@/views/popover/popover.vue'),
      },
      // 下拉选择
      {
        path: '/select',
        name: 'Select',
        component: () => import('@/views/select/select.vue'),
      },
      // 抽屉
      {
        path: '/drawer',
        name: 'Drawer',
        component: () => import('@/views/drawer/drawer.vue'),
      },
      // 开关
      {
        path: '/switch',
        name: 'Switch',
        component: () => import('@/views/switch/switch.vue'),
      },
      // 滑动条
      {
        path: '/slider',
        name: 'Slider',
        component: () => import('@/views/slider/slider.vue'),
      },
      // 水平菜单
      {
        path: '/menu',
        name: 'Menu',
        component: () => import('@/views/menu/menu.vue'),
        // 需要自行添加测试用的页面用来跳转，
        // 因为菜单需要高度绑定路由跳转来实现切换，如果只是样式上切换的话就没什么意义了
        redirect: '/menu/home',
        children: [
          {
            path: '/menu/home',
            name: 'Home',
            component: () => import('@/views/menu/route/home.vue'),
            // meta字段用于页面切换过度动画，后续会用到
            meta: {
              index: 1
            },
          },
          {
            path: '/menu/news',
            name: 'News',
            component: () => import('@/views/menu/route/news.vue'),
            meta: {
              index: 2
            },
          },
          {
            path: '/menu/about',
            name: 'About',
            component: () => import('@/views/menu/route/about.vue'),
            meta: {
              index: 3
            },
          },
          {
            path: '/menu/contact',
            name: 'Contact',
            component: () => import('@/views/menu/route/contact.vue'),
            meta: {
              index: 4
            },
          },
          {
            path: '/menu/recruit',
            name: 'Recruit',
            component: () => import('@/views/menu/route/recruit.vue'),
            meta: {
              index: 5
            },
          },
        ]
      },
      // 级联下拉选择器
      {
        path: '/cascader',
        name: 'Cascader',
        component: () => import('@/views/cascader/cascader.vue'),
      },
      // 树形组件
      {
        path: '/tree',
        name: 'Tree',
        component: () => import('@/views/tree/tree.vue'),
      },
      // 树选择组件
      {
        path: '/treeSelect',
        name: 'TreeSelect',
        component: () => import('@/views/treeSelect/treeSelect.vue'),
      },
    ]
  },
]

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHashHistory(import.meta.env.BASE_URL), //修改后
  routes,
})

router.beforeEach((to, from, next) => {
  // 在路由守卫中存储菜单key
  store.commit('setMenuKey', to.name)
  next()
})


export default router
