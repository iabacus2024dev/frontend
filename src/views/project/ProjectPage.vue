<template>
  <v-container>
    <SearchBar class="pa-4" :rows="searchRows" @search="handleSearch" @reset="handleReset" />
  </v-container>
  <!-- 테이블 컴포넌트 -->
  <v-container>
    <TableEventComponent
      :tableDataEvent="tableDataEventCondition"
      @create-data-button-click="fnCreateData"
    />
    <v-card>
      <TableComponent
        class="mt-0"
        :tableTitle="tableTitleResponse"
        :tableData="tableDataResponse"
      />
      <PaginationComponent
        :page="currentPage"
        :length="totalPages"
        @change-page="handlePageChange"
      />
    </v-card>
    <TableEventComponent
      :tableExcelEvent="tableExcelEventCondition"
      @excel-upload-button-click="fnExcelUpload"
    />
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import SearchBar from '@/components/searchbar/SearchBarComponent.vue'
import TableComponent from '@/components/table/TableComponent.vue'
import TableEventComponent from '@/components/table/TableEventComponent.vue'
import PaginationComponent from '@/components/common/PaginationComponent.vue'

/* todo: api 통신으로 실제 데이터를 가져오기 */
const tableTitleResponse = ref([
  '프로젝트코드',
  '프로젝트명',
  '사업유형',
  '투입시작일자',
  '투입종료일자',
  '계약시작일자',
  '계약종료일자',
  '계약금액\n(단위:천)',
  '총매출금액\n(단위:천)',
  '발주사',
  '원청사',
  '진행상태',
])

const searchRows = ref([
  {
    // 첫 번째 행: 4개의 날짜 검색 조건
    fields: [
      { key: 'contractStartDate', label: '계약 시작일자', type: 'date', columnCount: 4 },
      { key: 'contractEndDate', label: '계약 종료일자', type: 'date', columnCount: 4 },
      { key: 'pInsertStartDate', label: '투입 시작일자', type: 'date', columnCount: 4 },
      { key: 'pInsertEndDate', label: '투입 종료일자', type: 'date', columnCount: 4 },
    ],
  },
  {
    // 두 번째 행: 드롭다운 (사업유형, 진행 상태)
    fields: [
      {
        key: 'businessType',
        label: '사업유형',
        type: 'select',
        columnCount: 4,
        options: [
          { value: 'SI', label: 'SI' },
          { value: 'SM', label: 'SM' },
        ],
      },
      {
        key: 'status',
        label: '진행 상태',
        type: 'select',
        columnCount: 4,
        options: [
          { value: '진행중', label: '진행중' },
          { value: '완료', label: '완료' },
        ],
      },
    ],
  },
  {
    // 세 번째 행: 텍스트 검색 (프로젝트명, 프로젝트 코드)
    fields: [
      { key: 'projectName', label: '프로젝트 이름', type: 'text', columnCount: 2 },
      { key: 'projectCode', label: '프로젝트 코드', type: 'text', columnCount: 2 },
    ],
  },
])

const tableDataResponse = ref([
  {
    projectcode: 'C0000123485',
    projectname: '(주)엘지유플러스_통신 MNO/MVNO 구분',
    businesetype: 'SI',
    projectstartdate: '2024.01.01',
    projectenddate: '2024.01.31',
    contractstartdate: '2024.01.31',
    contractenddate: '2024.01.31',
    contractpay: '8,500',
    totalpay: '8,500',
    orderder: '(주)엘지유플러스',
    origin: '(주)엘지유플러스',
    progress: '진행중',
  },
  {
    projectcode: 'C0000123485',
    projectname: '(주)엘지유플러스_통신 MNO/MVNO 구분',
    businesetype: 'SI',
    projectstartdate: '2024.01.01',
    projectenddate: '2024.01.31',
    contractstartdate: '2024.01.31',
    contractenddate: '2024.01.31',
    contractpay: '8,500',
    totalpay: '8,500',
    orderder: '(주)엘지유플러스',
    origin: '(주)엘지유플러스',
    progress: '진행중',
  },
  {
    projectcode: 'C0000123485',
    projectname: '(주)엘지유플러스_통신 MNO/MVNO 구분',
    businesetype: 'SI',
    projectstartdate: '2024.01.01',
    projectenddate: '2024.01.31',
    contractstartdate: '2024.01.31',
    contractenddate: '2024.01.31',
    contractpay: '8,500',
    totalpay: '8,500',
    orderder: '(주)엘지유플러스',
    origin: '(주)엘지유플러스',
    progress: '진행중',
  },
  {
    projectcode: 'C0000123485',
    projectname: '(주)엘지유플러스_통신 MNO/MVNO 구분',
    businesetype: 'SI',
    projectstartdate: '2024.01.01',
    projectenddate: '2024.01.31',
    contractstartdate: '2024.01.31',
    contractenddate: '2024.01.31',
    contractpay: '8,500',
    totalpay: '8,500',
    orderder: '(주)엘지유플러스',
    origin: '(주)엘지유플러스',
    progress: '진행중',
  },
])

// 검색 이벤트 핸들러
const handleSearch = (filters) => {
  console.log('🔍 검색 실행:', filters)
}

// 초기화 이벤트 핸들러
const handleReset = () => {
  console.log('🔄 검색 조건 초기화됨')
}

/* desc: 필요한 테이블 이벤트만 true로 명시 */
// 테이블 데이터 관련 이벤트
const tableDataEventCondition = ref({
  createData: true,
})

// 테이블 엑셀 관련 이벤트
const tableExcelEventCondition = ref({
  excelUpload: true,
  excelDownload: true,
})

// 페이지 변경 이벤트 핸들러
const handlePageChange = (newPage) => {
  console.log(`페이지 변경: ${newPage}`)
}

const fnCreateData = () => {
  console.log('fnCreateData >>>', 'todo: 데이터 등록 팝업창 뜨기')
}

const fnExcelUpload = () => {
  console.log('fnExcelUpload >>>', 'todo: 엑셀 업로드 실행')
}
</script>

<style scoped></style>
