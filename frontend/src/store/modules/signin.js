import axios from '@/utils/axios.js';

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
      state.login = '';
      state.password = '';
    }
  },

  actions: {
    updateLogin({ commit }, payload) {
      commit('SET_LOGIN', payload);
    },
    updatePassword({ commit }, payload) {
      commit('SET_PASSWORD', payload);
    },

    async signin({ commit, state }, router) {
      const data = {
        login: state.login,
        password: state.password
      };

      commit('SET_LOADING', true);
      commit('CLEAR_ERROR');

      try {
        const response = await axios.post('/auth/login', data);

        const accessToken = response.data.token;
        if (!accessToken) {
          throw new Error('Токен не получен от сервера');
        }

        // Правильные названия мутаций (убрал ошибку SET_AUTORIZED -> SET_AUTHORIZED)
        commit('auth/SET_ACCESS_TOKEN', accessToken, { root: true });
        commit('auth/SET_AUTHORIZED', null, { root: true });

        router.push('/profile');
        commit('CLEAR_ALL_DATA');
      } catch (error) {
        const msg = error.response?.data?.message || 'Ошибка входа. Проверьте ваши учетные данные.';
        console.error('Ошибка входа:', msg);
        commit('SET_ERROR', msg);
        commit('CLEAR_ALL_DATA');
      } finally {
        commit('SET_LOADING', false);
      }
    }      
  }
};
