<template>
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="6">
          <ProjectInfo/>
        </v-col>
        <v-col cols="12" md="6">
          <ContractInfo/>
        </v-col>
        <v-col cols="12" md="12">
          <MemberInfo/>
        </v-col>
      </v-row>
    </v-container>
    <VContainer class="btns-container">
    <VBtn variant="tonal" density="comfortable" class="delete-btn" @click="handleUpdateBtn">
      투입 인원 수정
    </VBtn>
    <VBtn variant="tonal" density="comfortable" class="update-btn ml-2" @click="handleDeleteBtn">
      투입 인원 삭제 
    </VBtn>
  </VContainer>
</template>
<script setup>
    import ContractInfo from '@/components/contractMember/contractInfo.vue';
    import MemberInfo from '@/components/contractMember/memberInfo.vue';
    import ProjectInfo from '@/components/contractMember/projectInfo.vue';
    import { ref } from 'vue';
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