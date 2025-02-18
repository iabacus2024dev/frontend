<!--프로젝트관리 검색바 예시-->
<template>
  <div>
    <h1>검색 바</h1>
    <SearchBar
      :rows="searchRows"
      @search="handleSearch"
      @reset="handleReset"
    />
  </div>
</template>

<script>
import SearchBar from "@/components/searchbar/SearchBarComponent.vue";

export default {
  components: { SearchBar },
  data() {
    return {
      searchRows: [
        {
          // 첫 번째 행: 3개의 검색 조건
          fields: [
            // { key: "contractStartDate", label: "계약 시작일자", type: "date", width: "250px" },
            // { key: "contractEndDate", label: "계약 종료일자", type: "date", width: "250px" },
            // { key: "pInsertStartDate", label: "투입 시작일자", type: "date", width: "250px" },
            // { key: "pInsertEndDate", label: "투입 종료일자", type: "date", width: "250px" }
            { key: "contractStartDate", label: "계약 시작일자", type: "date", columnCount: "4" },
            { key: "contractEndDate", label: "계약 종료일자", type: "date", columnCount: "4" },
            { key: "pInsertStartDate", label: "투입 시작일자", type: "date", columnCount: "4" },
            { key: "pInsertEndDate", label: "투입 종료일자", type: "date", columnCount: "4" }
          ]
        },
        {
          // 두 번째 행: 2개의 검색 조건
          fields: [
            { key: "businessType", label: "사업유형", type: "select", /*width: "250px"*/ columnCount: "4", options: [
                { value: "SI", label: "SI" },
                { value: "SM", label: "SM" }
              ]
            },
            { key: "status", label: "진행 상태", type: "select", /*width: "250px"*/ columnCount: "4", options: [
                { value: "진행중", label: "진행중" },
                { value: "완료", label: "완료" }
              ]
            }
          ]
        },
        {
          // 3 번째 행: 2개의 검색 조건
          fields: [
            { key: "projectName", label: "프로젝트 이름", type: "text", columnCount: "2" },
            { key: "projectCode", label: "프로젝트 코드", type: "text", columnCount: "2" }
          ]
        }
      ]
    };
  },
  methods: {
    handleSearch(filters) {
      console.log("검색 조건:", filters);
    },
    handleReset() {
      console.log("검색 조건 초기화됨");
    }
  }
};
</script>

<!--구성원 관리 검색바 예시-->
<!--<template>-->
<!--  <div>-->
<!--    <h1>검색 바</h1>-->
<!--    <SearchBar-->
<!--      :rows="searchRows"-->
<!--      @search="handleSearch"-->
<!--      @reset="handleReset"-->
<!--    />-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import SearchBar from "@/components/searchbar/SearchBarComponent.vue";-->

<!--export default {-->
<!--  components: { SearchBar },-->
<!--  data() {-->
<!--    return {-->
<!--      searchRows: [-->
<!--        {-->
<!--          // 첫 번째 행: 4개의 검색 조건-->
<!--          fields: [-->
<!--            { key: "workerType", label: "직원유형", type: "select", /*width: "250px"*/ columnCount: "4", options: [-->
<!--                { value: "정규직", label: "정규직" },-->
<!--                { value: "프리", label: "프리" },-->
<!--                { value: "반프리", label: "빈프리" },-->
<!--                { value: "외주", label: "외주" }-->
<!--              ]-->
<!--            },-->
<!--            { key: "workerRank", label: "등급", type: "select", /*width: "250px"*/ columnCount: "4", options: [-->
<!--                { value: "초급", label: "초급" },-->
<!--                { value: "중급", label: "중급" },-->
<!--                { value: "고급", label: "고급" },-->
<!--                { value: "특급", label: "특급" }-->
<!--              ]-->
<!--            },-->
<!--            { key: "workerGrade", label: "직급", type: "select", /*width: "250px"*/ columnCount: "4", options: [-->
<!--                { value: "사원", label: "사원" },-->
<!--                { value: "선임", label: "선임" },-->
<!--                { value: "책임", label: "책임" },-->
<!--                { value: "팀장", label: "팀장" }-->
<!--              ]-->
<!--            },-->
<!--            { key: "businessType", label: "가동 현황", type: "select", /*width: "250px"*/ columnCount: "4", options: [-->
<!--                { value: "가능", label: "가능" },-->
<!--                { value: "불가능", label: "불가능" }-->
<!--              ]-->
<!--            },-->
<!--          ]-->
<!--        },-->
<!--        {-->
<!--          // 두 번째 행: 1개의 검색 조건-->
<!--          fields: [-->
<!--            { key: "workerName", label: "이름", type: "text", columnCount: "4" }-->
<!--          ]-->
<!--        }-->
<!--      ]-->
<!--    };-->
<!--  },-->
<!--  methods: {-->
<!--    handleSearch(filters) {-->
<!--      console.log("검색 조건:", filters);-->
<!--    },-->
<!--    handleReset() {-->
<!--      console.log("검색 조건 초기화됨");-->
<!--    }-->
<!--  }-->
<!--};-->
<!--</script>-->
