<template>
  <div v-if="isLoading" class="loading-container">
    <v-progress-circular
      color="#EB6129"
      indeterminate
    ></v-progress-circular>
  </div>
</template>

<script setup>
  import { defineProps } from 'vue';
  
  const props = defineProps({
    isLoading: {
      type: Boolean,
      required: true
    }
  });
</script>

  
<style scoped>
  /* 전체 화면을 차지하면서 정중앙 배치 */
  .loading-container {
    display: flex;
    justify-content: center; /* 수평 중앙 */
    align-items: center; /* 수직 중앙 */
    height: 100vh; /* 화면 전체 높이 */
    width: 100vw; /* 화면 전체 너비 */
    position: fixed; /* 고정된 위치 */
    top: 0;
    left: 0;
    background: rgba(255, 255, 255, 0.8); /* 배경을 반투명하게 */
    z-index: 9999; /* 다른 요소 위에 표시 */
  }
</style>
  

