import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '@/views/HomePage.vue'
import TableTestPage from '@/views/test/TableTestPage.vue'
import SearchBarTestPage from '@/views/test/SearchBarTestPage.vue'
import ProjectPage from '@/views/project/ProjectPage.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import MemberPage from '@/views/member/MemberPage.vue'
import PartnersPage from '@/views/partners/PartnersPage.vue'
import PartnersDetailPage from '@/views/partners/PartnersDetailPage.vue'
import PermissionPage from '@/views/PermissionPage.vue'
import SalesPage from '@/views/SalesPage.vue'
import ProfilePage from '@/views/ProfilePage.vue'
import ProgressBarTestPage from '@/views/test/ProgressBarTestPage.vue'
import TransferListTestPage from '@/views/test/TransferListTestPage.vue'
import TreeTestPage from '@/views/test/TreeTestPage.vue'
import ToolTipTestPage from '@/views/test/ToolTipTestPage.vue'
import InitializePage from '@/views/login/InitializePage.vue'
import RegisterPage from '@/views/login/RegisterPage.vue'
import LoginPage from '@/views/login/LoginPage.vue'
import ContractDetailPage from '@/views/project/ContractDetailPage.vue'
import LoginLayout from '@/layouts/LoginLayout.vue'
import FindPasswordPage from '@/views/login/FindPasswordPage.vue'
import MemberDetailPage from '@/views/member/MemberDetailPage.vue'
import ProjectDetailPage from '@/views/project/ProjectDetailPage.vue'
import MemberCreatePopup from '@/views/member/MemberCreatePopup.vue'
import { useUserStore } from '@/stores/user.js'
import { useToast } from 'vue-toastification'

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
    path: '/projects/detail',
    name: 'projectDetail',
    component: ProjectDetailPage,
    meta: {
      menu: false,
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
          disabled: false,
          to: {
            name: 'projects',
          },
        },
        {
          title: '프로젝트 상세',
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
    path: '/partners/:id',
    name: 'partnersDetail',
    component: PartnersDetailPage,
    meta: {
      layout: DefaultLayout,
      title: '협력사 상세',
      breadcrumbs: [
        { title: '홈', disabled: false, to: { name: 'home' } },
        { title: '협력사 관리', disabled: false, to: { name: 'partners' } },
        { title: '협력사 상세', disabled: true },
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
  {
    path: '/projects/detail/contracts/detail',
    name: 'contracts',
    component: ContractDetailPage,
    meta: {
      layout: DefaultLayout,
      activeIndex: 0,
      title: '계약 상세',
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
          disabled: false,
          to: {
            name: 'projects',
          },
        },
        {
          title: '프로젝트 상세',
          disabled: false,
          to: {
            name: 'projects',
          },
        },
        {
          title: '계약 상세',
          disabled: true,
        },
      ],
    },
  },
  {
    path: '/auths/initialize',
    name: 'initialize',
    component: InitializePage,
    meta: {
      layout: LoginLayout,
    },
  },
  {
    path: '/auths/register',
    name: 'register',
    component: RegisterPage,
    meta: {
      layout: LoginLayout,
    },
  },
  {
    path: '/auths/login',
    name: 'login',
    component: LoginPage,
    meta: {
      layout: LoginLayout,
    },
  },
  {
    path: '/auths/find-password',
    name: 'findPassword',
    component: FindPasswordPage,
    meta: {
      layout: LoginLayout,
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
  {
    path: '/memberDetail',
    name: 'memberDetail',
    component: MemberDetailPage,
    meta: {
      layout: DefaultLayout,
      activeIndex: 1,
      title: '구성원 상세',
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
          disabled: false,
          to: {
            name: 'members',
          },
        },
        {
          title: '구성원 상세',
          disabled: true,
        },
      ],
    },
  },

  {
    path: '/memberCreate',
    name: 'memberCreate',
    component: MemberCreatePopup,
    meta: {
      layout: DefaultLayout,
      activeIndex: 1,
      title: '구성원 추가',
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
          disabled: false,
          to: {
            name: 'members',
          },
        },
        {
          title: '구성원 추가',
          disabled: true,
        },
      ],
    },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  if (userStore.isAuthenticated !== 'true' && !to.fullPath.startsWith('/auths')) {
    const toast = useToast()
    toast.error('먼저 로그인이 필요합니다!')
    next({ name: 'login' })
  }
  next()
})

export default router
