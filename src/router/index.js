import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

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
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
