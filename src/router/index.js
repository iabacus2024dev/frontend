import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomePage.vue'
import TableTestPage from '@/views/TableTestPage.vue'
import SearchBarTestPage from '@/views/SearchBarTestPage.vue'
import ProjectPage from '@/views/ProjectPage.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import MemberPage from '@/views/MemberPage.vue'
import PartnersPage from '@/views/PartnersPage.vue'
import PermissionPage from '@/views/PermissionPage.vue'
import SalesPage from '@/views/SalesPage.vue'
import ProfilePage from '@/views/ProfilePage.vue'
import ToolTipComponent from '@/components/common/ToolTipComponent.vue'
import TransferListTestPage from '@/views/TransferListTestPage.vue'
import ProgressBarComponent from '@/components/common/ProgressBarComponent.vue'
import TreeTestPage from '@/views/TreeTestPage.vue'


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

  /* [추후 삭제 예정] 컴포넌트 테스트용으로 만든 페이지들입니다. */
  {
    path: '/table',
    name: 'table',
    component: TableTestPage,
    meta: { layout: DefaultLayout },
  },
  {
    path: '/tooltip',
    name: 'tooltip',
    component: ToolTipComponent,
    meta: { layout: DefaultLayout },
  },
  {
    path: '/progressbar',
    name: 'progressbar',
    component: ProgressBarComponent,
    meta: { layout: DefaultLayout },
  },
  {
    path: '/searchbar',
    name: 'searchbar',
    component: SearchBarTestPage,
    meta: { layout: DefaultLayout },
  },
  {
    path: '/transferList',
    name: 'transferList',
    component: TransferListTestPage,
    meta: { layout: DefaultLayout },
    component: SearchBarTestPage
  },
  {
    path: '/tree',
    name: 'tree',
    component: TreeTestPage,
    meta: { layout: DefaultLayout }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
