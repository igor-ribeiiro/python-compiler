import Vue from 'vue'
import App from './App.vue'
import router from './router';
import VueModal from "vue-js-modal";

Vue.use(VueModal);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
