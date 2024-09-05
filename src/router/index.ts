import { createRouter, RouteRecordRaw, createWebHistory, createWebHashHistory } from 'vue-router'
import store from '../store/index'

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    name: 'Index',
    component: () => import('@/views/index.vue'),
    redirect: '/menu-vertical',
    children: [
      // 消息弹窗
      {
        path: '/msg',
        name: 'Msg',
        component: () => import('@/views/message/message.vue'),
        meta: {
          index: 1,
          parent: 'Index'
        },
      },
      // 对话框
      {
        path: '/modal',
        name: 'Modal',
        component: () => import('@/views/modal/modal.vue'),
        meta: {
          index: 2,
          parent: 'Index'
        },
      },
      // 输入框
      {
        path: '/search',
        name: 'Search',
        component: () => import('@/views/search/search.vue'),
        meta: {
          index: 3,
          parent: 'Index'
        },
      },
      // 文字提示/消息提示/提示框
      {
        path: '/tooltip',
        name: 'Tooltip',
        component: () => import('@/views/tooltip/tooltip.vue'),
        meta: {
          index: 4,
          parent: 'Index'
        },
      },
      // 分页
      {
        path: '/pagination',
        name: 'Pagination',
        component: () => import('@/views/pagination/pagination.vue'),
        meta: {
          index: 5,
          parent: 'Index'
        },
      },
      // 气泡卡片
      {
        path: '/popover',
        name: 'popover',
        component: () => import('@/views/popover/popover.vue'),
        meta: {
          index: 6,
          parent: 'Index'
        },
      },
      // 下拉选择
      {
        path: '/select',
        name: 'Select',
        component: () => import('@/views/select/select-reset.vue'),
        meta: {
          index: 7,
          parent: 'Index'
        },
      },
      // 抽屉
      {
        path: '/drawer',
        name: 'Drawer',
        component: () => import('@/views/drawer/drawer.vue'),
        meta: {
          index: 8,
          parent: 'Index'
        },
      },
      // 开关
      {
        path: '/switch',
        name: 'Switch',
        component: () => import('@/views/switch/switch.vue'),
        meta: {
          index: 9,
          parent: 'Index'
        },
      },
      // 滑动条
      {
        path: '/slider',
        name: 'Slider',
        component: () => import('@/views/slider/slider.vue'),
        meta: {
          index: 10,
          parent: 'Index'
        },
      },
      // 水平菜单
      {
        path: '/menu',
        name: 'Menu',
        component: () => import('@/views/menu/menu.vue'),
        // 需要自行添加测试用的页面用来跳转，
        // 因为菜单需要高度绑定路由跳转来实现切换，如果只是样式上切换的话就没什么意义了
        redirect: '/menu/home',
        meta: {
          index: 11,
          parent: 'Index'
        },
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
        meta: {
          index: 12,
          parent: 'Index'
        },
      },
      // 树形组件
      {
        path: '/tree',
        name: 'Tree',
        component: () => import('@/views/tree/tree.vue'),
        meta: {
          index: 13,
          parent: 'Index'
        },
      },
      // 树选择
      {
        path: '/treeSelect',
        name: 'TreeSelect',
        component: () => import('@/views/treeSelect/treeSelect.vue'),
        meta: {
          index: 14,
          parent: 'Index'
        },
      },
      // 级联树
      {
        path: '/treeCascader',
        name: 'TreeCascader',
        component: () => import('@/views/tree/tree-cascader.vue'),
        meta: {
          index: 15,
          parent: 'Index'
        },
      },
      // 垂直菜单
      {
        path: '/menu-vertical',
        name: 'menuVertical',
        component: () => import('@/views/menu/menu-vertical.vue'),
        meta: {
          index: 16,
          parent: 'Index'
        },
      },
      // 验证码输入框
      {
        path: '/verify-code',
        name: 'VerifyCode',
        component: () => import('@/views/verify-code/verify-code.vue'),
        meta: {
          index: 17,
          parent: 'Index'
        },
      },
      // 验证码输入框
      {
        path: '/number-input',
        name: 'NumberInput',
        component: () => import('@/views/number-input/number-input.vue'),
        meta: {
          index: 18,
          parent: 'Index'
        },
      },
      // 验证码输入框
      {
        path: '/steps',
        name: 'Steps',
        component: () => import('@/views/steps/steps.vue'),
        meta: {
          index: 19,
          parent: 'Index'
        },
      },
      // 验证码输入框
      {
        path: '/icon',
        name: 'Icon',
        component: () => import('@/views/icon/icon.vue'),
        meta: {
          index: 20,
          parent: 'Index'
        },
      },
      
    ]
  },
]

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHashHistory(import.meta.env.BASE_URL), //修改后
  routes,
})

router.beforeEach((to, from, next) => {
  // 在路由守卫中存储菜单key
  store.commit('setMenuKey', to.name)
  next()
})


export default router
