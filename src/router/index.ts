import { createRouter, createWebHistory } from 'vue-router'
import examManage from '../views/examManage.vue'
import classManage from '../views/classManage.vue'
import examRoomManage from '../views/examRoomManage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: examManage,
    },
    {
      path: '/exam',
      name: 'exam',
      component: examManage,
    },
    {
      path: '/class',
      name: 'class',
      component: classManage,
    },
    {
      path: '/examRoom',
      name: 'examRoom',
      component: examRoomManage,
    }
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
