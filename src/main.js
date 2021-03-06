import Vue from 'vue';
import Vuesax from 'vuesax';
import App from './App.vue';
import router from './router';
import store from './store';

import 'vuesax/dist/vuesax.css';
import 'boxicons';
import 'boxicons/css/boxicons.min.css';

Vue.use(Vuesax);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  beforeCreate() {
    store.commit('initialiseStore');
  },
  render: (h) => h(App),
}).$mount('#app');
