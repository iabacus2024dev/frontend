<template>
  <v-row>
    <v-col class="mt-3">
      <SearchBarComponent :rows="searchRows" @search="handleSearch" @reset="handleReset" />
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <TableComponent
        :headers="headers"
        :items="items"
        :title="title"
        @click-row="clickRow"
        :loading="loading"
        :page="currentPage"
        :length="totalElements"
        @loadItems="loadItems"
        @open-dialog="createDialogs"
      />
      <div class="d-flex justify-end">
        <ExcelActionsComponent
          @download="fetchDownload"
          @upload="fetchUpload"
          @downloadSample="fetchDownloadSample"
          v-model:file="uploadedFile"
          v-model:dialog="dialog"
        />
      </div>
    </v-col>
  </v-row>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import TableComponent from '@/components/table/TableComponent.vue'
import SearchBarComponent from '@/components/searchbar/SearchBarComponent.vue'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useDialog } from '@/composables/useDialog.js'
import {
  createEmployee,
  downloadEmployees,
  downloadEmployeeSample,
  getEmployees,
  uploadEmployee,
} from '@/apis/employeeService.js'
import ExcelActionsComponent from '@/components/common/ExcelActionsComponent.vue'
import EmployeeCreatePopup from '@/views/employee/EmployeeCreatePopup.vue'

const router = useRouter()
const route = useRoute()
const toast = useToast()

const title = ref('구성원 목록')

const createDialog = useDialog()
const dialog = ref(false)
const loading = ref(false)

const currentPage = ref(1)
const totalElements = ref(0)
const items = ref([])

const size = ref(10)
const sort = ref('')

const uploadedFile = ref(null)

// 검색 조건 및 페이징 조건
const params = ref({
  name: '',
  teamName: '',
  rank: '',
  type: '',
  grade: '',
  status: '',
  page: 1,
  size: 10,
})

// 테이블 헤더
const headers = ref([
  { title: '이름', key: 'name' },
  { title: '팀명', key: 'teamName', sortable: false },
  { title: '직원유형', key: 'type' },
  { title: '등급', key: 'grade' },
  { title: '직급', key: 'rank' },
  { title: '가동현황', key: 'status', sortable: false },
  { title: '입사일자', key: 'joinDate' },
])

// 검색 조건
const searchRows = ref([
  {
    fields: [
      {
        key: 'type',
        label: '직원유형',
        type: 'select',
        columnCount: 4,
        options: [
          { title: '전체', value: '' },
          { title: '정직원', value: '정직원' },
          { title: '프리랜서', value: '프리랜서' },
          { title: '외주', value: '외주' },
        ],
      },
      {
        key: 'grade',
        label: '등급',
        type: 'select',
        columnCount: 4,
        options: [
          { title: '전체', value: '' },
          { title: '초급', value: '초급' },
          { title: '중급', value: '중급' },
          { title: '고급', value: '고급' },
          { title: '특급', value: '특급' },
        ],
      },
      {
        key: 'rank',
        label: '직급',
        type: 'select',
        columnCount: 4,
        options: [
          { title: '전체', value: '' },
          { title: '사장', value: '사장' },
          { title: '이사', value: '이사' },
          { title: '책임', value: '책임' },
          { title: '선임', value: '선임' },
          { title: '사원', value: '사원' },
        ],
      },
      {
        key: 'status',
        label: '가동현황',
        type: 'select',
        columnCount: 4,
        options: [
          { title: '전체', value: '' },
          { title: '가동', value: '가동' },
          { title: '비가동', value: '비가동' },
        ],
      },
    ],
  },
  {
    fields: [{ key: 'name', label: '이름', type: 'text', columnCount: 2 }],
  },
])

// 테이블 row 클릭
const clickRow = (item) => router.push(`/employees/${item.id}`)

// 데이터 불러오기
const loadItems = async (page = 1, itemsPerPage = size.value, sortBy = []) => {
  try {
    loading.value = true
    params.value.page = page
    params.value.size = itemsPerPage
    if (sortBy.length > 0) {
      params.value.sort = sortBy[0].key + ',' + sortBy[0].order
    } else {
      params.value.sort = []
    }

    size.value = itemsPerPage
    sort.value = params.value.sort

    const response = await getEmployees(params.value)
    items.value = response.content
    totalElements.value = response.totalElements
    await router.replace(`/employees?${buildQueryParams(params.value)}`)
  } finally {
    loading.value = false
  }
}

// 검색 이벤트 핸들러
const handleSearch = async (filters) => {
  params.value = { ...filters, page: 1 }
  currentPage.value = 1
  await loadItems()
}

// 초기화 이벤트 핸들러
const handleReset = async () => {
  params.value = {
    name: '',
    teamName: '',
    rank: '',
    type: '',
    grade: '',
    status: '',
    page: 1,
  }
  currentPage.value = 1
  await loadItems()
}

// 구성원 등록 팝업
const createDialogs = () => {
  createDialog.openDialog({
    title: '프로젝트 등록',
    component: EmployeeCreatePopup,
    fnCallback: (data) => {
      console.log('받은 데이터: ', data)
      fetchCreateEmployee(data)
    },
  })
}

// 구성원 등록
const fetchCreateEmployee = async (data) => {
  await createEmployee(data)
  toast.success('구성원이 성공적으로 등록되었습니다.')
}

// 엑셀 다운로드
const fetchDownload = async () => {
  console.log('엑셀 다운로드')
  setSortToParam()
  await downloadEmployees(params.value)
  toast.success('구성원 엑셀 다운로드에 성공하였습니다.')
}

function setSortToParam() {
  const storedSort = localStorage.getItem(title.value + ' sort')
    ? JSON.parse(localStorage.getItem(title.value + ' sort'))
    : []
  if (storedSort.length > 0) {
    params.value.sort = storedSort[0].key + ',' + storedSort[0].order
  } else {
    params.value.sort = ''
  }
}

// 엑셀 샘플 다운로드
const fetchDownloadSample = async () => {
  console.log('엑셀 샘플 다운로드')
  await downloadEmployeeSample()
  toast.success('협력사 엑셀 샘플 다운로드에 성공하였습니다.')
}

// 엑셀 업로드
const fetchUpload = async () => {
  console.log('엑셀 업로드')
  if (!uploadedFile.value) {
    toast.error('파일을 선택해주세요.')
    return
  }

  const formData = new FormData()
  formData.append('file', uploadedFile.value)

  try {
    await uploadEmployee(formData)
    toast.success('협력사 엑셀 업로드에 성공하였습니다.')

    dialog.value = false
    uploadedFile.value = null
  } catch (error) {
    console.error('업로드 실패:', error)
    throw error
  }
}

// 검색 내용 url에 반영
const restoreSearchParams = async () => {
  const sortKey = computed(() => title.value + ' sort')

  const storedSort = localStorage.getItem(sortKey.value)
  const sortArray = ref(storedSort ? JSON.parse(storedSort) : [])
  let query = route.query
  params.value = {
    name: query.name || '',
    teamName: query.teamName || '',
    rank: query.rank || '',
    type: query.type || '',
    grade: query.grade || '',
    status: query.status || '',
    page: query.page ? query.page : 1,
  }
  if (sortArray.length > 0) {
    params.value.sort = sortArray[0].key + ',' + sortArray[0].order
  }
  currentPage.value = query.page ? Number(query.page) : 1
}

const buildQueryParams = (params) => {
  return Object.keys(params)
    .filter((key) => params[key] !== '')
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&')
}

watch(
  () => route.query,
  async () => {
    await restoreSearchParams()
  },
)

restoreSearchParams()
</script>

<style scoped></style>
