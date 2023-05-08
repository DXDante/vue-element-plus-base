
/**
 * 基础路由
 */
export const baseRoutes = <VueRouter.RouteRecordRaw[]>[
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
  },
  {
    path: '/404',
    name: 'not-found',
    meta: {
      title: '啊喔'
    },
    component: () => import('views/not-found/index.vue')
  }
]

/**
 * 鉴权路由
 */
export const authRoutes = <VueRouter.RouteRecordRaw[]>[
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
      }
    ]
  }
]