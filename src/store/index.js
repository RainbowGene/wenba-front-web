import { createStore } from "vuex";

export default createStore({
    state: {
        loginUserInfo: null, // 用户信息
        showLogin: false, // 是否弹出登录框
    },
    getters: {
        getLoginUserInfo: (state) => {
            return state.loginUserInfo;
        }
    },
    mutations: {
        updateLoginUserInfo: (state, value) => {
            state.loginUserInfo = value;
        },
        showLogin: (state, value) => {
            state.showLogin = value
        }
    },
    actions: {

    },
    modules: {}
})