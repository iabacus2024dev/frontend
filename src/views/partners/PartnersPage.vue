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
        title="협력사 목록"
        :loading="loading"
        @click-row="clickRow"
        :page="currentPage"
        :length="totalElements"
        @loadItems="loadItems"
        @open-dialog="dialog = true"
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
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import TableComponent from '@/components/table/TableComponent.vue'
import SearchBarComponent from '@/components/searchbar/SearchBarComponent.vue'
import ExcelActionsComponent from '@/components/common/ExcelActionsComponent.vue'
import {
  downloadPartners,
  downloadPartnersSample,
  getPartners,
  uploadPartners,
} from '@/apis/partnerService.js'

const router = useRouter()
const route = useRoute()
const toast = useToast()

const dialog = ref(false)
const loading = ref(false)
const currentPage = ref(1)
const totalElements = ref(0)
const items = ref([])
const uploadedFile = ref(null)
const params = ref({ grade: '', name: '', ceoName: '', salesRepName: '', page: 1, size: 10 })

const headers = ref([
  { title: '협력사명', key: 'name' },
  { title: '대표자명', key: 'ceoName' },
  { title: '영업대표명', key: 'salesRepName' },
  { title: '영업대표 연락처', key: 'salesRepPhone' },
  { title: '영업대표 이메일', key: 'salesRepEmail' },
  { title: '평가등급', key: 'grade' },
  { title: '주소', key: 'address' },
])

const searchRows = ref([
  {
    fields: [
      {
        key: 'grade',
        label: '평가등급',
        type: 'select',
        columnCount: 6,
        options: ['A', 'B', 'C', 'D', 'E']
          .map((v) => ({ title: v, value: v }))
          .concat([{ title: '전체', value: '' }]),
      },
      { key: 'name', label: '협력사명', type: 'text' },
      { key: 'ceoName', label: '대표자명', type: 'text' },
      { key: 'salesRepName', label: '영업대표명', type: 'text' },
    ],
  },
])

const clickRow = (item) => router.push(`/partners/${item.id}`)

const restoreSearchParams = () => {
  params.value = {
    grade: route.query.grade || '',
    name: route.query.name || '',
    ceoName: route.query.ceoName || '',
    salesRepName: route.query.salesRepName || '',
    page: Number(route.query.page) || 1,
    size: Number(route.query.size) || 10,
  }
  currentPage.value = params.value.page
}

const buildQueryParams = (params) => new URLSearchParams(params).toString()

const fetchDownloadPartners = async () => {
  await downloadPartners(params.value)
  toast.success('협력사 엑셀 다운로드에 성공하였습니다.')
}

const fetchDownloadPartnersSample = async () => {
  await downloadPartnersSample()
  toast.success('협력사 엑셀 샘플 다운로드에 성공하였습니다.')
}

const fetchUploadPartners = async () => {
  if (!uploadedFile.value) return toast.error('파일을 선택해주세요.')
  try {
    await uploadPartners(new FormData().append('file', uploadedFile.value))
    await handleReset()
    toast.success('협력사 엑셀 업로드에 성공하였습니다.')
    dialog.value = false
    uploadedFile.value = null
  } catch (error) {
    console.error('업로드 실패:', error)
  }
}

const loadItems = async (page = 1, size = 10, sortBy = []) => {
  loading.value = true
  params.value = {
    page,
    size,
    sort: sortBy.length ? `${sortBy[0].key},${sortBy[0].order}` : '',
  }
  const response = await getPartners(params.value)
  items.value = response.content
  totalElements.value = response.totalElements
  await router.replace(`/partners?${buildQueryParams(params.value)}`)
  loading.value = false
}

const handleSearch = async (filters) => {
  Object.assign(params.value, filters, { page: 1 })
  currentPage.value = 1
  await loadItems()
}

const handleReset = async () => {
  params.value = {
    grade: '',
    name: '',
    ceoName: '',
    salesRepName: '',
    page: 1,
    size: 10,
  }
  currentPage.value = 1
  await loadItems()
}

watch(() => route.query, restoreSearchParams)
restoreSearchParams()
</script>

<style scoped></style>
