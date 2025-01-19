import { createRouter, createWebHistory } from 'vue-router'
import classManage from '../views/dataManage/Class.vue'
import studentManage from '../views/dataManage/Student.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: classManage,
    },
    {
      path: '/dataManage/class',
      name: 'classManage',
      component: classManage,
    },
    {
      path: '/dataManage/student',
      name: 'studentManage',
      component: studentManage,
    }
  ],
})

export default router
