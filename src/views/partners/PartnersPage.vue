<template>
  <v-row>
    <v-col class="mt-3">
      <SearchBarComponent :rows="searchRows" @search="handleSearch" @reset="handleReset" />
    </v-col>
  </v-row>
  <h1 class="text-h5 mt-3 mb-3 font-weight-bold mt-7">협력사 목록</h1>
  <v-row>
    <v-col>
      <v-row>
        <v-col>
          <div class="d-flex">전체 : {{ totalElements }}건</div>
        </v-col>
        <v-col class="d-flex justify-end mb-2">
          <ExcelActionsComponent
            @download="fetchDownloadPartners"
            @upload="fetchUploadPartners"
            @downloadSample="fetchDownloadPartnersSample"
            v-model:file="uploadedFile"
            v-model:dialog="dialog"
          />
        </v-col>
      </v-row>
      <!-- 테이블 컴포넌트 -->
      <TableComponent
        :headers="headers"
        :items="items"
        @click-row="clickRow"
        :loading="loading"
        @download="fetchDownloadPartners"
        @upload="fetchUploadPartners"
        @downloadSample="fetchDownloadPartnersSample"
        v-model:file="uploadedFile"
        v-model:dialog="dialog"
        :page="currentPage"
        :length="totalPages"
        @change-page="handlePageChange"
      />
      <!-- 페이지네이션 -->
      <PaginationComponent
        :page="currentPage"
        :length="totalPages"
        @change-page="handlePageChange"
      />
    </v-col>
  </v-row>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import TableComponent from '@/components/table/TableComponent.vue'
import PaginationComponent from '@/components/common/PaginationComponent.vue'
import SearchBarComponent from '@/components/searchbar/SearchBarComponent.vue'
import {
  downloadPartners,
  downloadPartnersSample,
  getPartners,
  uploadPartners,
} from '@/apis/partnerService.js'
import ExcelActionsComponent from '@/components/common/ExcelActionsComponent.vue'

import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const router = useRouter()
const route = useRoute()

const modal = ref(null)
const modalTitle = ref('협력사 삭제')
const modalText = ref('....삭제 하겠습니까?')
const dialog = ref(false)

const currentPage = ref(1)
const totalPages = ref(0)
const totalElements = ref(0)
const items = ref([])
const loading = ref(false)

const uploadedFile = ref(null)

const params = ref({
  grade: '',
  name: '',
  ceoName: '',
  salesRepName: '',
  page: 1,
})

const headers = ref([
  { title: '협력사명', key: 'name' },
  { title: '대표자명', key: 'ceoName' },
  { title: '영업대표명', key: 'salesRepName' },
  { title: '영업대표 연락처', key: 'salesRepPhone' },
  { title: '영업대표 이메일', key: 'salesRepEmail' },
  { title: '평가등급', key: 'grade' },
  { title: '주소', key: 'address' },
])

const clickRow = (item) => {
  router.push(`/partners/${item.id}`)
}

const restoreSearchParams = async () => {
  const query = route.query
  params.value = {
    grade: query.grade || '',
    name: query.name || '',
    ceoName: query.ceoName || '',
    salesRepName: query.salesRepName || '',
    page: query.page ? Number(query.page) : 1,
  }
  currentPage.value = query.page ? Number(query.page) : 1
}

onMounted(async () => {
  await restoreSearchParams()
  await searchPartners()
})

const searchPartners = async () => {
  loading.value = true
  const response = await getPartners(params.value)
  totalPages.value = response.totalPages
  totalElements.value = response.totalElements
  items.value = response.content

  await router.replace(`/partners?${buildQueryParams(params.value)}`)
  loading.value = false
}

const buildQueryParams = (params) => {
  return Object.keys(params)
    .filter((key) => params[key] !== '')
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&')
}

const fetchDownloadPartners = async () => {
  console.log('엑셀 다운로드')
  await downloadPartners(params.value)
  const toast = useToast()
  toast.success('협력사 엑셀 다운로드에 성공하였습니다.')
}

const fetchDownloadPartnersSample = async () => {
  console.log('엑셀 샘플 다운로드')
  await downloadPartnersSample()
  const toast = useToast()
  toast.success('협력사 엑셀 샘플 다운로드에 성공하였습니다.')
}

const fetchUploadPartners = async () => {
  console.log('엑셀 업로드')
  const toast = useToast()
  if (!uploadedFile.value) {
    toast.error('파일을 선택해주세요.')
    return
  }

  const formData = new FormData()
  formData.append('file', uploadedFile.value)

  try {
    await uploadPartners(formData)
    await handleReset()
    toast.success('협력사 엑셀 업로드에 성공하였습니다.')

    dialog.value = false
    uploadedFile.value = null
  } catch (error) {
    console.error('업로드 실패:', error)
    throw error
  }
}

const openDialog = () => {
  dialog.value = true
}

const closeDialog = () => {
  dialog.value = false
}

// 모달 열기
const openModal = () => {
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
const handlePageChange = async (newPage) => {
  currentPage.value = newPage
  params.value.page = newPage
  await searchPartners()
}

watch(
  () => route.query,
  async () => {
    await restoreSearchParams()
    await searchPartners()
  },
)

const searchRows = ref([
  {
    fields: [
      {
        key: 'grade',
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
      { key: 'name', label: '협력사명', type: 'text' },
      { key: 'ceoName', label: '대표자명', type: 'text' },
      { key: 'salesRepName', label: '영업대표명', type: 'text' },
    ],
  },
])

const handleSearch = async (filters) => {
  params.value = { ...filters, page: 1 }
  currentPage.value = 1
  await searchPartners()
}

const handleReset = async () => {
  params.value = { grade: '', name: '', ceoName: '', salesRepName: '', page: 1 }
  currentPage.value = 1
  await searchPartners()
}
</script>

<style scoped></style>
