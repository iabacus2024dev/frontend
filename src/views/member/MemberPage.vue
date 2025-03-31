<template>
  <v-row>
    <v-col class="mt-3">
      <SearchBarComponent :rows="searchRows" @search="handleSearch" @reset="handleReset" />
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <TableComponent :table-title="tableTitleResponse" :table-data="tableDataResponse" />
    </v-col>
  </v-row>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import TableComponent from '@/components/table/TableComponent.vue'
import SearchBarComponent from '@/components/searchbar/SearchBarComponent.vue'
import { getTreeViews } from '@/apis/teamService'

const tableTitleResponse = ref(['이름', '팀명', '직급', '구분', '등급', '가동현황', '입사일자'])
const tableDataResponse = ref([
  {
    name: '박상철',
    team: '고객정보팀',
    rank: '사원',
    type: '정규직',
    grade: '초급',
    status: '비가동',
    join_date: '2024-11-25',
  },
  {
    name: '김영수',
    team: '고객정보팀',
    rank: '선임',
    type: '정규직',
    grade: '중급',
    status: '가동',
    join_date: '2023-05-15',
  },
  {
    name: '이영희',
    team: '고객정보팀',
    rank: '책임',
    type: '정규직',
    grade: '고급',
    status: '가동',
    join_date: '2022-02-10',
  },
  {
    name: '박철수',
    team: '고객정보팀',
    rank: '이사',
    type: '정규직',
    grade: '특급',
    status: '가동',
    join_date: '2021-01-01',
  },
])

const treeData = ref([])

onMounted(async () => {
  try {
    const response = await getTreeViews()
    treeData.value = response
  } catch (error) {
    console.error('트리뷰 데이터 로딩 실패:', error)
  }
})

const addMember = () => {
  console.log('구성원 추가 버튼 클릭')
}

const searchRows = ref([
  {
    fields: [
      {
        key: 'Type',
        label: '직원유형',
        type: 'select',
        columnCount: 4,
        options: [
          { value: '전체', label: '전체' },
          { value: '정규직', label: '정규직' },
          { value: '반프리', label: '반프리' },
          { value: '프리랜서', label: '프리랜서' },
          { value: '외주', label: '외주' },
        ],
      },
      {
        key: 'rnak',
        label: '등급',
        type: 'select',
        columnCount: 4,
        options: [
          { value: '전체', label: '전체' },
          { value: '초급', label: '초급' },
          { value: '중급', label: '중급' },
          { value: '고급', label: '고급' },
          { value: '특급', label: '특급' },
        ],
      },
      {
        key: 'grade',
        label: '직급',
        type: 'select',
        columnCount: 4,
        options: [
          { value: '전체', label: '전체' },
          { value: '사장', label: '사장' },
          { value: '이사', label: '이사' },
          { value: '책임', label: '책임' },
          { value: '선임', label: '선임' },
          { value: '사원', label: '사원' },
        ],
      },
      {
        key: 'status',
        label: '가동현황',
        type: 'select',
        columnCount: 4,
        options: [
          { value: '전체', label: '전체' },
          { value: '가동', label: '가동' },
          { value: '비가동', label: '비가동' },
        ],
      },
    ],
  },
  {
    fields: [{ key: '이름', label: '이름', type: 'text', columnCount: 2 }],
  },
])

// ✅ 검색 이벤트 핸들러
const handleSearch = (filters) => {
  console.log('🔍 검색 실행:', filters)
}

// ✅ 초기화 이벤트 핸들러
const handleReset = () => {
  console.log('🔄 검색 조건 초기화됨')
}
</script>

<style scoped>
.v-treeview {
  height: 650px;
  overflow-y: auto;
}

.add-member-btn {
  background-color: #eb6129;
  color: white;
}
.custom-card {
  border: 1px solid #c5c3c3;
  padding: 12px;
  border-radius: 4px;
}
</style>
