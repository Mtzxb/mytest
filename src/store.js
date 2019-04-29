import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: window.localStorage.getItem("Token"),
        tokenExpire: window.localStorage.getItem("TokenExpire"),
        tagsStoreList: [],

    },
    mutations: {
        saveToken(state, data) {
            state.token = data;
            window.localStorage.setItem("Token", data)
        },
        saveTokenExpire(state, data) {
            state.tokenExpire = data;
            window.localStorage.setItem("TokenExpire", data)
        },
        saveTagsData(state, data) {
            state.tagsStoreList = data;
            sessionStorage.setItem("Tags", data)
        }
    },
    actions: {

    }
})
