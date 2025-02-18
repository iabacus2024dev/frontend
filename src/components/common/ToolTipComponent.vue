<!--        간단한 데이터 바인딩
<template>
    <v-app>
      <v-container>
        <v-tooltip :text=tooltipText>
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props">툴팁 버튼</v-btn>
          </template>
        </v-tooltip>
      </v-container>
    </v-app>

  </template>


<script>
export default {
  data() {
    return {
      tooltipText: "초기 툴팁 내용", // 초기값 설정
    };
  },
};
</script>
-->



<!--  computed 사용용
<template>
  <v-app>
    <v-container>
      <v-tooltip :text="computedTooltip">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props">툴팁 버튼</v-btn>
        </template>
      </v-tooltip>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      username: "홍길동", // 사용자 이름 (변경 가능)
    };
  },
  computed: {
    computedTooltip() {
      return this.username ? `사용자: ${this.username}` : "이름 없음";
    },
  },
};
</script>
-->


<!-- API에서 데이터 가져오기 -->
<template>
  <v-app>
    <v-container>
      <v-tooltip :text="tooltipText">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" @click="fetchTooltipData">툴팁 버튼</v-btn>
        </template>
      </v-tooltip>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      tooltipText: "로딩 중...", // 기본값
    };
  },
  methods: {
    async fetchTooltipData() {
      try {
        // 예제 API 요청 (실제 API URL로 변경)
        const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
        const data = await response.json();
        this.tooltipText = data.title; // 받아온 데이터를 툴팁에 적용
      } catch (error) {
        console.error("API 요청 실패:", error);
        this.tooltipText = "데이터 불러오기 실패";
      }
    },
  },
};
</script>


<style scoped>
.v-btn {
  margin-left: 10px;
  background-color: #EB6129; /* todo: 공통적으로 쓰는 색 같은 것은 상수화 */
  color: white;
}
</style>