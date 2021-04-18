import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router';
import VeeValidate from 'vee-validate';
import './../node_modules/bulma/css/bulma.css';

import { BootstrapVue } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import './../node_modules/bootstrap-vue/dist/bootstrap-vue.css'



Vue.config.productionTip = false
Vue.use(VeeValidate);
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)


new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
