<template>
  <v-app-bar elevation="1">
    <v-container class="mx-auto d-flex align-center justify-center" max-width="1440">
      <v-app-bar-nav-icon v-if="$vuetify.display.smAndDown" @click="drawer = !drawer" />

      <v-img
        class="me-sm-8"
        max-width="120"
        style="cursor: pointer"
        v-if="!$vuetify.display.smAndDown"
        @click="goTo('/')"
        src="https://ezportal.bizmeka.com/companyImage/T31366/T31366_100_69bd36e2ee32422087c5d4203224b81a.png"
      />

      <div v-if="$vuetify.display.mdAndUp">
        <v-btn
          v-for="(item, i) in items"
          :key="i"
          :active="i === activeIndex"
          @click="goTo(item.path)"
          class="me-2 text-none"
          slim
          v-bind="i === activeIndex && { color: '#EB6129' }"
          :text="item.text"
        />
      </div>

      <v-spacer />

      <div class="justify-end">
        <span>{{ name }}님</span>
        <v-btn class="ms-1" icon>
          <v-avatar icon="mdi-account-circle" />
          <v-menu activator="parent" origin="top">
            <v-list>
              <v-list-item
                link
                title="마이페이지"
                @click="goTo('/profiles')"
                :active="activeIndex === 5"
              />
              <v-list-item link title="로그아웃" @click="logout" />
            </v-list>
          </v-menu>
        </v-btn>
      </div>
    </v-container>
  </v-app-bar>

  <v-navigation-drawer
    v-if="$vuetify.display.smAndDown"
    v-model="drawer"
    location="top"
    temporary
    width="355"
  >
    <v-list class="py-0" slim v-for="(item, i) in items" :key="i">
      <v-list-item
        link
        :title="item.text"
        :active="i === activeIndex"
        @click="goTo(item.path)"
        class="me-2 text-none"
        slim
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { computed, ref, shallowRef } from 'vue'
import { useRouter } from 'vue-router'
import { useMemberStore } from '@/stores/member.js'
import { fetchLogout } from '@/apis/authService.js'

const router = useRouter()

const drawer = shallowRef(false)
const name = ref(JSON.parse(localStorage.getItem('member'))?.name)
const items = router
  .getRoutes()
  .filter((route) => route.meta.menu === true)
  .map((route) => {
    return {
      text: route.meta.title,
      path: route.path,
    }
  })

const goTo = (path) => {
  router.push(path)
}

const logout = () => {
  useMemberStore().logout()
  fetchLogout()
}

const activeIndex = computed(() => {
  return router.currentRoute.value.meta.activeIndex
})
</script>
