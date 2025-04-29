<template>
  <v-app-bar elevation="1">
    <v-container class="mx-auto d-flex align-center justify-center" max-width="1440">
      <v-app-bar-nav-icon v-if="$vuetify.display.smAndDown" @click="drawer = !drawer" />

      <img
        class="me-sm-8 logo-image"
        style="cursor: pointer; height: 30px; object-fit: contain;"
        v-if="!$vuetify.display.smAndDown"
        @click="goTo('/')"
        src="@/assets/ABACUS_CI_1.png"
      />

      <div v-if="$vuetify.display.mdAndUp">
        <v-btn
          v-for="(item, i) in items"
          :key="i"
          :active="i === activeIndex"
          @click="goTo(item.path)"
          class="me-2 text-none"
          slim
          v-bind="i === activeIndex && { color: 'primary' }"
          :text="item.text"
        />
      </div>

      <v-spacer />

      <div class="justify-end d-flex align-center">
        <v-switch
          v-model="isDark"
          @click="toggleTheme"
          hide-details
          class="me-4"
          inset
          color="primary"
        >
          <template v-slot:prepend>
            <v-icon :color="isDark ? 'primary' : 'primary'">{{
              isDark ? 'mdi-weather-night' : 'mdi-white-balance-sunny'
            }}</v-icon>
          </template>
        </v-switch>
        <span v-if="$vuetify.display.mdAndUp">{{ name }}님</span>
        <v-btn class="ms-1" icon>
          <v-avatar icon="mdi-account" size="36" color="primary" />
          <v-menu activator="parent" origin="top">
            <v-list>
              <v-list-item :title="name" :subtitle="email">
                <template v-slot:prepend>
                  <v-avatar size="36" color="primary">
                    <v-icon>mdi-account</v-icon>
                  </v-avatar>
                </template>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item
                link
                title="마이페이지"
                @click="goTo('/profiles')"
                :active="activeIndex === 5"
                :color="activeIndex === 5 ? 'primary' : undefined"
              >
                <template v-slot:prepend>
                  <v-icon :color="activeIndex === 5 ? 'primary' : undefined"
                    >mdi-account-circle</v-icon
                  >
                </template>
              </v-list-item>
              <v-list-item link title="로그아웃" @click="logout">
                <template v-slot:prepend>
                  <v-icon>mdi-logout</v-icon>
                </template>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-btn>
      </div>
    </v-container>
  </v-app-bar>

  <v-navigation-drawer
    v-if="$vuetify.display.smAndDown"
    v-model="drawer"
    location="left"
    temporary
    width="280"
  >
    <v-list-item class="pa-4">
      <img
        class="logo-image"
        style="height: 30px; object-fit: contain;"
        @click="goTo('/')"
        src="@/assets/ABACUS_CI_1.png"
      />
    </v-list-item>
    <v-divider></v-divider>
    <v-list>
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        :title="item.text"
        :active="i === activeIndex"
        :color="i === activeIndex ? 'primary' : undefined"
        @click="goTo(item.path)"
        class="mb-1"
        link
      >
        <template v-slot:prepend>
          <v-icon :color="i === activeIndex ? 'primary' : undefined">{{
            getIconForRoute(item.text)
          }}</v-icon>
        </template>
      </v-list-item>
      <v-divider class="my-2"></v-divider>
      <v-list-item title="마이페이지" @click="goTo('/profiles')" :active="activeIndex === 5" link>
        <template v-slot:prepend>
          <v-icon>mdi-account-circle</v-icon>
        </template>
      </v-list-item>
      <v-list-item title="로그아웃" @click="confirmLogout" link>
        <template v-slot:prepend>
          <v-icon>mdi-logout</v-icon>
        </template>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { computed, onMounted, ref, shallowRef } from 'vue'
import { useRouter } from 'vue-router'
import { fetchLogout } from '@/apis/authService.js'
import { useTheme } from 'vuetify'

const router = useRouter()

const drawer = shallowRef(false)
const name = ref(JSON.parse(localStorage.getItem('member'))?.name)
const email = ref(JSON.parse(localStorage.getItem('member'))?.username)
const items = router
  .getRoutes()
  .filter((route) => route.meta.menu === true)
  .map((route) => ({ text: route.meta.title, path: route.path }))

const goTo = (path) => router.push(path)
const getIconForRoute = (routeName) => {
  const icons = {
    대시보드: 'mdi-view-dashboard',
    프로젝트: 'mdi-briefcase',
    구성원: 'mdi-account-group',
    협력사: 'mdi-handshake',
    매출: 'mdi-chart-line',
    권한: 'mdi-shield-account',
  }
  return icons[routeName] || 'mdi-circle-small'
}
const logout = async () => {
  await fetchLogout()
  await router.push('/')
}
const activeIndex = computed(() => router.currentRoute.value.meta.activeIndex)

const theme = useTheme()
const isDark = ref(localStorage.getItem('theme') === 'dark')

const toggleTheme = () => {
  isDark.value = !isDark.value
  theme.global.name.value = isDark.value ? 'dark' : 'light'
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

onMounted(() => {
  theme.global.name.value = isDark.value ? 'dark' : 'light'
})
</script>

<style scoped>
.logo-image {
  padding: 4px;
}
</style>
