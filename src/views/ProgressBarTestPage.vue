<template>
    <!-- 페이지 헤더 -->
  <v-container class="page-header">
    <h1>프로그레스바 컴포넌트를 테스트하는 페이지</h1>
  </v-container>

  <v-container>
    <ProgressBarComponent :isLoading="isLoading"/>
    <v-btn @click="toggleLoading">누르면 1초간 대기</v-btn>
  </v-container>

 
</template>



<script setup>
    import { ref } from 'vue';
    import ProgressBarComponent from '@/components/common/ProgressBarComponent.vue';

    const isLoading = ref(false);
    console.log(isLoading.value);

    const toggleLoading = () =>{
        isLoading.value = true;
        setTimeout(() => {
                isLoading.value = false;
        }, 1000);
    };
</script>
