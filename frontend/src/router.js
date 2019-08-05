import Vue from 'vue';
import Router from 'vue-router';

import authService from '@/services/authService';
import MainPage from '@/views/MainPage';
import NProgress from 'nprogress';

// const ProjectMonitorPage = () => import(/* webpackPrefetch: true, webpackChunkName: "pages" */ '@/views/ProjectMonitorPage');
const LoginPage = () => import(/* webpackPrefetch: true, webpackChunkName: "pages" */ '@/views/LoginPage');
const BraceletPage = () => import(/* webpackPrefetch: true, webpackChunkName: "pages" */ '@/views/BraceletPage');
const PageTemplate = () => import(/* webpackPrefetch: true, webpackChunkName: "pages" */ '@/views/PageTemplate');
const ServerPage = () => import(/* webpackPrefetch: true, webpackChunkName: "pages" */ '@/views/ServerPage');
const SettingsPage = () => import(/* webpackPrefetch: true, webpackChunkName: "pages" */ '@/views/SettingsPage');
const TestPage = () => import(/* webpackPrefetch: true, webpackChunkName: "pages" */ '@/views/TestPage');
const WifiPage = () => import(/* webpackPrefetch: true, webpackChunkName: "pages" */ '@/views/WifiPage');

Vue.use(Router);

const router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'main-page',
      component: MainPage,
      meta: {
        requiresAuth: true
      }      
    },
    {
      path: '',
      component: PageTemplate,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: 'bracelet',
          name: 'bracelet-page',
          component: BraceletPage
        },
        {
          path: 'server',
          name: 'server-page',
          component: ServerPage
        },
        {
          path: 'settings',
          name: 'settings-page',
          component: SettingsPage
        },
        {
          path: 'test',
          name: 'test-page',
          component: TestPage
        },
        {
          path: 'wifi',
          name: 'wifi-page',
          component: WifiPage
        }
      ]
    },
    {
      path: '/login',
      name: 'login-page',
      component: LoginPage    
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!authService.isLoggedIn()) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      });
    } else {
      NProgress.start();
      next();
    }
  } else {
    NProgress.start();
    next(); // 确保一定要调用 next()
  }
});
router.afterEach(() => {
  NProgress.done();
});

export default router;
