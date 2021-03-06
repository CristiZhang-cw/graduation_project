import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        token: '',
        ID: '',
        fileID: '',
        userId: ''
    },
    mutations: {
        addAccount(state, payload) {
            sessionStorage.setItem('token',payload.token)
            state.token = payload.token   //登录时存入token
            state.ID = payload.ID           //登录时存入id（数据库主键）
            state.userId = payload.userId  //登陆时存入用户账号
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