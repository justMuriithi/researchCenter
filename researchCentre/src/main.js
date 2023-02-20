import { createApp } from 'vue'
import App from './App.vue'
// import Vue from 'vue';
// import Argon from '@/plugins/argon-kit'
// Vue.use(Argon);



// import './assets/main.css'

// createApp(App).mount('#app')
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})

createApp(App).use(vuetify).mount('#app')
