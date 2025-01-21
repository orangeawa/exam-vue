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
    },
    {
      path: '/dataManage',
      name: 'dataManage',
      children: [
        {
          path: 'class',
          name: 'class',
          component: () => import('@/views/dataManage/Class.vue')
        },
        {
          path: 'student',
          name: 'student',
          component: () => import('@/views/dataManage/Student.vue')
        },
        {
          path: 'exam',
          name: 'exam',
          component: () => import('@/views/dataManage/Exam.vue')
        },
        {
          path: 'examRoom',
          name: 'examRoom',
          component: () => import('@/views/dataManage/ExamRoom.vue')
        },
        {
          path: 'examSchedule',
          name: 'examSchedule',
          component: () => import('@/views/dataManage/ExamSchedule.vue')
        }
      ]
    },
    {
      path: '/tools',
      name: 'tools',
      children: [
        {
          path: 'examArrange',
          name: 'examArrange',
          component: () => import('@/views/tools/ExamArrange.vue')
        }
      ]
    }
  ],
})

export default router
