import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    tokenStorage: null
  },
  mutations: {
    updateTokens(state, tokens) {
      state.tokenStorage = tokens
    }
  },
  getters: {
    getTokens: state => state.tokenStorage 
   }
})