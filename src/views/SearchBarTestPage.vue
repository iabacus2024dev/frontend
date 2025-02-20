<template>
  <div>
    <SearchBar
      :rows="searchRows"
      @search="handleSearch"
      @reset="handleReset"
    />
  </div>
</template>

<script setup>
import {ref} from "vue";
import SearchBar from "@/components/searchbar/SearchBarComponent.vue"; // 경로 확인 필요

const searchRows = ref([
  {
    // 첫 번째 행: 4개의 날짜 검색 조건
    fields: [
      {key: "contractStartDate", label: "계약 시작일자", type: "date", columnCount: 4},
      {key: "contractEndDate", label: "계약 종료일자", type: "date", columnCount: 4},
      {key: "pInsertStartDate", label: "투입 시작일자", type: "date", columnCount: 4},
      {key: "pInsertEndDate", label: "투입 종료일자", type: "date", columnCount: 4}
    ]
  },
  {
    // 두 번째 행: 드롭다운 (사업유형, 진행 상태)
    fields: [
      {
        key: "businessType", label: "사업유형", type: "select", columnCount: 4,
        options: [
          {value: "SI", label: "SI"},
          {value: "SM", label: "SM"}
        ]
      },
      {
        key: "status", label: "진행 상태", type: "select", columnCount: 4,
        options: [
          {value: "진행중", label: "진행중"},
          {value: "완료", label: "완료"}
        ]
      }
    ]
  },
  {
    // 세 번째 행: 텍스트 검색 (프로젝트명, 프로젝트 코드)
    fields: [
      {key: "projectName", label: "프로젝트 이름", type: "text", columnCount: 2},
      {key: "projectCode", label: "프로젝트 코드", type: "text", columnCount: 2}
    ]
  }
]);

// 검색 이벤트 핸들러
const handleSearch = (filters) => {
  console.log("🔍 검색 실행:", filters);
};

// 초기화 이벤트 핸들러
const handleReset = () => {
  console.log("🔄 검색 조건 초기화됨");
};
</script>

<style scoped>
/* 검색 바 테스트 페이지 스타일 */
h1 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}
</style>
