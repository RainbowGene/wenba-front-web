import { createStore } from "vuex";

export default createStore({
    state: {
        loginUserInfo: null, // 用户信息
        showLogin: false, // 是否弹出登录框
        boardList: [], // 板块信息
        activePboardId: 0, // 当前一级板块
        activeBoardId: 0, // 当前二级板块
    },
    getters: {
        getLoginUserInfo: (state) => {
            return state.loginUserInfo;
        },
        getBoardList: (state) => {
            return state.boardList
        },
        getSubBoardList: (state) => (boardId) => {
            let board = state.boardList.find(item => {
                return item.boardId == boardId;
            })
            return board ? board.children : [];
        },
        getActivePBoardId: (state) => {
            return state.activePboardId;
        },
        getActiveBoardId: (state) => {
            return state.activeBoardId;
        }
    },
    mutations: {
        updateLoginUserInfo: (state, value) => {
            state.loginUserInfo = value;
        },
        showLogin: (state, value) => {
            state.showLogin = value
        },
        saveBoardList(state, value) {
            state.boardList = value;
        },
        setActivePBoardId(state, value) {
            state.activePboardId = value;
        },
        setActiveBoardId(state, value) {
            state.activeBoardId = value;
        },
    },
    actions: {

    },
    modules: {}
})