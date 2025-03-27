<script setup>
import {useDialog} from "@/composables/useDialog.js";
import RoleSettingDialog from "@/components/permission/RoleSettingDialog.vue";
import {useRoleStore} from "@/stores/roleStore.js";

const {openDialog} = useDialog();
const emit = defineEmits(["roleUpdated"]);
const roleStore = useRoleStore();

const props = defineProps({
  role: Object,
})

const openRoleSettingDialog = () => {
  openDialog({
    id: "RoleSettingDialog",
    title: "역할 대상 설정",
    component: RoleSettingDialog,
    props: {
      initialRoles: props.role?.members || [],
      onConfirm: (selectedMember) => {
        roleStore.setSelectedMembers(selectedMember)

        const existingIds = new Set(props.role?.members.map((member) => member.id) || []);
        const newMembers = selectedMember.filter((member) => !existingIds.has(member.id));

        const updatedRole = { ...props.role, members: [...(props.role.members || []), ...newMembers] };
        updatedRole.count = updatedRole.members.length;
        emit("roleUpdated", updatedRole);
      }
    },
  });
}
</script>

<template>
  <v-card border="thin" class="mt-4 pa-4" variant="outlined">
    <div v-if="role">
      '<strong>{{ role.title }}</strong>' 역할 대상 ({{ role.count }})
    </div>

    <v-divider class="my-4"></v-divider>

    <div v-if="role" class="d-flex justify-space-between align-center">
      <div class="d-flex flex-wrap">
        <v-icon v-for="i in Math.min(role.count, 30)" icon="mdi-account-circle" :key="i"></v-icon>
      </div>
      <v-btn append-icon="mdi-check-circle" @click="openRoleSettingDialog">
        <template v-slot:append>
          <v-icon>mdi-arrow-right</v-icon>
        </template>

        역할 대상 설정하기
      </v-btn>
    </div>

  </v-card>
</template>

<style scoped>

</style>
