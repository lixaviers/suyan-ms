import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import router from './router';
import 'element-ui/lib/theme-chalk/index.css';
import './styles/common.less';

Vue.config.productionTip = false;
Vue.use(VueRouter);


new Vue({
  el: '#app',
  router: router,
  render: h => h(App),
}).$mount('#app')
