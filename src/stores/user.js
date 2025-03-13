import { defineStore } from 'pinia'
import { computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  const isAuthenticated = computed(() => {
    return sessionStorage.getItem('isAuthenticated')
  })

  function login() {
    sessionStorage.setItem('isAuthenticated', 'true')
  }

  function logout() {
    sessionStorage.removeItem('isAuthenticated')
  }

  return { isAuthenticated, login, logout }
})
