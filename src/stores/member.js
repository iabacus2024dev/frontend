import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useCookies } from 'vue3-cookies'
import { getMyInfo } from '@/apis/authService.js'

export const useMemberStore = defineStore('member', () => {
  const isAuthenticated = computed(() => {
    return localStorage.getItem('member')
  })

  async function login() {
    localStorage.setItem('member', JSON.stringify(await getMyInfo()))
  }

  function logout() {
    localStorage.removeItem('member')
    localStorage.removeItem('XSRF-TOKEN')
    let { cookies } = useCookies()
    cookies.remove('XSRF-TOKEN')
  }

  return { isAuthenticated, login, logout }
})
