/**
 * 鉴权路由 - 自定义示例
 */
const authActionRoutes = <VueRouter.RouteRecordRaw[]>[
  {
    path: 'action',
    name: 'main-action',
    meta: {
      requiresAuth: true
    },
    component: () => import('views/main/action/index.vue')
  }
]

export default authActionRoutes
