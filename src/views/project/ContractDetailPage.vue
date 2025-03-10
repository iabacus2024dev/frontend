<template>
  <!-- 상세 정보 폼 -->
  <VContainer>
    <VRow>
      <VCol cols="12" md="6">
        <ProjectInfoComponent
          class="mb-6"
          v-model:project-name="projectInfoData.projectName"
          v-model:project-code="projectInfoData.projectCode"
        />
        <ContractInfoComponent
          v-model:contract-code="contractInfoData.contractCode"
          v-model:start-date="contractInfoData.startDate"
          v-model:end-date="contractInfoData.endDate"
        />
      </VCol>
      <VCol cols="12" md="6">
        <ProgressInfoComponent
          style="height: 100%"
          v-model:status="progressInfoData.status"
          v-model:start-date="progressInfoData.startDate"
          v-model:end-date="progressInfoData.endDate"
        />
      </VCol>
    </VRow>
  </VContainer>
  <VContainer class="btns-container">
    <VBtn variant="tonal" density="comfortable" class="delete-btn" @click="handleDeleteBtn">
      계약 삭제
    </VBtn>
    <VBtn variant="tonal" density="comfortable" class="update-btn ml-2" @click="handleUpdateBtn">
      계약 수정
    </VBtn>
  </VContainer>

  <!-- 테이블 -->
  <VContainer class="mt-8">
    <p class="text-h4 font-weight-bold">투입 인원 목록</p>
  </VContainer>

  <VContainer>
    <TableComponent :tableTitle="tableTitleResponse" :tableData="tableDataResponse" />

    <TableEventComponent
      :tableDataEvent="tableDataEventCondition"
      @create-data-button-click="fnCreateData"
    />
  </VContainer>
</template>

<script setup>
import { onMounted, ref } from 'vue'

import TableComponent from '@/components/table/TableComponent.vue'
import TableEventComponent from '@/components/table/TableEventComponent.vue'
import ProjectInfoComponent from '@/components/project/ProjectInfoComponent.vue'
import ContractInfoComponent from '@/components/project/ContractInfoComponent.vue'
import ProgressInfoComponent from '@/components/project/ProgressInfoComponent.vue'

import { deleteContract, getContractDetail, updateContract } from '@/apis/contractService'
import { useDialog } from '@/composables/useDialog'

import { useToast } from 'vue-toastification'

const toast = useToast()
const dialog = useDialog()

const tableTitleResponse = ref(['메뉴명', '메뉴설명', '열량(Kcal)', '당류(g/%)', '카페인(mg/%)'])

const props = defineProps({
  projectId: String,
  contractId: String,
})

console.log(props.projectId, props.contractId)

const tableDataResponse = ref([
  {
    menuName: '아메리카노',
    menuDescription: '진하게 로스팅한 커피 원두에서 풍미를 느낄 수 있는 에스프레소 음료',
    calories: '15',
    sugar: '0',
    caffeine: '184',
  },
  {
    menuName: '카페 라떼',
    menuDescription: '에스프레소와 스팀밀크 위에 부드러운 우유 거품을 살짝 올려준 에스프레소 음료',
    calories: '190',
    sugar: '12',
    caffeine: '184',
  },
])

const tableDataEventCondition = ref({
  createData: true,
})

/* todo: 프로젝트 상세 페이지에서 정보 가져오기 */
const projectInfoData = ref({
  projectName: '커피 프로젝트',
  projectCode: 'coffeepj-01',
})

const contractInfoData = ref({
  id: '1',
  contractCode: 'coffeepj-01-ctr-01',
  startDate: '2025-02-04',
  endDate: '2025-03-06',
})

const progressInfoData = ref({
  status: '예약',
  startDate: '2025-02-06',
  endDate: '2025-03-06',
})

const fetchGetContractDetail = async (contractId) => {
  const contractDetail = await getContractDetail(contractId)
  updateContractInfo(contractDetail)
  updateProgressInfo(contractDetail)
}

const fetchDeleteContract = async (contractId) => {
  await deleteContract(contractId)
  toast.success('계약이 성공적으로 삭제되었습니다.')
}

const fetchUpdateContract = async (contractId) => {
  const requestData = {
    startDate: contractInfoData.value.startDate,
    endDate: contractInfoData.value.endDate,
    endDate: contractInfoData.value.endDate,
    status: 'RESERVED', // todo: Enum
    actualStartDate: progressInfoData.value.startDate,
    actualEndDate: progressInfoData.value.endDate,
  }

  await updateContract(contractId, requestData)
  toast.success('계약이 성공적으로 수정되었습니다.')
}

const updateContractInfo = (contractDetail) => {
  contractInfoData.value.id = contractDetail.id
  contractInfoData.value.contractCode = contractDetail.code
  contractInfoData.value.startDate = contractDetail.startDate
  contractInfoData.value.endDate = contractDetail.endDate
}

const updateProgressInfo = (contractDetail) => {
  progressInfoData.value.status = contractDetail.status
  progressInfoData.value.startDate = contractDetail.actualStartDate
  progressInfoData.value.endDate = contractDetail.actualEndDate
}

/* 컴포넌트가 마운트될 때 계약 상세 정보 가져오기 */
onMounted(() => {
  const contractId = '550e8400-e29b-41d4-a716-446655440000' // todo: 프로젝트 상세에서 클릭한 계약 ID를 넘겨주기
  fetchGetContractDetail(contractId)
})

/* 버튼 클릭 시, 다이얼로그 오픈 */
const handleDeleteBtn = () => {
  dialog.openDialog({
    title: '계약 삭제',
    contents: `${contractInfoData.value.contractCode}번 계약을 삭제하시겠습니까?`,
    fnCallback: () => fetchDeleteContract(contractInfoData.value.id),
  })
}

const handleUpdateBtn = () => {
  dialog.openDialog({
    title: '계약 수정',
    contents: `${contractInfoData.value.contractCode}번 계약을 수정하시겠습니까?`,
    fnCallback: () => fetchUpdateContract(contractInfoData.value.id),
  })
}
</script>

<style scoped>
.btns-container {
  display: flex;
  justify-content: end;
}

.v-card {
  border-color: lightgray;
}

.update-btn {
  background-color: #eb6129;
  color: white;
}
</style>
