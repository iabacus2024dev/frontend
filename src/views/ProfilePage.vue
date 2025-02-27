<template>
  <v-row>
    <!-- Sidebar Profile Card -->
    <v-col cols="12" md="4">
      <BasicProfileComponent />
      <PasswordChangeComponent />
      <DeleteMemberComponent />
    </v-col>
    <v-col cols="12" md="8">
      <ProjectListComponent />
      <TeamListComponent />
    </v-col>
  </v-row>
</template>

<script setup>
import BasicProfileComponent from '@/components/profile/BasicProfileComponent.vue'
import ProjectListComponent from '@/components/profile/ProjectListComponent.vue'
import PasswordChangeComponent from '@/components/profile/PasswordChangeComponent.vue'
import TeamListComponent from '@/components/profile/TeamListComponent.vue'
import DeleteMemberComponent from '@/components/profile/DeleteMemberComponent.vue'
</script>

<style scoped></style>
