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
import ProgressBarComponent from '@/components/common/ProgressBarComponent.vue'
import TreeTestPage from '@/views/TreeTestPage.vue'
import ToolTipTestPage from '@/views/ToolTipTestPage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
    meta: {
      layout: DefaultLayout,
      title: '대시보드',
      breadcrumbs: [
        {
          title: '홈',
          disabled: true,
        },
      ],
    },
  },
  {
    path: '/projects',
    name: 'projects',
    component: ProjectPage,
    meta: {
      menu: true,
      layout: DefaultLayout,
      activeIndex: 0,
      title: '프로젝트 관리',
      breadcrumbs: [
        {
          title: '홈',
          disabled: false,
          to: {
            name: 'home',
          },
        },
        {
          title: '프로젝트 관리',
          disabled: true,
        },
      ],
    },
  },
  {
    path: '/members',
    name: 'members',
    component: MemberPage,
    meta: {
      menu: true,
      layout: DefaultLayout,
      activeIndex: 1,
      title: '구성원 관리',
      breadcrumbs: [
        {
          title: '홈',
          disabled: false,
          to: {
            name: 'home',
          },
        },
        {
          title: '구성원 관리',
          disabled: true,
        },
      ],
    },
  },
  {
    path: '/partners',
    name: 'partners',
    component: PartnersPage,
    meta: {
      menu: true,
      layout: DefaultLayout,
      activeIndex: 2,
      title: '협력사 관리',
      breadcrumbs: [
        {
          title: '홈',
          disabled: false,
          to: {
            name: 'home',
          },
        },
        {
          title: '협력사 관리',
          disabled: true,
        },
      ],
    },
  },
  {
    path: '/sales',
    name: 'sales',
    component: SalesPage,
    meta: {
      menu: true,
      layout: DefaultLayout,
      activeIndex: 3,
      title: '매출 관리',
      breadcrumbs: [
        {
          title: '홈',
          disabled: false,
          to: {
            name: 'home',
          },
        },
        {
          title: '매출 관리',
          disabled: true,
        },
      ],
    },
  },
  {
    path: '/permissions',
    name: 'permissions',
    component: PermissionPage,
    meta: {
      menu: true,
      layout: DefaultLayout,
      activeIndex: 4,
      title: '권한 관리',
      breadcrumbs: [
        {
          title: '홈',
          disabled: false,
          to: {
            name: 'home',
          },
        },
        {
          title: '권한 관리',
          disabled: true,
        },
      ],
    },
  },
  {
    path: '/profiles',
    name: 'profiles',
    component: ProfilePage,
    meta: {
      layout: DefaultLayout,
      activeIndex: 5,
      title: '마이페이지',
      breadcrumbs: [
        {
          title: '홈',
          disabled: false,
          to: {
            name: 'home',
          },
        },
        {
          title: '마이페이지',
          disabled: true,
        },
      ],
    },
  },
  /* [추후 삭제 예정] 테이블 컴포넌트 테스트용으로 만든 페이지입니다. */
  {
    path: '/table',
    name: 'table',
    component: TableTestPage,
    meta: { layout: DefaultLayout },
  },
  {
    path: '/tooltip',
    name: 'tooltip',
    component: ToolTipTestPage,
    meta: { layout: DefaultLayout },
  },
  {
    path: '/progressbar',
    name: 'progressbar',
    component: ProgressBarTestPage,
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
  },
  {
    path: '/tree',
    name: 'tree',
    component: TreeTestPage,
    meta: { layout: DefaultLayout },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
