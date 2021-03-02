import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import VeeValidate from 'vee-validate';
import './../node_modules/bulma/css/bulma.css';


Vue.config.productionTip = false
Vue.use(VeeValidate);

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
