<script setup>
import RoleSelectionComponent from "@/components/permission/RoleSelectionComponent.vue";
import RoleAddComponent from "@/components/permission/RoleAddComponent.vue";
import RoleTargetComponent from "@/components/permission/RoleTargetComponent.vue";
import {onMounted, reactive, ref} from "vue";
import PermissionSettingComponent from "@/components/permission/PermissionSettingComponent.vue";
import {getRoles} from "@/apis/roleService.js";

const role = reactive({
  selected: null,
  custom: [],
  default: [],
  isDefault: false
})

const fetchRoles = async () => {
  try {
    (await getRoles()).forEach((res) => {
      (res.isDefault ? role.default : role.custom).push([res.name, res.memberCount])
    });
  } catch (err) {
    console.error("fetchRoles error", err);
  }
};

onMounted(fetchRoles);

const handleRoleSelected = (selectedRole) => {
  role.selected = {
    title: selectedRole[0],
    count: selectedRole[1],
    members: []
  }
}

const handleRoleAdded = (newRole) => {
  if (!role.custom.some(([title]) => title === newRole.title)) {
    role.custom.push([newRole.title, 0]);
  }
};

const handleRoleRemoved = (targetRole) => {
  const index = role.custom.findIndex(([title]) => title === targetRole.title);
  if (index !== -1) role.custom.splice(index, 1);
}

function updateRole(whichRole, updatedRole) {
  const foundRole = whichRole.find(([title]) => title === updatedRole.title);
  if (foundRole) {
    foundRole[1] = updatedRole.count;
    role.isDefault = whichRole === role.default;
  }
}

function updateSelectedRole(updatedRole) {
  console.log(updatedRole)
  if (role.selected && role.selected.title === updatedRole.title) {
    role.selected.count = updatedRole.count;
    role.selected.members = [...updatedRole.members];
  }
}

const handleRoleUpdated = (updatedRole) => {
  console.log(updatedRole)
  updateSelectedRole(updatedRole);
  updateRole(role.default, updatedRole);
  updateRole(role.custom, updatedRole);
}
</script>

<template>
  <v-row>
    <v-col cols="12" md="3">
      <RoleAddComponent @roleAdded="handleRoleAdded" @roleRemoved="handleRoleRemoved"/>
      <RoleSelectionComponent :select-roles="role.selected" :custom-roles="role.custom" :default-roles="role.default" @roleSelected="handleRoleSelected" />
    </v-col>
    <v-col cols="12" md="9">
      <RoleTargetComponent :role="role.selected" @roleUpdated="handleRoleUpdated" />
      <PermissionSettingComponent :select-roles="role.selected" :is-default="role.isDefault" />
    </v-col>
  </v-row>
</template>

<style scoped></style>
