import {defineStore} from "pinia";
import {ref} from "vue";

export const useRoleStore = defineStore("role", () => {
  const selectedMembers = ref([]);

  const setSelectedMembers = (members) => {
    selectedMembers.value = members;
  };

  return { selectedMembers, setSelectedMembers }
})
