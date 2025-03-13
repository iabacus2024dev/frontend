import App from './App.vue'

import { createApp } from 'vue'

import pinia from '@/stores'
import router from '@/router'
import vuetify from '@/plugins/vuetify'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

//import { openErrorPopUp } from '@/core/utils/errorPopup'
import RestApiAdapter from '@/adapters/restApiAdapter'
import { registerLayouts } from './layouts/register'
import VueCookies from 'vue-cookies'

const app = createApp(App)

registerLayouts(app)

app.use(pinia)
app.use(router)
app.use(vuetify)
app.use(VueCookies)
app.use(Toast, {
  position: 'top-center',
  timeout: 3000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: true,
  hideProgressBar: false,
  closeButton: 'button',
  icon: true,
  rtl: false,
})

// app.config.errorHandler = async (err, vm, info) => {
//     openErrorPopUp(err, vm, info)
// }

RestApiAdapter.initialize(app._context)

app.mount('#app')
