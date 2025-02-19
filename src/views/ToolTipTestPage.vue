<template>
    <v-app>
      <v-container>
        <!-- TooltipComponent를 사용하여 툴팁을 동적으로 처리 -->
        <TooltipComponent :text="tooltipText">
          툴팁 버튼
        </TooltipComponent>
      </v-container>
    </v-app>
  </template>
  
  <script>
  import axios from 'axios';
  import TooltipComponent from '@/components/TooltipComponent.vue';
  
  export default {
    components: {
      TooltipComponent
    },
    data() {
      return {
        tooltipText: '로딩 중...', // 기본값
      };
    },
    methods: {
      async fetchTooltipData() {
        try {
          const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
          this.tooltipText = response.data.title; // 받아온 데이터를 툴팁에 적용
        } catch (error) {
          console.error('API 요청 실패:', error);
          this.tooltipText = '데이터 불러오기 실패';
        }
      },
    },
    mounted() {
      this.fetchTooltipData(); // 페이지가 로드되면 데이터를 불러옴
    },
  };
  </script>
  
  <style scoped></style>
  