<!-- 페이지 로딩이 완료될 때 까지만 프로그레스바 표시 -->
<!-- indeterminate : 무한 회전, 진행률을 표시하려면 value 사용  -->
<template>
    <div v-if="isLoading" class="loading-container">
      <v-progress-circular
        :width="3"
        color="#EB6129"
        indeterminate      
      ></v-progress-circular>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isLoading: true, // 처음에는 로딩 상태
      };
    },
    /*
    mounted() {
      // 2초 후 로딩 종료 (실제 환경에서는 데이터 요청 완료 후 false로 변경)
      setTimeout(() => {
        this.isLoading = false;
      }, 2000);
    }
    */
  };
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
  

