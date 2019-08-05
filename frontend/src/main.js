// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import axios from 'axios';
import Vue from 'vue';
import ElementUI from 'element-ui';

import '@babel/polyfill';
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
import authService from '@/services/authService';
import App from './App';
import router from './router';
import './main.scss';

Vue.use(ElementUI);

Vue.config.productionTip = false;
Vue.component(CollapseTransition.name, CollapseTransition);
Vue.prototype.$message = ElementUI.Message;
// use interceptor to add auth token to every request exception login
axios.interceptors.request.use(config => {
  if (config.url.indexOf('/api/login') === -1) {
    const authToken = authService.getAuthToken();
    if (authToken) {
      config.headers.Authorization = authToken;
    }
  }
  return config;
});

axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response.status === 401) {
      const currentUrl = router.currentRoute.fullPath;
      if (currentUrl.indexOf('/login') === -1) {
        router.push({
          path: '/login',
          query: {
            redirect: currentUrl
          }
        });
      }
    }
    return Promise.reject(error);
  }
);

window.eventBus = new Vue();

/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   components: { App },
//   template: '<App/>'
// });

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
