<template>
  <VContainer fluid style="margin: 0px; padding: 0px; width: 100%" class="mt-5">
    <VRow>
      <VCol cols="12" md="6">
        <PartnersInfoComponent
          v-model:name="partnersInfoData.name"
          v-model:ceoName="partnersInfoData.ceoName"
          v-model:salesRepName="partnersInfoData.salesRepName"
          v-model:salesRepPhone="partnersInfoData.salesRepPhone"
          v-model:salesRepEmail="partnersInfoData.salesRepEmail"
          v-model:zipcode="partnersInfoData.zipcode"
          v-model:street="partnersInfoData.street"
          v-model:detail="partnersInfoData.detail"
          :isReadOnly="!isEditMode"
        />
      </VCol>
      <VCol cols="12" md="6">
        <ContractInfoComponent
          class="mb-10"
          v-model:grade="contractInfoData.grade"
          v-model:commissionRate="contractInfoData.commissionRate"
          :isReadOnly="!isEditMode"
        />
        <AdditionalInfoComponent
          v-model:comment="additionalInfoData.comment"
          :isReadOnly="!isEditMode"
        />
      </VCol>
    </VRow>
    <VRow>
      <VCol class="btns-container">
        <VBtn
          v-if="!isEditMode"
          variant="tonal"
          density="comfortable"
          class="update-btn ml-2"
          @click="fnUpdateBtn"
        >
          협력사 수정
        </VBtn>
        <VBtn
          v-else
          variant="tonal"
          density="comfortable"
          class="update-btn ml-2"
          @click="fnSaveBtn"
        >
          협력사 저장
        </VBtn>
        <VBtn variant="tonal" density="comfortable" class="update-btn ml-2" @click="fnDeleteBtn">
          협력사 삭제
        </VBtn>
      </VCol>
    </VRow>
  </VContainer>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { getPartnersDetail } from '@/apis/partnerService'

import PartnersInfoComponent from '@/components/partners/PartnersInfoComponent.vue'
import ContractInfoComponent from '@/components/partners/ContractInfoComponent.vue'
import AdditionalInfoComponent from '@/components/partners/AdditionalInfoComponent.vue'

import { useDialog } from '@/composables/useDialog'
import { useToast } from 'vue-toastification'

const toast = useToast()
const dialog = useDialog()
const isEditMode = ref(false)

// const partnerData = ref(null)

/* 추후에 api로 상세 조회한 정보를 가져와야함 */
const partnersInfoData = ref({
  id: '1',
  name: '애버커스',
  ceoName: '임영택',
  salesRepName: '홍길동',
  salesRepPhone: '010-2347-2356',
  salesRepEmail: 'aaaaa@naver.com',
  zipcode: '10578',
  street: '경기도 고양시 세솔로25',
  detail: '2218동 205호',
})

const contractInfoData = ref({
  grade: 'B',
  commissionRate: '10.00',
})

const additionalInfoData = ref({
  comment: '저번 프로젝트에 일을 빨리 처리함',
})

onMounted(() => {
  const partnersId = '1' // todo: 협력사 메인에서 클릭한 협력사 ID를 넘겨주기
  fetchGetPartnersDetail(partnersId)
})

const fetchGetPartnersDetail = async (partnersId) => {
  const partnersDetail = await getPartnersDetail(partnersId)
  console.log(partnersDetail)
  updatePartnersInfo(partnersDetail)
  updateContractInfo(partnersDetail)
  updateAdditionalInfo(partnersDetail)
}

const updatePartnersInfo = (partnersDetail) => {
  partnersInfoData.value.id = partnersDetail.id
  partnersInfoData.value.name = partnersDetail.name
  partnersInfoData.value.ceoName = partnersDetail.ceoName
  partnersInfoData.value.salesRepName = partnersDetail.salesRepName
  partnersInfoData.value.salesRepPhone = partnersDetail.salesRepPhone
  partnersInfoData.value.salesRepEmail = partnersDetail.salesRepEmail
  partnersInfoData.value.zipcode = partnersDetail.zipcode
  partnersInfoData.value.street = partnersDetail.street
  partnersInfoData.value.detail = partnersDetail.detail
}

const updateContractInfo = (partnersDetail) => {
  contractInfoData.value.grade = partnersDetail.grade
  contractInfoData.value.commissionRate = partnersDetail.commissionRate
}

const updateAdditionalInfo = (partnersDetail) => {
  additionalInfoData.value.comment = partnersDetail.comment
}

const fnUpdateBtn = () => {
  isEditMode.value = true
}

const fnSaveBtn = () => {
  dialog.openDialog({
    title: '협력사 수정',
    contents: `${partnersInfoData.value.name}의 정보를 수정하시겠습니까?`,
    fnCallback: fnAfterUpdateBtn,
  })
}

const fnDeleteBtn = () => {
  dialog.openDialog({
    title: '협력사 삭제',
    contents: `${partnersInfoData.value.name} 협력사를 삭제하시겠습니까?`,
    fnCallback: () => fetchDeletePartners(partnersInfoData.value.id),
  })
}

const fetchDeleteContract = async (partnersId) => {
  //await deleteContract(partnersId)
  toast.success('협력사가 성공적으로 삭제되었습니다.')
}

const fnAfterUpdateBtn = () => alert('수정했지?? ㅇㅋㅇ 난 수정후 콜백함수다')
</script>

<style scoped>
.btns-container {
  display: flex;
  justify-content: end;
}

.update-btn {
  background-color: #eb6129;
  color: white;
}
</style>
