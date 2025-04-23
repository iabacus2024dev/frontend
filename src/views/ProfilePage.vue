<template>
  <div>
    <div class="d-flex align-center mb-4">
      <h1 class="text-h4 font-weight-bold">마이페이지</h1>
    </div>

    <v-row>
      <!-- Sidebar Profile Card -->
      <v-col cols="12" md="4">
        <BasicProfileComponent />
        <PasswordChangeComponent />
        <DeleteMemberComponent />
      </v-col>
      <v-col cols="12" md="8">
        <ProjectListComponent />
        <RoleListComponent />
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import BasicProfileComponent from '@/components/profile/BasicProfileComponent.vue'
import ProjectListComponent from '@/components/profile/ProjectListComponent.vue'
import PasswordChangeComponent from '@/components/profile/PasswordChangeComponent.vue'
import DeleteMemberComponent from '@/components/profile/DeleteMemberComponent.vue'
import RoleListComponent from '@/components/profile/RoleListComponent.vue'
</script>

<style scoped></style>
