import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/layout'),
      children: [
        {
          path: '/users',
          name: 'users',
          component: () => import('@/views/users')
        },
        {
          path: '/rights',
          name: 'rights',
          component: () => import('@/views/rights')
        },
        {
          path: '/reports',
          name: 'reports',
          component: () => import('@/views/reports')
        },
        {
          path: '/orders',
          name: 'orders',
          component: () => import('@/views/orders')
        },
        {
          path: '/goods',
          name: 'goods',
          component: () => import('@/views/goods')
        },
        {
          path: '/roles',
          name: 'roles',
          component: () => import('@/views/roles')
        },
        {
          path: '/categories',
          name: 'categories',
          component: () => import('@/views/categories')
        },
        {
          path: '/params',
          name: 'params',
          component: () => import('@/views/params')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login')
    }
  ]
})
router.beforeEach((to, from, next) => {
  const userInfo = window.sessionStorage.getItem('token')
  if (to.path !== '/login') {
    if (!userInfo) {
      next({ name: 'login' })
    } else {
      next()
    }
  } else {
    if (userInfo) {
      next(false)
    } else {
      next()
    }
  }
})
export default router
