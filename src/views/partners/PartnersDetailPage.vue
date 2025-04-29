<template>
  <v-row class="mt-3">
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
        class="mb-4"
        v-model:grade="partnersDetail.grade"
        v-model:commissionRate="partnersDetail.commissionRate"
      />
      <additional-info-component v-model:comment="partnersDetail.comment" />
    </v-col>
  </v-row>

  <v-row>
    <v-col class="btns-container">
      <v-btn variant="tonal" class="update-btn ml-2" @click="fnSaveBtn"> 협력사 수정 </v-btn>
      <v-btn color="primary" variant="outlined" class="ml-2" @click="fnDeleteBtn">
        협력사 삭제
      </v-btn>
    </v-col>
  </v-row>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { deletePartners, getPartnersDetail, updatePartners } from '@/apis/partnerService'

import PartnersInfoComponent from '@/components/partners/PartnersInfoComponent.vue'
import ContractInfoComponent from '@/components/partners/ContractInfoComponent.vue'
import AdditionalInfoComponent from '@/components/partners/AdditionalInfoComponent.vue'

import { useDialog } from '@/composables/useDialog'
import { useToast } from 'vue-toastification'
import { useRoute, useRouter } from 'vue-router'

const toast = useToast()
const dialog = useDialog()

const partnersDetail = ref({
  name: '',
  ceoName: '',
  salesRepName: '',
  salesRepEmail: '',
  salesRepPhone: '',
  zipcode: '',
  street: '',
  detail: '',
  grade: '',
  commissionRate: '',
  comment: '',
  modifiedDateTime: '',
})

const route = useRoute()
const partnersId = route.params.id
onMounted(() => {
  fetchGetPartnersDetail(partnersId)
})

const fetchGetPartnersDetail = async (partnersId) => {
  partnersDetail.value = await getPartnersDetail(partnersId)
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
    fnCallback: () => fetchDeletePartners(),
  })
}

const router = useRouter()
const fetchDeletePartners = async () => {
  await deletePartners(partnersId)
  toast.success(`${partnersDetail.value.name} 협력사가 삭제되었습니다.`)
  await router.push('/partners')
}

const fnAfterUpdateBtn = async () => {
  try {
    await updatePartners(partnersId, partnersDetail.value)
    toast.success(`${partnersDetail.value.name} 협력사의 정보가 수정되었습니다.`)
  } finally {
    await fetchGetPartnersDetail(partnersId)
  }
}
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

.dialog-header {
  background-color: rgb(var(--v-theme-primary));
  color: white;
  padding: 16px;
}
</style>
