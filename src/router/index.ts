import { createRouter, createWebHistory } from 'vue-router'
import examManage from '../views/dataManage/examManage.vue'
import classManage from '../views/dataManage/classManage.vue'
import examRoomManage from '../views/dataManage/examRoomManage.vue'
import examArrange from '../views/tools/examArrange.vue'
import studentManage from '../views/dataManage/studentManage.vue'
import examRoomSeatManage from '../views/dataManage/examRoomSeatManage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: examManage,
    },
    {
      path: '/dataManage',
      name: 'dataManage',
      children: [
        {
          path: 'exam',
          name: 'exam',
          component: examManage,
        },
        {
          path: 'class', 
          name: 'class',
          component: classManage,
        },
        {
          path: 'examRoom',
          name: 'examRoom', 
          component: examRoomManage,
        },
        {
          path: 'student',
          name: 'student', 
          component: studentManage,
        },
        {
          path: 'examRoomSeat',
          name: 'examRoomSeat', 
          component: examRoomSeatManage,
        },
      ]
    },
    {
      path: '/tools',
      name: 'tools',
      children: [
        {
          path: 'examArrange',
          name: 'examArrange',
          component: examArrange,
        }
      ]
    },
    // {
    //   // path: '/about',
    //   // name: 'about',
    //   // // route level code-splitting
    //   // // this generates a separate chunk (About.[hash].js) for this route
    //   // // which is lazy-loaded when the route is visited.
    //   // component: () => import('@/views/AboutView.vue'),
    // },
  ],
})

export default router
