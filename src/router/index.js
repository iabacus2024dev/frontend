import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomePage.vue'
import TableTestPage from '@/views/TableTestPage.vue'
import ProjectPage from '@/views/ProjectPage.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import MemberPage from '@/views/MemberPage.vue'
import PartnersPage from '@/views/PartnersPage.vue'
import PermissionPage from '@/views/PermissionPage.vue'
import SalesPage from '@/views/SalesPage.vue'
import ProfilePage from '@/views/ProfilePage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { layout: DefaultLayout },
  },
  {
    path: '/projects',
    name: 'projects',
    component: ProjectPage,
    meta: { layout: DefaultLayout, activeIndex: 0 },
  },
  {
    path: '/members',
    name: 'members',
    component: MemberPage,
    meta: { layout: DefaultLayout, activeIndex: 1 },
  },
  {
    path: '/partners',
    name: 'partners',
    component: PartnersPage,
    meta: { layout: DefaultLayout, activeIndex: 2 },
  },
  {
    path: '/sales',
    name: 'sales',
    component: SalesPage,
    meta: { layout: DefaultLayout, activeIndex: 3 },
  },
  {
    path: '/permissions',
    name: 'permissions',
    component: PermissionPage,
    meta: { layout: DefaultLayout, activeIndex: 4 },
  },
  {
    path: '/profiles',
    name: 'profiles',
    component: ProfilePage,
    meta: { layout: DefaultLayout, activeIndex: 5 },
  },
  /* [추후 삭제 예정] 테이블 컴포넌트 테스트용으로 만든 페이지입니다. */
  {
    path: '/table',
    name: 'table',
    component: TableTestPage,
    meta: { layout: DefaultLayout },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
