import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '@/store/index'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  }, 
  {
    path: '/itemMusic',
    name: 'ItemMusic',
    component: () => import('../views/ItemMusic.vue') //路由懒加载
  }, 
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/Search.vue') //路由懒加载
  }
  , 
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue') //路由懒加载
  }, 
  {
    path: '/userInfo',
    name: 'UserInfo',
    component: () => import('../views/userInfo.vue') ,//路由懒加载
    beforeEnter(to,from,next) {
      if(store.state.isLogin==true) {
        next()
      }else {
        next('/login')
      }
    }
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to,from)=> {
  if(to.path=='/login') {  //判断在登陆页面不展示底部组件
    store.commit('updateIsShowFooterMusic',false)
  }else {
    store.commit('updateIsShowFooterMusic',true)
  }
})
export default router
