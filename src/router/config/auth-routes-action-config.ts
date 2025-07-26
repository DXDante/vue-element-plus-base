/**
 * 鉴权路由 - 自定义示例
 */
const authActionRoutes = <VueRouter.RouteRecordRaw[]>[
  {
    path: 'action',
    name: 'main-action',
    meta: {
      requiresAuth: true,
      title: '权限动态路由示例'
    },
    component: () => import('views/main/action/index.vue')
  }
]

export default authActionRoutes
