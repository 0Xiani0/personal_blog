import axios from "axios";

export default {
    namespaced: true,
    
    state: {
        login: '',
        password: '',
        isLoading: false,
        error: null
    },

    getters: {  
        login: (state) => state.login,
        password: (state) => state.password,
        isLoading: (state) => state.isLoading,
        error: (state) => state.error
    },

    mutations: {
        SET_LOGIN(state, payload) {
            state.login = payload;
        },
        SET_PASSWORD(state, payload) {
            state.password = payload;
        },
        SET_LOADING(state, payload) {
            state.isLoading = payload;
        },
        SET_ERROR(state, payload) {
            state.error = payload;
        },
        CLEAR_ERROR(state) {
            state.error = null;
        },
        CLEAR_ALL_DATA(state) {
            state.login = null;
            state.password = null;
        }
    },

    actions: {
        updateLogin({ commit }, payload) {
            commit('SET_LOGIN', payload);
        },
        updatePassword({ commit }, payload) {
            commit('SET_PASSWORD', payload)
        },
        async signin({ commit, state }, router) {
            const data = {
              login: state.login,
              password: state.password
            };
      
            commit('SET_LOADING', true);
            commit('CLEAR_ERROR');
      
            try {
              const response = await axios.post('http://localhost:8081/api/auth/login', data);
              const accessToken = response.data.token
              commit('auth/SET_ACCESS_TOKEN', accessToken, {root: true})
              commit('auth/SET_AUTORIZED', null, {root: true})
              router.push('/profile');
              commit('CLEAR_ALL_DATA');
            } catch (error) {
              console.error("Ошибка входа:", error);
              commit('SET_ERROR', "Ошибка входа. Проверьте ваши учетные данные.");
              commit('CLEAR_ALL_DATA');
            } finally {
              commit('SET_LOADING', false);
            }
        }      
    }
}