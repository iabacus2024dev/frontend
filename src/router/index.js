import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '@/views/HomePage.vue'
import ProjectPage from '@/views/project/ProjectPage.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import EmployeePage from '@/views/employee/EmployeePage.vue'
import PartnersPage from '@/views/partners/PartnersPage.vue'
import PartnersDetailPage from '@/views/partners/PartnersDetailPage.vue'
import PermissionPage from '@/views/PermissionPage.vue'
import SalesPage from '@/views/SalesPage.vue'
import ProfilePage from '@/views/ProfilePage.vue'
import InitializePage from '@/views/login/InitializePage.vue'
import RegisterPage from '@/views/login/RegisterPage.vue'
import LoginPage from '@/views/login/LoginPage.vue'
import ContractDetailPage from '@/views/project/ContractDetailPage.vue'
import LoginLayout from '@/layouts/LoginLayout.vue'
import FindPasswordPage from '@/views/login/FindPasswordPage.vue'
import EmployeeDetailPage from '@/views/employee/EmployeeDetailPage.vue'
import ProjectDetailPage from '@/views/project/ProjectDetailPage.vue'
import EmployeeCreatePopup from '@/views/employee/EmployeeCreatePopup.vue'
import { useToast } from 'vue-toastification'
import { useMemberStore } from '@/stores/member.js'

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
          disabled: false,
        },
      ],
    },
  },
  {
    path: '/projects/:id',
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
    path: '/employees',
    name: 'employees',
    component: EmployeePage,
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
  {
    path: '/employees/:id',
    name: 'employeeDetail',
    component: EmployeeDetailPage,
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
            name: 'employees',
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
    component: EmployeeCreatePopup,
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
  const memberStore = useMemberStore()
  if (memberStore.isAuthenticated === null && !to.fullPath.startsWith('/auths')) {
    const toast = useToast()
    toast.error('먼저 로그인이 필요합니다!')
    next({ name: 'login' })
  }
  next()
})

export default router
