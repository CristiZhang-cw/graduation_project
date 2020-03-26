import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        token: '',
        userId: ''
    },
    mutations: {
        addAccount(state, payload) {
            sessionStorage.setItem('token',payload.token)
            state.token = payload.token
        },
        removeAccount(state,payload) {
            sessionStorage.removeItem('token',payload.token)
            state.token = payload.token
        }
    },
    actions: {

    }
})

export default store