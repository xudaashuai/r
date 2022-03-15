import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Add from '../views/Add.vue'

const routes = [
  {
    path: '/',
    meta: { title: '首页' },
    component: Home,
  },
  {
    path: '/add',
    meta: { title: '添加' },
    component: Add,
  },
]

export const Router = createRouter({
  scrollBehavior: () => ({ left: 0, top: 0 }),
  history: createWebHistory(),
  routes,
})
