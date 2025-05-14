import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        userRole: null,
    },
    mutations: {
        setUserRole(state, role) {
            state.userRole = role;
        },
    },
});