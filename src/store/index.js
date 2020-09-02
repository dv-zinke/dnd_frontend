import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const state = {
    user: undefined
};

const store = new Vuex.Store({
    strict: false, //엄격모드
    state,
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
    }
});

export default store
