import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        token: '',
        ID: '',
        fileID: ''
    },
    mutations: {
        addAccount(state, payload) {
            sessionStorage.setItem('token',payload.token)
            state.token = payload.token
            state.ID = payload.ID
        },
        removeAccount(state,payload) {
            sessionStorage.removeItem('token')
            state.token = payload.token
        },
        addFileID(state,payload){
            state.fileID = payload.fileID
        }
    },
    actions: {}
})

export default store