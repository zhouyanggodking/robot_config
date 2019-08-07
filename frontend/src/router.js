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

const AudioPage = () => import(/* webpackPrefetch: true, webpackChunkName: "pages" */ '@/views/testpages/AudioPage');
const CameraPage = () => import(/* webpackPrefetch: true, webpackChunkName: "pages" */ '@/views/testpages/CameraPage');
const KeypadPage = () => import(/* webpackPrefetch: true, webpackChunkName: "pages" */ '@/views/testpages/KeypadPage');
const MonitorPage = () => import(/* webpackPrefetch: true, webpackChunkName: "pages" */ '@/views/testpages/MonitorPage');
const RadioPage = () => import(/* webpackPrefetch: true, webpackChunkName: "pages" */ '@/views/testpages/RadioPage');

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
          path: 'wifi',
          name: 'wifi-page',
          component: WifiPage
        },
        {
          path: 'test',
          name: 'test-page',
          component: TestPage
        },
        {
          path: 'test/audio',
          name: 'audio-page',
          component: AudioPage
        },
        {
          path: 'test/camera',
          name: 'camera-page',
          component: CameraPage
        },
        {
          path: 'test/keypad',
          name: 'keypad-page',
          component: KeypadPage
        },
        {
          path: 'test/monitor',
          name: 'monitor-page',
          component: MonitorPage
        },
        {
          path: 'test/radio',
          name: 'radio-page',
          component: RadioPage
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
