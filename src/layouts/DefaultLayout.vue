<template>
  <v-app>
    <HeaderComponent />
    <v-main>
      <v-container>
        <MainHeaderComponent />
        <slot></slot>
      </v-container>
    </v-main>
    <FooterComponent />
  </v-app>
</template>

<script setup>
import HeaderComponent from '@/components/common/HeaderComponent.vue'
import FooterComponent from '@/components/common/FooterComponent.vue'
import MainHeaderComponent from '@/components/common/MainHeaderComponent.vue'
</script>

<style scoped></style>
