<template>
  <v-row>
    <v-col class="mt-3">
      <SearchBarComponent :rows="searchRows" @search="handleSearch" @reset="handleReset" />
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <!-- 테이블 컴포넌트 -->
      <TableComponent
        :headers="headers"
        :items="items"
        title="협력사 목록"
        :loading="loading"
        @click-row="clickRow"
        :page="currentPage"
        :length="totalElements"
        @loadItems="loadItems"
        @open-dialog="CreateDialogs"
      />
      <div class="d-flex justify-end">
        <ExcelActionsComponent
          @download="fetchDownloadPartners"
          @upload="fetchUploadPartners"
          @downloadSample="fetchDownloadPartnersSample"
          v-model:file="uploadedFile"
          v-model:dialog="dialog"
        />
      </div>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref, watch } from 'vue'
import TableComponent from '@/components/table/TableComponent.vue'
import SearchBarComponent from '@/components/searchbar/SearchBarComponent.vue'
import {
  downloadPartners,
  downloadPartnersSample,
  getPartners,
  uploadPartners,
  createPartners,
} from '@/apis/partnerService.js'
import ExcelActionsComponent from '@/components/common/ExcelActionsComponent.vue'

import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useDialog } from '@/composables/useDialog'
import PartnersCreatePopup from './PartnersCreatePopup.vue'

const router = useRouter()
const route = useRoute()
const toast = useToast()

const CreateDialog = useDialog()
const dialog = ref(false)
const loading = ref(false)

const currentPage = ref(1)
const totalElements = ref(0)
const size = ref(10)
const items = ref([])

const uploadedFile = ref(null)

// 검색 조건 및 페이징 조건
const params = ref({
  grade: '',
  name: '',
  ceoName: '',
  salesRepName: '',
  page: 1,
  size: 10,
})

// 테이블 헤더
const headers = ref([
  { title: '협력사명', key: 'name' },
  { title: '대표자명', key: 'ceoName' },
  { title: '영업대표명', key: 'salesRepName' },
  { title: '영업대표 연락처', key: 'salesRepPhone' },
  { title: '영업대표 이메일', key: 'salesRepEmail' },
  { title: '평가등급', key: 'grade' },
  { title: '주소', key: 'address' },
])

// 검색 조건
const searchRows = ref([
  {
    fields: [
      {
        key: 'grade',
        label: '평가등급',
        type: 'select',
        columnCount: 6,
        input: {
          user_id: 1,
        },
        options: [
          { title: '전체', value: '' },
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

// 테이블 row 클릭
const clickRow = (item) => router.push(`/partners/${item.id}`)

// 데이터 불러오기
const loadItems = async (page = 1, itemsPerPage = 10, sortBy = []) => {
  loading.value = true
  params.value.page = page
  params.value.size = itemsPerPage
  if (sortBy.length > 0) {
    params.value.sort = sortBy[0].key + ',' + sortBy[0].order
  } else {
    params.value.sort = []
  }

  const response = await getPartners(params.value)
  items.value = response.content
  totalElements.value = response.totalElements
  await router.replace(`/partners?${buildQueryParams(params.value)}`)
  loading.value = false
}

// 검색 이벤트 핸들러
const handleSearch = async (filters) => {
  params.value = { ...filters, page: 1 }
  currentPage.value = 1
  await loadItems()
}

// 초기화 이벤트 핸들러
const handleReset = async () => {
  params.value = { grade: '', name: '', ceoName: '', salesRepName: '', page: 1, size: 10 }
  currentPage.value = 1
  await loadItems()
}

const CreateDialogs = () => {
  CreateDialog.openDialog({
    title: '협력사 등록',
    component: PartnersCreatePopup,
    fnCallback: (data) => {
      console.log('받은 데이터: ', data)
      fectchCreatePartners(data)
    },
  })
}

const fectchCreatePartners = async (data) => {
  await createPartners(data)
  await handleReset()
  toast.success('협력사가 성공적으로 등록되었습니다.')
}

// 엑셀 다운로드
const fetchDownloadPartners = async () => {
  console.log('엑셀 다운로드')
  await downloadPartners(params.value)
  toast.success('협력사 엑셀 다운로드에 성공하였습니다.')
}

// 엑셀 샘플 다운로드
const fetchDownloadPartnersSample = async () => {
  console.log('엑셀 샘플 다운로드')
  await downloadPartnersSample()
  toast.success('협력사 엑셀 샘플 다운로드에 성공하였습니다.')
}

// 엑셀 업로드
const fetchUploadPartners = async () => {
  console.log('엑셀 업로드')
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

// 검색 내용 url에 반영
const restoreSearchParams = async () => {
  const query = route.query
  params.value = {
    grade: query.grade || '',
    name: query.name || '',
    ceoName: query.ceoName || '',
    salesRepName: query.salesRepName || '',
    page: query.page ? Number(query.page) : 1,
    size: query.size ? Number(query.size) : 10,
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
