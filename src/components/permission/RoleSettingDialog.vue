<script setup>
import {onMounted, ref, shallowRef, watch} from 'vue'
import {getTreeViewsWithMember} from "@/apis/teamService.js";

const icons = [
  'mdi-beer',
  'mdi-glass-mug',
  'mdi-liquor',
  'mdi-glass-mug-variant',
]
const breweries = ref([])
const tree = ref([])
const types = ref([])
const items = ref([]);

const fetchTreeData = async () => {
  try {
    const response = await getTreeViewsWithMember();
    items.value = response.map((node) => transForNode(node));
  } catch (err) {
    console.error("fetchTreeData error", err);
  }
}

const transForNode = (node) => ({
  departmentId: node.departmentId,
  employeeId: node.employeeId,
  title: node.name,
  children: node.children ? node.children.map(transForNode) : null
});

onMounted(fetchTreeData);

watch(breweries, val => {
  types.value = val.reduce((acc, cur) => {
    const type = cur.brewery_type
    if (!acc.includes(type)) acc.push(type)
    return acc
  }, []).sort()

  const children = types.value.map(type => ({
    employeeId: type,
    name: getName(type),
    children: getChildren(type),
  }))
  const rootObj = items.value[0]
  rootObj.children = children
  items.value = [rootObj]
}, {deep: true})

function getChildren (type) {
  const _breweries = []
  for (const brewery of breweries.value) {
    if (brewery.brewery_type !== type) continue
    _breweries.push({
      ...brewery,
      name: getName(brewery.name),
    })
  }
  return _breweries.sort((a, b) => {
    return a.name > b.name ? 1 : -1
  })
}

function getIcon () {
  return icons[Math.floor(Math.random() * icons.length)]
}

function getName (name) {
  return `${name.charAt(0).toUpperCase()}${name.slice(1)}`
}

function onClickClose (selection) {
  tree.value = tree.value.filter(item => item.employeeId !== selection.employeeId)
}

const search = shallowRef(null)
const caseSensitive = shallowRef(false)

function filter (value, search, item) {
  return caseSensitive.value ? value.indexOf(search) > -1 : value.toLowerCase().indexOf(search.toLowerCase()) > -1
}

const getSelectedMembers = () => {
  return [...tree.value]
};

defineExpose({
  getSelectedMembers,
})
</script>

<template>
  <v-container class="mx-auto" min-width="800px">
    <v-card width="100%">
      <v-row dense>
        <v-col cols="12" sm="6" width="100%">
          <v-card class="mx-auto" width="100%">
            <v-sheet class="pa-4" color="surface-variant">
              <v-text-field
                v-model="search"
                clear-icon="mdi-close-circle-outline"
                label="구성원 검색"
                variant="solo"
                clearable
                flat
                hide-details
              ></v-text-field>

              <v-checkbox-btn
                v-model="caseSensitive"
                label="대소문자 무시"
              ></v-checkbox-btn>
            </v-sheet>
            <v-treeview
              v-model:selected="tree"
              :items="items"
              :custom-filter="filter"
              :search="search"
              item-value="id"
              class="flex-1-0"
              false-icon="mdi-account-outline"
              indeterminate-icon="mdi-account-outline"
              select-strategy="classic"
              true-icon="mdi-account"
              return-object
              selectable
            >
            </v-treeview>
          </v-card>
        </v-col>

        <v-divider :vertical="true" class="my-md-3"></v-divider>

        <v-col cols="12" sm="6" width="100%">
          <v-card-text width="100%">
            <div
              v-if="tree.length === 0"
              class="text-h6 font-weight-light text-grey pa-4"
            >
            </div>

            <div class="d-flex flex-wrap ga-1">
              <v-scroll-x-transition group hide-on-leave>
                <v-chip
                  v-for="selection in tree"
                  :key="selection.employeeId"
                  :prepend-icon="getIcon()"
                  :text="selection.title"
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
    </v-card>
  </v-container>
</template>

<style scoped>

</style>
