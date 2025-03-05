<template>
<VContainer class="mt-5">
  <p class="text-h4 font-weight-bold">투입 인원 등록</p>
</VContainer>

<VContainer>
  <VRow>
    <VContainer>
      <VCol cols="12" md="12">
        <ProjectInfoComponent/>
      </VCol>
    </VContainer>
    <VContainer>
      <VCol cols="12" md="12" >
        <ContractInfoComponent/>
       </VCol>
    </VContainer>
    <VContainer>
      <VCol>
        <PersonInfoComponent/>
      </VCol>
    </VContainer>
  </VRow>
</VContainer>

</template>

<script setup>
import ContractInfoComponent from '@/components/project/ContractInfoComponent.vue';
import PersonInfoComponent from '@/components/project/PersonInfoComponent.vue';
import ProjectInfoComponent from '@/components/project/ProjectInfoComponent.vue';


</script>