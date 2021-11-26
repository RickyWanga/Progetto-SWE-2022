import Vue from 'vue'
import Vuetify from 'vuetify'
import { config } from '@vue/test-utils'
import MockClientOnly from '~/test/_MockClientOnly.vue'

Vue.config.productionTip = false
Vue.use(Vuetify)
config.stubs[ "client-only" ] = MockClientOnly
