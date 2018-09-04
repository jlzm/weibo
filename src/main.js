import "normalize.css";
import "./main.css";
import "./rest.css";
import 'font-awesome/css/font-awesome.css';

import api from "./lib/api";

import Vue from 'vue';
import App from './App.vue';
import VueRouter from "vue-router";

import Vuex from "vuex"

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
import AdminUser from './page/admin/User.vue';
import AdminTest from './page/admin/AdminTest.vue';

import session from './lib/session.js';

Vue.use(VueRouter);
Vue.use(Vuex);
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
            title: '管理-通知模板'
          },
        },
        {
          path: '/announceTpl',
          component: AdminAnnounceTpl,
          meta: {
            title: '管理-通告模板'
          },
        },
        {
          path: '/user',
          component: AdminUser,
          meta: {
            title: '管理-通告模板'
          },
        },
        {
          path: '/test',
          component: AdminTest,
          meta: {
            title: '管理-通告模板'
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

const store = new Vuex.Store({
  state: {
    allList: {},
    itemList: {},
    form: {
      from_id: session.uinfo() && session.uinfo().id,
      to_id: null,
      text: null
    },
    showChat: false
  },
  mutations: {
    showChat(state) {
      state.showChat = true;
    },
    hideChat(state) {
      state.showChat = false;
    }
  },
  actions: {
    readAllMessage({
        state
      }) {
      api.api('message/read', {
        // limit: 50,
        // sort_by: ['id', 'up'],
        // where: {
        //   from_id: [state.form.from_id, state.form.to_id],
        //   to_id: state.form.to_id
        // }
      }).then(res => {
        Vue.set(state.allList, 'message', res.data);
      })
    },
    readMessage({
      state
    }) {
      api.api('message/read', {
        // limit: 50,
        // sort_by: ['id', 'up'],
        where: {
          from_id: [state.form.from_id, state.form.to_id],
        //   to_id: state.form.to_id
        }
      }).then(res => {
        Vue.set(state.itemList, 'message', res.data.reverse());
      })
    },

    sendMessage({
      state
    }) {
      if (!state.form && !state.form.from_id && !state.form.to_id && !state.form.text) {
        return;
      }
      api.api('message/create', state.form)
        .then(res => {
          Vue.set(state.form, 'text', null);
          store.dispatch('readMessage');
        })
    },
  }
})




new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')