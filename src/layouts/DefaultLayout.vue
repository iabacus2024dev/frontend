<template>
  <v-app>
    <HeaderComponent />
    <v-main>
      <slot></slot>
    </v-main>
    <FooterComponent />
  </v-app>
</template>

<script setup>
import HeaderComponent from '@/components/common/HeaderComponent.vue';
import FooterComponent from '@/components/common/FooterComponent.vue';
</script>

<style scoped></style>
