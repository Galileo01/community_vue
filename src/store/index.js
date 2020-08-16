import Vue from 'vue'
import Vuex from 'vuex'

const avatarDefault = require('../assets/img/avatar-default.png');
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {
    },
    avatarPath: 'http://localhost:8080/public/img/avatar/',
    keyword: '',
  },
  mutations: {
    saveUserInfo(state, payload) {
      state.userInfo = {};
      localStorage.setItem('email', '');
      localStorage.setItem('avatar', '');
      state.userInfo = payload;
      localStorage.setItem('email', payload.email);
      if (payload.email)
        localStorage.setItem('avatar', payload.avatar);
    },
    clearInfo(state) {
      state.userInfo = {};
      localStorage.clear();
    },
    saveKeyword(state, word) {
      state.keyword = word;
    },
    keyword(state) {
      state.keyword = '';
    },

  },
  actions: {
  },
  getters: {
    //获取 用户信息
    uerInfo(state) {
      return state.userInfo;
    },
    email(state) {
      return state.userInfo.email || localStorage.getItem('email');
    },
    //返回完整的 头像url
    avatarUrl(state) {
      const filename = state.userInfo.avatar || localStorage.getItem('avatar');
      if (!filename) //vuex和 local都没有存储，
        return avatarDefault;
      else return state.avatarPath + filename;
    }
  },
  modules: {
  }
})
