import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Search from '../views/Search.vue'

const routes = [
  {
    path: '/.well-known/jejune',
    name: 'Home',
    component: Home
  },
  {
    path: '/.well-known/jejune/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/.well-known/jejune/search',
    name: 'Search',
    component: Search
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
