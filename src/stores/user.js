import { defineStore } from 'pinia'
import { computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  const isAuthenticated = computed(() => {
    return localStorage.getItem('isAuthenticated')
  })

  function login() {
    localStorage.setItem('isAuthenticated', 'true')
  }

  function logout() {
    localStorage.removeItem('isAuthenticated')
  }

  return { isAuthenticated, login, logout }
})
