<template>
    <VCard
      variant="outlined"
      class="pt-2 px-2"
    >
      <VCardItem>
        <VCardTitle>인원 정보</VCardTitle>
      </VCardItem>
      <VCardText>
        <VRow no-gutters="0">
          <VCol
            cols="12"
            md="3"
            class="pr-2"
          >
            <VTextField
              v-model="startDate"
              label="계약시작일자"
              type="date"
              variant="outlined"
              density="compact"/>
          </VCol>
          <VCol
            cols="12"
            md="3"
             class="pr-2"
          >
            <VTextField
              v-model="endDate"
              label="계약종료일"
              type="date"
              variant="outlined"
              density="compact"/>
          </VCol>
          <VCol
            cols="12"
            md="3"
             class="pl-2"
          >
            <VTextField
              v-model="projectStartDate"
              label="투입시작일자"
              type="date"
              variant="outlined"
              density="compact"/>
          </VCol>
          <VCol
            cols="12"
            md="3"
             class="pl-2"
          >
            <VTextField
              v-model="projectEndDate"
              label="투입종료일자"
              type="date"
              variant="outlined"
              density="compact"/>
          </VCol>
          <VCol
            cols="12"
            md="6"
             class="pr-2"
          >
            <VTextField
              v-model="contractName"
              label="이름(계약)"
              variant="outlined"
              density="compact"/>
          </VCol>
          <VCol
            cols="12"
            md="6"
             class="pl-2"
          >
            <VTextField
              v-model="name"
              label="이름(실투입)"
              variant="outlined"
              density="compact"/>
          </VCol>

          <VCol
            cols="12"
            md="12"
          >
            <VTextField
              v-model="id"
              label="ID"
              variant="outlined"
              density="compact"/>
          </VCol>

          <VCol
            cols="12"
            md="12"
          >
            <VTextField
              v-model="employeeType"
              label="직원구분"
              variant="outlined"
              density="compact"/>
          </VCol>

          <VCol
            cols="12"
            md="6"
             class="pr-2"
          >
            <VTextField
              v-model="pricePerUnit"
              label="단가"
              variant="outlined"
              density="compact"/>
          </VCol>
          <VCol
            cols="12"
            md="6"
             class="pl-2"
          >
            <VTextField
              v-model="price"
              label="비용"
              variant="outlined"
              density="compact"/>
          </VCol>

          <VCol
            cols="12"
            md="6"
             class="pr-2"
          >
            <VTextField
              v-model="overheadCost"
              label="제경비(%)"
              variant="outlined"
              density="compact"/>
          </VCol>
          <VCol
            cols="12"
            md="6"
             class="pl-2"
          >
            <VTextField
              v-model="sgaExpense"
              label="판관비(%)"
              variant="outlined"
              density="compact"/>
          </VCol>

          <VCol
            cols="12"
            md="12"
          >
            <VTextField
              v-model="remark"
              label="비고"
              variant="outlined"
              style="height: 200px;"
            />
          </VCol>
          
        </VRow>
      </VCardText>
    </VCard>
    </template>
    
    <script setup>
    import { defineModel } from 'vue';
    
    const startDate = defineModel('startDate');
    const endDate = defineModel('endDate');
    const projectStartDate = defineModel('projectStartDate');
    const projectEndDate  = defineModel('projectEndDate');
    const contractName = defineModel('contractName');
    const name = defineModel('name');
    const id = defineModel('id');
    const employeeType  = defineModel('employeeType');
    const pricePerUnit = defineModel('pricePerUnit');
    const price = defineModel('price');
    const overheadCost = defineModel('overheadCost');
    const sgaExpense = defineModel('sgaExpense');
    const remark = defineModel('model');

    </script>

    <style scoped>
    </style>
    