<template>
  <v-container fluid style="margin: 0px; padding: 0px; width: 100%" class="mt-5">
    <v-row>
      <v-col>
        <SearchBarComponent :rows="searchRows" @search="handleSearch" @reset="handleReset" />
      </v-col>
    </v-row>
    <!-- 테이블 컴포넌트 -->
    <v-row>
      <v-col>
        전체 : {{ row }}건
        <TableComponent :tableTitle="tableTitleResponse" :tableData="tableDataResponse" />
        <!-- 페이지네이션 -->
        <PaginationComponent
          :page="currentPage"
          :length="totalPages"
          @change-page="handlePageChange"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import TableComponent from '@/components/table/TableComponent.vue'
import PaginationComponent from '@/components/common/PaginationComponent.vue'
import SearchBarComponent from '@/components/searchbar/SearchBarComponent.vue'

const modal = ref(null)
const modalTitle = ref('협력사 삭제')
const modalText = ref('....삭제 하겠습니까?')
const row = 5

/* todo: api 통신으로 실제 데이터를 가져오기 */
const tableTitleResponse = ref([
  '협력사명',
  '대표자명',
  '영업대표명',
  '영업대표 이메일',
  '영업대표연락처',
  '소속인원수',
  '평가등급',
  '주소',
])

const tableDataResponse = ref([
  {
    menuName: '애버커스',
    menuDescription: '이동욱',
    asdName: '김봉재',
    munuEmail: 'aaaa@naver.com',
    calories: '010-000-000',
    sugar: '5',
    caffeine: 'B',
    address: '경기도 고양시 덕양구 세솔로 25',
  },
  {
    menuName: '애버커스',
    menuDescription: '이동욱',
    asdName: '김봉재',
    munuEmail: 'aaaa@naver.com',
    calories: '010-000-000',
    sugar: '5',
    caffeine: 'B',
    address: '경기도 고양시 덕양구 세솔로 25',
  },
])

// 모달 열기
const openDialog = () => {
  modal.value?.open()
}

// 확인 버튼 클릭 시
const handleConfirm = () => {
  console.log('확인 버튼 클릭됨!')
  console.log('사용하는 페이지에서 저장,삭제등등 기능 구현하면 됨')
}

// 취소 버튼 클릭 시
const handleCancel = () => {
  console.log('취소 버튼 클릭됨!')
}

// 페이지 변경 이벤트 핸들러
const handlePageChange = (newPage) => {
  console.log(`페이지 변경: ${newPage}`)
  currentPage.value = newPage
}

const searchRows = ref([
  {
    fields: [
      {
        key: 'Grade',
        label: '평가등급',
        type: 'select',
        options: [
          { value: 'A', label: 'A' },
          { value: 'B', label: 'B' },
          { value: 'C', label: 'C' },
          { value: 'D', label: 'D' },
          { value: 'E', label: 'E' },
        ],
      },
      {
        key: 'PartnerName',
        label: '협력사명',
        type: 'text',
      },
      { key: 'CeoName', label: '대표자명', type: 'text' },
      { key: 'SubcekName', label: '영업대표명', type: 'text' },
    ],
  },
])

// ✅ 검색 이벤트 핸들러
const handleSearch = (filters) => {
  console.log(' 검색 실행:', filters)
}

// ✅ 초기화 이벤트 핸들러
const handleReset = () => {
  console.log(' 검색 조건 초기화됨')
}
</script>

<style scoped>
.v-btn {
  margin-left: 10px;
  background-color: #eb6129; /* todo: 공통적으로 쓰는 색 같은 것은 상수화 */
  color: white;
}

page-header {
  margin-bottom: 20px;
}
</style>
