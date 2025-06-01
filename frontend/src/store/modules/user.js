import { jwtDecode } from 'jwt-decode';
import axios from '@/utils/axios.js';

export default {
  namespaced: true,
  state: {
    id: null,
    username: '',
    email: '',
    role_id: null,
    role_name: '',
    isLoading: false,
    error: null,
    users: []
  },
  getters: {
    id: (state) => state.id,
    username: (state) => state.username,
    email: (state) => state.email,
    role_id: (state) => state.role_id,
    role_name: (state) => state.role_name,
    isLoading: (state) => state.isLoading,
    error: (state) => state.error,
    users: (state) => state.users
  },
  mutations: {
    SET_USER_DATA(state, payload) {
      state.id = payload.id;
      state.username = payload.username;
      state.email = payload.email;
      state.role_id = payload.role_id;
      state.role_name = payload.role_name;
    },
    SET_LOADING(state, payload) {
      state.isLoading = payload;
    },
    SET_ERROR(state, payload) {
      state.error = payload;
    },
    SET_USERS(state, users) {
      state.users = users;
    },
    CLEAR_ALL_DATA(state) {
      state.id = null;
      state.username = '';
      state.email = '';
      state.role_id = null;
      state.role_name = '';
      state.error = null;
    }
  },
  actions: {
    async fetchUser({ commit }, router) {
      commit('SET_LOADING', true);
      commit('SET_ERROR', null);

      try {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
          commit('SET_ERROR', 'Token not found!');
          router.push('/signin');
          return;
        }

        const decodedToken = jwtDecode(accessToken);
        const username = decodedToken.username;

        const response = await axios.get(`/users/${username}`);
        commit('SET_USER_DATA', response.data);
      } catch (error) {
        console.error("Ошибка получения данных пользователя:", error);
        commit('CLEAR_ALL_DATA');
        commit('SET_ERROR', 'Не удалось получить данные пользователя.');
      } finally {
        commit('SET_LOADING', false);
      }
    },

    async fetchUsers({ commit }) {
      try {
        const response = await axios.get("/users");
        commit("SET_USERS", response.data);
      } catch (error) {
        console.error("Ошибка загрузки пользователей:", error);
        commit("SET_ERROR", "Ошибка загрузки пользователей");
      }
    },

    async saveUserToServer({ dispatch }, user) {
      try {
        if (user.id) {
          await axios.put(`/users/${user.id}`, user);
        } else {
          await axios.post("/users", user);
        }
        await dispatch("fetchUsers");
      } catch (error) {
        console.error("Ошибка сохранения пользователя:", error);
      }
    },

    async deleteUserFromServer({ dispatch }, userId) {
      try {
        await axios.delete(`/users/${userId}`);
        await dispatch("fetchUsers");
      } catch (error) {
        console.error("Ошибка удаления пользователя:", error);
      }
    },
  }
};