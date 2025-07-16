/**
 * 鉴权路由 - 全局 (你可以在这个目录下创建其他根据用户权限设定的动态路由)
 */
const authGlobalRoutes = <VueRouter.RouteRecordRaw[]>[
  {
    path: '/main',
    name: 'main',
    meta: {
      requiresAuth: true
    },
    component: () => import('views/main/index.vue'),
    redirect: {
      name: 'main-home'
    },
    children: [
      {
        path: 'home',
        name: 'main-home',
        meta: {
          requiresAuth: true,
          title: '首页'
        },
        component: () => import('views/main/home/index.vue')
      },
      {
        path: 'article',
        name: 'main-article',
        meta: {
          requiresAuth: true,
          title: '文章'
        },
        component: () => import('views/main/article/index.vue')
      },
      {
        path: 'dynamic-form-example',
        name: 'main-dynamic-form-example',
        meta: {
          requiresAuth: true,
          title: '动态表单测试'
        },
        component: () => import('@/views/main/dynamic-form-example/index.vue')
      }
    ]
  }
]

export default authGlobalRoutes
