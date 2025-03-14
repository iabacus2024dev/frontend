import { defineStore } from 'pinia'
import { computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  const isAuthenticated = computed(() => {
    return localStorage.getItem('isAuthenticated')
  })

  function login() {
    localStorage.setItem('isAuthenticated', 'true')
    localStorage.setItem('XSRF-TOKEN', $cookies.get('XSRF-TOKEN'))
  }

  function logout() {
    localStorage.removeItem('isAuthenticated')
  }

  return { isAuthenticated, login, logout }
})
