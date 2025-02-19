import { createVuetify } from 'vuetify'
import { VTreeview } from 'vuetify/labs/VTreeview'

import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

export default createVuetify({
  theme: {
    defaultTheme: 'light',
  },
  components: {
    VTreeview,
  }
});
