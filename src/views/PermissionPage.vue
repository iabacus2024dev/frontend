<script setup>
import RoleSelectionComponent from "@/components/permission/RoleSelectionComponent.vue";
import RoleAddComponent from "@/components/permission/RoleAddComponent.vue";
import RoleTargetComponent from "@/components/permission/RoleTargetComponent.vue";
import {onMounted, ref} from "vue";
import PermissionSettingComponent from "@/components/permission/PermissionSettingComponent.vue";
import {getRoles} from "@/apis/roleService.js";

const selectedRole = ref(null);
const customRoles = ref([]);
const defaultRoles = ref([]);

const fetchRoles = async () => {
  try {
    (await getRoles()).forEach((res) => {
      ((res.isDefault ? defaultRoles : customRoles).value.push([res.name, res.memberCount]))
    });
  } catch (err) {
    console.error("fetchRoles error", err);
  }
};

onMounted(fetchRoles);

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

function updateDefaultRole(updatedRole) {
  const defaultRole = defaultRoles.value.find(([title]) => title === updatedRole.title);
  if (defaultRole) {
    defaultRole[1] = updatedRole.count;
  }
}

function updateCustomRole(updatedRole) {
  const customRole = customRoles.value.find(([title]) => title === updatedRole.title);
  if (customRole) {
    customRole[1] = updatedRole.count;
  }
}

function updateSelectedRole(updatedRole) {
  if (selectedRole.value && selectedRole.value.title === updatedRole.title) {
    selectedRole.value.count = updatedRole.count;
    selectedRole.value.members = [...updatedRole.members];
  }
}

const handleRoleUpdated = (updatedRole) => {
  updateSelectedRole(updatedRole);
  updateDefaultRole(updatedRole);
  updateCustomRole(updatedRole);
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
