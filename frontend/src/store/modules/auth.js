import { jwtDecode } from "jwt-decode"

export default {
    namespaced: true,
    
    state: {
        isAutorized: localStorage.getItem('access_token') ? true : false,
        acceesToken: localStorage.getItem('access_token') || null
    },

    getters: {  
        accessToken: (state) => state.accessToken,
        isAutorized: (state) => state.isAutorized,
        role: () => {
            return jwtDecode(localStorage.getItem('access_token')).role
        }
    },

    mutations: {
        SET_AUTORIZED(state) {
            state.isAutorized = true
        },
        SET_UNAUTORIZED(state) {
            state.isAutorized = false
        },
        SET_ACCESS_TOKEN(state, token) {
            state.accessToken = token;
            localStorage.setItem('access_token', token)
        },
        CLEAR_ACCESS_TOKEN(state) {
            localStorage.clear();
            state.accessToken = null;
        }
    },

    actions: {
    }
}