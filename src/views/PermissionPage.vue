<script setup>
import RoleSelectionComponent from "@/components/permission/RoleSelectionComponent.vue";
import RoleAddComponent from "@/components/permission/RoleAddComponent.vue";
import RoleTargetComponent from "@/components/permission/RoleTargetComponent.vue";
import {ref} from "vue";
import PermissionSettingComponent from "@/components/permission/PermissionSettingComponent.vue";

const selectedRole = ref(null);
const customRoles = ref([]);
const defaultRoles = ref([
  ["관리자", 2],
  ["팀장", 12],
  ["정직원", 200],
]);

const handleRoleSelected = (role) => {
  selectedRole.value = {
    title: role[0],
    count: role[1],
    members: []
  }
}

const handleRoleAdded = (newRole) => {
  if (!customRoles.value.some(([title]) => title === newRole.title)) {
    customRoles.value = [...customRoles.value, [newRole.title, 1]];
  }
};

const handleRoleRemoved = (targetRole) => {
  customRoles.value = customRoles.value.filter(([title]) => title !== targetRole.title)
}

const handleRoleUpdated = (updatedRole) => {
  if (selectedRole.value && selectedRole.value.title === updatedRole.title) {
    selectedRole.value.count = updatedRole.count;
    selectedRole.value.members = [...updatedRole.members];
  }
  const customRole = customRoles.value.find(([title]) => title === updatedRole.title);
  if (customRole) {
    customRole[1] = updatedRole.count;
  }
}
</script>

<template>
  <v-row>
    <v-col cols="12" md="3">
      <RoleAddComponent @roleAdded="handleRoleAdded" @roleRemoved="handleRoleRemoved"/>
      <RoleSelectionComponent :select-roles="selectedRole" :custom-roles="customRoles" :default-roles="defaultRoles" @roleSelected="handleRoleSelected" />
    </v-col>
    <v-col cols="12" md="9">
      <RoleTargetComponent :role="selectedRole" @roleUpdated="handleRoleUpdated" />
      <PermissionSettingComponent />
    </v-col>
  </v-row>
</template>

<style scoped></style>
