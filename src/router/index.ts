import { createRouter, createWebHistory } from 'vue-router'

//Routes
import Home from '../views/Home.vue'
import Add from '../views/Add.vue'
import NotFound from '../views/NotFound.vue'

const routes = [
  {
    path: '/',
    meta: { title: 'Home' },
    component: Home,
  },
  {
    path: '/add',
    meta: { title: '添加' },
    component: Add,
  },
  {
    path: '/:page',
    component: NotFound,
  },
]

export const Router = createRouter({
  scrollBehavior: () => ({ left: 0, top: 0 }),
  history: createWebHistory(),
  routes,
})
