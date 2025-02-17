import App from './App.vue'

import { createApp } from 'vue'

import pinia from '@/stores'
import router from '@/router'
import vuetify from '@/plugins/vuetify'
//import { openErrorPopUp } from '@/core/utils/errorPopup'
import RestApiAdapter from '@/adapters/restApiAdapter'
import { registerLayouts } from './layouts/register';


const app = createApp(App)

registerLayouts(app);
app.use(pinia)
app.use(router)
app.use(vuetify)

// app.config.errorHandler = async (err, vm, info) => {
//     openErrorPopUp(err, vm, info)
// }

RestApiAdapter.initialize(app._context)

app.mount('#app')
