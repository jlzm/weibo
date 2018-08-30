import "normalize.css";
import "./main.css";
import "./rest.css";
import 'font-awesome/css/font-awesome.css';

import Vue from 'vue';
import App from './App.vue';
import VueRouter from "vue-router";


import iView from 'iview';
import 'iview/dist/styles/iview.css';

Vue.config.productionTip = false;

import Home from "./page/Home";
import Found from "./page/Found";
import PersonalPage from "./page/PersonalPage";
import Search from "./page/Search";
import SignIn from "./page/SignIn";
import SignUp from "./page/SignUp";


import AdminBase from './page/admin/Base.vue';
import AdminNoticeTpl from './page/admin/NoticeTpl.vue';
import AdminAnnounceTpl from './page/admin/AnnounceTpl.vue';

import session from './lib/session.js';

Vue.use(VueRouter);
Vue.use(iView);


const routerConfig = {
  routes: [{
      path: '/',
      component: Home,
      meta: {
        title: '首页'
      }
    },
    {
      path: '/found',
      component: Found,
      meta: {
        title: '发现'
      }
    },
    {
      path: '/personalPage',
      component: PersonalPage,
      meta: {
        title: '个人中心'
      }
    },
    {
      path: '/search',
      component: Search,
      meta: {
        title: '搜索'
      }
    },
    {
      path: '/signIn',
      component: SignIn,
      meta: {
        title: '登入'
      }
    },
    {
      path: '/signUp',
      component: SignUp,
      meta: {
        title: '注册'
      }
    },
    {
      path: '/admin',
      component: AdminBase,
      meta: {
        title: '管理员'
      },
      children: [{
          path: '/noticeTpl',
          component: AdminNoticeTpl,
          meta: {
            title: '管理员'
          },
        },
        {
          path: '/announceTpl',
          component: AdminAnnounceTpl,
          meta: {
            title: '管理员'
          },
        },
        
      ]
    },
  ]
};




const router = new VueRouter(
  routerConfig
);


router.beforeEach((to, from, next) => {
  // let goFound = to.fullPath.startsWith('/found');
  // if (goFound && !session.signIned()) {
  //   next('/signIn')
  // } else next();
  next();
  document.title = to.meta.title;
});

new Vue({
  render: h => h(App),
  router
}).$mount('#app')