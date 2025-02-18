<template>
  <v-app>
    <HeaderComponent :activeIndex="activeIndex" />
    <v-main>
      <slot></slot>
    </v-main>
    <FooterComponent />
  </v-app>
</template>

<script setup>
import HeaderComponent from '@/components/common/HeaderComponent.vue'
import FooterComponent from '@/components/common/FooterComponent.vue'

import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const activeIndex = computed(() => {
  return router.currentRoute.value.meta.activeIndex
})
</script>

<style scoped></style>
