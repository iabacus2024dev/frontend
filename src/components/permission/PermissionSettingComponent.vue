<script setup>
import ManagementComponent from "@/components/permission/ManagementComponent.vue";
</script>

<template>
  <v-card border="thin" class="mt-4 pa-4" variant="outlined">
    <div class="position-relative">
      <strong>권한 설정</strong>
      <v-btn class="save-btn" color="#EB6129">
        저장하기
      </v-btn>
    </div>
    <v-divider class="my-4"></v-divider>
    <ManagementComponent
      title="프로젝트 관리"
      :showView="true"
      :showEdit="true"
    />
    <v-divider></v-divider>
    <ManagementComponent
      title="구성원 관리"
      :showView="true"
      :showEdit="true"
    />
    <v-divider></v-divider>
    <ManagementComponent
      title="협력사 관리"
      :showView="true"
      :showEdit="true"
    />
    <v-divider></v-divider>
    <ManagementComponent
      title="매출 관리"
      :showView="true"
      :showEdit="false"
    />
    <v-divider></v-divider>
    <ManagementComponent
      title="권한 관리"
      :showView="true"
      :showEdit="true"
    />
    <v-divider></v-divider>
    <ManagementComponent
      title="휴가 관리"
      :showView="true"
      :showEdit="true"
    />
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
