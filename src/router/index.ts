import { createRouter, RouteRecordRaw, createWebHashHistory } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    name: 'Index',
    component: () => import('@/views/index.vue'),
    redirect: '/modal',
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
