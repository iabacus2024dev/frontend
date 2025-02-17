import App from './App.vue'

import { createApp } from 'vue'

import pinia from '@/stores'
import router from '@/router'
import vuetify from '@/plugins/vuetify'
import { registerLayouts } from './layouts/register';


const app = createApp(App)

registerLayouts(app);
app.use(pinia)
app.use(router)
app.use(vuetify)

app.mount('#app')
