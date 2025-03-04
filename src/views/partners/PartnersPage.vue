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
    <v-row>
      <v-col class="btns-container">
        <v-btn variant="tonal" density="comfortable" class="update-btn ml-2"> 협력사 등록 </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getPartners } from '@/apis/partnerService'

import TableComponent from '@/components/table/TableComponent.vue'
import PaginationComponent from '@/components/common/PaginationComponent.vue'
import SearchBarComponent from '@/components/searchbar/SearchBarComponent.vue'

const tableTitleResponse = ref([
  'No',
  '협력사명',
  '대표자명',
  '영업대표명',
  '영업대표 이메일',
  '영업대표연락처',
  '평가등급',
  '주소',
])

const tableDataResponse = ref([])
const totalPages = ref(0)
const currentPage = ref(0)
const pageSize = ref(20)
const row = ref(0)
const searchFilters = ref({})

onMounted(() => {
  fetchGetPartners()
})

const fetchGetPartners = async () => {
  try {
    const params = {
      page: currentPage.value, // 현재 페이지
      size: pageSize.value, // 페이지당 항목 수
      grade: searchFilters.value.Grade || '', // 검색 필터
      name: searchFilters.value.PartnerName || '',
      ceoName: searchFilters.value.CeoName || '',
      salesRepName: searchFilters.value.SubcekName || '',
    }

    //console.log(params)
    const response = await getPartners(params)
    //console.log(response)
    const filteredData = response.content.map((partner) => ({
      id: partner.id,
      name: partner.name,
      ceoName: partner.ceoName,
      salesRepName: partner.salesRepName,
      salesRepEmail: partner.salesRepEmail,
      salesRepPhone: partner.salesRepPhone,
      grade: partner.grade,
      adrees: partner.street + ' ' + partner.detail,
    }))
    tableDataResponse.value = filteredData
    row.value = response.totalElements
    totalPages.value = response.totalPages
    currentPage.value = response.number
  } catch (error) {
    console.error('협력사 데이터 불러오기 실패:', error)
  }
}

// 페이지 변경 이벤트 핸들러
const handlePageChange = (newPage) => {
  console.log(`페이지 변경: ${newPage}`)
  currentPage.value = newPage
  fetchGetPartners()
}

const searchRows = ref([
  {
    fields: [
      {
        key: 'Grade',
        label: '평가등급',
        type: 'select',
        columnCount: 5,
        options: [
          { title: 'A', value: 'A' },
          { title: 'B', value: 'B' },
          { title: 'C', value: 'C' },
          { title: 'D', value: 'D' },
          { title: 'E', value: 'E' },
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

const handleSearch = (filters) => {
  console.log(filters)
  searchFilters.value = filters // 검색 조건 저장
  currentPage.value = 0 // 검색 시 첫 페이지로 이동
  fetchGetPartners() // 검색 실행
}

const handleReset = () => {
  searchFilters.value = {} // 검색 조건 초기화
  currentPage.value = 0 // 첫 페이지로 이동
  fetchGetPartners() // 초기 데이터 다시 불러오기
}
</script>

<style scoped>
.btns-container {
  display: flex;
  justify-content: end;
}

.v-btn {
  margin-left: 10px;
  background-color: #eb6129; /* todo: 공통적으로 쓰는 색 같은 것은 상수화 */
  color: white;
}

page-header {
  margin-bottom: 20px;
}
</style>
