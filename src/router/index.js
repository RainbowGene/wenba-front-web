import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: "layout",
      component: () => import('@/views/Layout.vue'),
    },
    // {
    //   path: "/:pathMatch(.*)*",
    //   name: "错误页",
    //   component: () => import("@/views/Error404.vue")
    // }
  ]
})

export default router
