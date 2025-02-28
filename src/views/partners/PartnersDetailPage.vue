<template>
  <v-container fluid style="margin: 0px; padding: 0px; width: 100%" class="mt-5">
    <v-row>
      <v-col cols="12" md="6">
        <partners-info-component
          v-model:name="partnersDetail.name"
          v-model:ceoName="partnersDetail.ceoName"
          v-model:salesRepName="partnersDetail.salesRepName"
          v-model:salesRepPhone="partnersDetail.salesRepPhone"
          v-model:salesRepEmail="partnersDetail.salesRepEmail"
          v-model:zipcode="partnersDetail.zipcode"
          v-model:street="partnersDetail.street"
          v-model:detail="partnersDetail.detail"
        />
      </v-col>

      <v-col cols="12" md="6">
        <contract-info-component
          class="mb-10"
          v-model:grade="partnersDetail.grade"
          v-model:commissionRate="partnersDetail.commissionRate"
        />
        <additional-info-component v-model:comment="partnersDetail.comment" />
      </v-col>
    </v-row>

    <v-row>
      <v-col class="btns-container">
        <v-btn variant="tonal" density="comfortable" class="update-btn ml-2" @click="fnSaveBtn">
          협력사 수정
        </v-btn>

        <v-btn variant="tonal" density="comfortable" class="update-btn ml-2" @click="fnDeleteBtn">
          협력사 삭제
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
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

const partnersDetail = ref({
  name: '',
  ceoName: '',
  salesRepName: '',
  salesRepPhone: '',
  salesRepEmail: '',
  zipcode: '',
  street: '',
  detail: '',
  grade: '',
  commissionRate: '',
  comment: '',
})

onMounted(() => {
  const partnersId = '1' // todo: 협력사 메인에서 클릭한 협력사 ID를 넘겨주기
  fetchGetPartnersDetail(partnersId)
})

const fetchGetPartnersDetail = async (partnersId) => {
  const data = await getPartnersDetail(partnersId)
  // partnersDetail.value로 데이터를 할당
  partnersDetail.value = data
  console.log(partnersDetail.value)
}

const fnSaveBtn = () => {
  dialog.openDialog({
    title: '협력사 수정',
    contents: `${partnersDetail.value.name}의 정보를 수정하시겠습니까?`,
    fnCallback: fnAfterUpdateBtn,
  })
}

const fnDeleteBtn = () => {
  dialog.openDialog({
    title: '협력사 삭제',
    contents: `${partnersDetail.value.name} 협력사를 삭제하시겠습니까?`,
    fnCallback: () => fetchDeletePartners(partnersDetail.value.id),
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
