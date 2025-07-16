/**
 * 基础路由
 */
const baseRoutes = <VueRouter.RouteRecordRaw[]>[
  {
    path: '/',
    redirect: {
      name: 'sign-in'
    }
  },
  {
    path: '/sign-in',
    name: 'sign-in',
    meta: {
      title: '登录'
    },
    component: () => import('views/sign-in/index.vue')
  }
]

export default baseRoutes
