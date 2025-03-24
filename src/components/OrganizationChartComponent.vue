<template>
  <v-card>
    <v-sheet class="pa-4" color="#d9d9d9">
      <v-text-field
        v-model="search"
        clear-icon="mdi-close-circle-outline"
        placeholder="구성원 이름"
        prepend-inner-icon="mdi-magnify"
        variant="solo"
        clearable
        flat
        hide-details
      ></v-text-field>
    </v-sheet>

    <v-row dense>
      <v-col class="d-flex align-center" cols="12" sm="6">
        <v-treeview
          v-model:opened="open"
          :custom-filter="filter"
          :items="items"
          :search="search"
          open-on-click
          v-model:selected="tree"
          class="flex-1-0"
          indeterminate-icon="mdi-account-arrow-down-outline"
          true-icon="mdi-account"
          false-icon="mdi-account-outline"
          item-title="name"
          item-value="id"
          select-strategy="classic"
          return-object
          selectable
        >
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
                :key="selection.id"
                :prepend-icon="getIcon()"
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
import { onMounted, ref, shallowRef, watch } from 'vue'
import { getTreeViews } from '@/apis/teamService.js'

const icons = ['mdi-account']

const breweries = ref([])
const tree = ref([])
const types = ref([])
const items = ref([])

watch(breweries, (val) => {
  types.value = val
    .reduce((acc, cur) => {
      const type = cur.brewery_type
      if (!acc.includes(type)) acc.push(type)
      return acc
    }, [])
    .sort()

  const children = types.value.map((type) => ({
    id: type,
    name: getName(type),
    children: getChildren(type),
  }))
  const rootObj = items.value[0]
  rootObj.children = children
  items.value = [rootObj]
})

async function load() {
  if (breweries.value.length) return

  breweries.value = await getTreeViews()
}

function getChildren(type) {
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

function getIcon() {
  return icons[Math.floor(Math.random() * icons.length)]
}

function getName(name) {
  return `${name.charAt(0).toUpperCase()}${name.slice(1)}`
}

function onClickClose(selection) {
  tree.value = tree.value.filter((item) => item.id !== selection.id)
}

const open = shallowRef([1, 2])
const search = shallowRef(null)
const caseSensitive = shallowRef(false)

function filter(value, search, item) {
  return caseSensitive.value
    ? value.indexOf(search) > -1
    : value.toLowerCase().indexOf(search.toLowerCase()) > -1
}

const reset = () => {
  tree.value = []
  search.value = ''
}

const save = () => {
  console.log(tree.value)
}

onMounted(async () => {
  items.value = await getTreeViews()
})
</script>
