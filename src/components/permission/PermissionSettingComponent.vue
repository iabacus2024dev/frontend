<script setup>
import ManagementComponent from "@/components/permission/ManagementComponent.vue";
import {reactive} from "vue";
import {addRole} from "@/apis/roleService.js";
import {useToast} from "vue-toastification";

const props = defineProps({
  selectRoles: {
    type: Object,
    required: false,
    default: null
  },
  isDefault : {
    type: Boolean,
    required: false,
    default: false
  }
});

const defaultPermissions = {viewAuth: false, editAuth: false, authRange: null}
const managementTitles = ["프로젝트 관리", "구성원 관리", "협력사 관리", "매출 관리", "권한 관리", "휴가 관리",];
const managements = reactive(
  managementTitles.map(title => ({
    title,
    permissions: { ...defaultPermissions }
  }))
)
const handleViewAuth = (index, view) => managements[index].permissions.viewAuth = view;
const handleEditAuth = (index, edit) => managements[index].permissions.editAuth = edit;
const handleAuthRange = (index, authRange) => managements[index].permissions.authRange = authRange

const handleSave = async () => {
  try {
    console.log(props.selectRoles)
    await addRole({
      roleName: props.selectRoles.title,
      isDefaultRole: props.isDefault,
      authorityList: managements.map(({title, permissions}) => ({
        authorityName: title,
        authorityPage: title.substring(0, title.lastIndexOf("관") - 1),
        authorityAction: permissions.editAuth ? "편집" : (permissions.viewAuth ? "조회" : null),
        authorityRange: permissions.authRange
      })),
      roleMemberRequestList: props.selectRoles.members
    });
    useToast().success('권한 설정에 성공했습니다.')
  } catch (err) {
    console.error("fetchRoles error", err);
  }
}
</script>

<template>
  <v-card border="thin" class="mt-4 pa-4" variant="outlined">
    <div class="position-relative">
      <strong>권한 설정</strong>
      <v-btn class="save-btn" color="#EB6129" @click="handleSave">
        저장하기
      </v-btn>
    </div>
    <v-divider class="my-4"></v-divider>
    <template v-for="(section, index) in managements" :key="section.title">
      <ManagementComponent
        :title="section.title"
        @viewAuth="(view) => handleViewAuth(index, view)"
        @editAuth="(edit) => handleEditAuth(index, edit)"
        @authRange="(authRange) => handleAuthRange(index, authRange)"
      />
      <v-divider v-if="index < managements.length - 1"></v-divider>
    </template>
  </v-card>
</template>

<style scoped>
.position-relative {
  position: relative; /* 버튼의 위치 기준점 설정 */
  padding-right: 48px; /* 버튼과 아이콘 간 간격 확보 */
}

.save-btn {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%); /* 버튼을 중앙 정렬 */
}
</style>
