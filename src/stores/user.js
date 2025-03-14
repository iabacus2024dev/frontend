import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useCookies } from 'vue3-cookies'

export const useUserStore = defineStore('user', () => {
  const isAuthenticated = computed(() => {
    return localStorage.getItem('isAuthenticated')
  })

  function login() {
    localStorage.setItem('isAuthenticated', 'true')
  }

  function logout() {
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('XSRF-TOKEN')
    let { cookies } = useCookies()
    cookies.remove('XSRF-TOKEN')
  }

  return { isAuthenticated, login, logout }
})
