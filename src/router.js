import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/home',
      name: '/home',
      component: () => import('@/views/layout')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login')
    }
  ]
})
router.beforeEach((to, from, next) =>{
  const userInfo = window.sessionStorage.getItem('token')
  if (to.path !== '/login') {
    if (!userInfo) {
      next({name: 'login'})
    }else{
      next()
    }
  }else{
    if (userInfo) {
      next(false)
    }else{
      next()
    }
  }
})
export default router