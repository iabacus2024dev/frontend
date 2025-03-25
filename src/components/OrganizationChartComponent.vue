<template>
  <v-card border="thin" variant="outlined" rounded="lg">
    <v-sheet class="pa-4">
      <v-text-field
        v-model="search"
        clear-icon="mdi-close-circle-outline"
        placeholder="구성원 이름"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        clearable
        flat
        hide-details
      ></v-text-field>
    </v-sheet>

    <v-row dense>
      <v-col class="d-flex align-center" cols="12" sm="6">
        <v-treeview
          v-model:opened="open"
          v-model:selected="tree"
          :custom-filter="searchFilter"
          :items="items"
          :search="search"
          open-on-click
          density="compact"
          class="flex-1-0"
          indeterminate-icon="mdi-account-arrow-down-outline"
          true-icon="mdi-account"
          false-icon="mdi-account-outline"
          item-title="name"
          item-value="employeeId"
          select-strategy="leaf"
          return-object
          selectable
        >
          <template v-slot:prepend="{ item, isOpen }">
            <v-icon v-if="item.children" :icon="isOpen ? 'mdi-folder-open' : 'mdi-folder'"></v-icon>
          </template>
        </v-treeview>
      </v-col>

      <v-divider :vertical="$vuetify.display.mdAndUp" class="my-md-3"></v-divider>

      <v-col cols="12" sm="6">
        <v-card-text>
          <div
            v-if="tree.length === 0"
            class="text-h6 font-weight-light text-grey pa-4 text-center"
          ></div>

          <div class="d-flex flex-wrap ga-1">
            <v-scroll-x-transition group hide-on-leave>
              <v-chip
                v-for="selection in tree"
                :key="selection.employeeId"
                :text="selection.name"
                color="grey"
                size="small"
                border
                closable
                label
                @click:close="onClickClose(selection)"
              ></v-chip>
            </v-scroll-x-transition>
          </div>
        </v-card-text>
      </v-col>
    </v-row>

    <v-divider></v-divider>

    <template v-slot:actions>
      <v-btn text="Reset" @click="reset"></v-btn>

      <v-spacer></v-spacer>

      <v-btn
        append-icon="mdi-content-save"
        color="surface-light"
        text="Save"
        variant="flat"
        @click="save"
        border
      ></v-btn>
    </template>
  </v-card>
</template>

<script setup>
import { defineEmits, ref, shallowRef } from 'vue'
import { getTreeViews } from '@/apis/teamService.js'

const emits = defineEmits(['save'])

const tree = ref([])
const items = ref([])

function onClickClose(selection) {
  tree.value = tree.value.filter((item) => item.employeeId !== selection.employeeId)
}

const open = shallowRef([1, 2])
const search = shallowRef(null)
const caseSensitive = shallowRef(false)

function searchFilter(value, search, item) {
  return caseSensitive.value
    ? value.indexOf(search) > -1
    : value.toLowerCase().indexOf(search.toLowerCase()) > -1
}

const reset = () => {
  tree.value = []
  search.value = ''
}

const save = () => {
  emits('save')
}

const fetchTreeViews = async () => {
  items.value = await getTreeViews()
}
fetchTreeViews()
</script>
