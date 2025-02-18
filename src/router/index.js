import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import TableTestPage from '@/views/TableTestPage.vue'
import SearchBarTestPage from '@/views/SearchBarTestPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },

    /* [추후 삭제 예정] 테이블 컴포넌트 테스트용으로 만든 페이지입니다. */
    {
      path: '/table',
      name: 'table',
      component: TableTestPage,
    },
    {
      path: '/searchbar',
      name: 'searchbar',
      component: SearchBarTestPage
    }
  ],
})

export default router
