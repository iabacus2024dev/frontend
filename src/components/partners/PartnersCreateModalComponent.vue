<template>
  <v-row>
    <v-col>
      <div class="mt-3">
        <PartnersInfoComponent
          :name="name"
          :ceo-name="ceoName"
          :sales-rep-name="salesRepName"
          :sales-rep-phone="salesRepPhone"
          :sales-rep-email="salesRefEmail"
          :zipcode="zipcode"
          :street="street"
          :detail="detail"
        />
      </div>
      <div class="mt-3">
        <ContractInfoComponent />
      </div>
      <div class="mt-3">
        <AdditionalInfoComponent />
      </div>
    </v-col>
  </v-row>
</template>

<script setup>
import AdditionalInfoComponent from '@/components/partners/AdditionalInfoComponent.vue'
import ContractInfoComponent from '@/components/partners/ContractInfoComponent.vue'
import PartnersInfoComponent from '@/components/partners/PartnersInfoComponent.vue'
import { defineProps } from 'vue'

const props = defineProps({
  name: String,
  ceoName: String,
  salesRepName: String,
  salesRepPhone: String,
  salesRefEmail: String,
  zipcode: String,
  street: String,
  detail: String,
})
</script>

<style scoped></style>
