import api from '@/utils/axios.js';

export default {
  namespaced: true,

  state: {
    login: '',
    email: '',
    password: '',
    passwordRepeat: '',
    isLoading: false,
    error: null
  },

  getters: {
    login: (state) => state.login,
    email: (state) => state.email,
    password: (state) => state.password,
    passwordRepeat: (state) => state.passwordRepeat,
    isLoading: (state) => state.isLoading,
    error: (state) => state.error
  },

  mutations: {
    SET_LOGIN(state, payload) {
      state.login = payload;
    },
    SET_EMAIL(state, payload) {
      state.email = payload;
    },
    SET_PASSWORD(state, payload) {
      state.password = payload;
    },
    SET_PASSWORD_REPEAT(state, payload) {
      state.passwordRepeat = payload;
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
      state.email = '';
      state.password = '';
      state.passwordRepeat = '';
    }
  },

  actions: {
    updateLogin({ commit }, payload) {
      commit('SET_LOGIN', payload);
    },
    updateEmail({ commit }, payload) {
      commit('SET_EMAIL', payload);
    },
    updatePassword({ commit }, payload) {
      commit('SET_PASSWORD', payload);
    },
    updatePasswordRepeat({ commit }, payload) {
      commit('SET_PASSWORD_REPEAT', payload);
    },
    async register({ commit, state, dispatch }, router) {
      const data = {
        login: state.login,
        email: state.email,
        password: state.password
      };

      commit('SET_LOADING', true);
      commit('CLEAR_ERROR');

      try {
        const response = await api.post('/auth/registration', data);
        if (response.status !== 200) {
          commit('SET_ERROR', "Register Error! Status " + response.status);
          console.error("Register Error! Status " + response.status);
          return;
        }
        commit('signin/SET_LOGIN', data.login, { root: true });
        commit('signin/SET_PASSWORD', data.password, { root: true });
        await dispatch('signin/signin', router, { root: true });
        commit('CLEAR_ALL_DATA');
      } catch (error) {
        console.error("Ошибка регистрации:", error);
        commit('SET_ERROR', "Ошибка регистрации. Проверьте ваши учетные данные.");
        commit('CLEAR_ALL_DATA');
      } finally {
        commit('SET_LOADING', false);
      }
    }
  }
};
