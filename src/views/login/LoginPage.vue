<template>
  <LoginComponent />
</template>

<script setup>
import { ref } from 'vue'
import router from '@/router/index.js'
import LoginComponent from "@/components/login/LoginComponent.vue";

const form = ref({
  email: '',
  password: '',
})

const login = () => {
  goTo('/')
}

const goTo = (path) => {
  router.push({ path })
}
</script>

<style scoped></style>
