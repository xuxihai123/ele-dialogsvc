import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import dialogSvc from '../src/main';

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(dialogSvc);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
