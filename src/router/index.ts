import { createRouter, RouteRecordRaw, createWebHashHistory } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    name: 'Index',
    component: () => import('@/views/index.vue'),
    redirect: '/drawer',
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
    ]
  },
]

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHashHistory(import.meta.env.BASE_URL), //修改后
  routes,
})

router.beforeEach((to, from, next) => {
  next()
})


export default router
