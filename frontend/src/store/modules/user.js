import { jwtDecode } from "jwt-decode";
import axios from "axios";

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
        SET_USERNAME(state, username) {
            state.username = username;
        },
        SET_EMAIL(state, email) {
            state.email = email;
        },
        SET_ROLE(state, { role_id, role_name }) {
            state.role_id = role_id;
            state.role_name = role_name;
        },
        SET_LOADING(state, payload) {
            state.isLoading = payload;
        },
        SET_ERROR(state, payload) {
            state.error = payload
        },
        SET_USERS(state, payload) {
            state.users = payload
        },
        CLEAR_ALL_DATA(state) {
            state.id = null
            state.username = ''
            state.email = ''
            state.role_id = null
            state.role_name = ''
            state.error = null
        }
    },
    actions: {
        async fetchUser ({ commit, getters }, router) {
            commit('SET_LOADING', true);
            commit('SET_ERROR', null);
      
            try {
              let accessToken = localStorage.getItem('access_token');
              if (!accessToken) {
                console.warn("Access token is not available from the local storage!");
                accessToken = getters['auth/accessToken'];
              } 
              if (!accessToken) {
                commit('SET_ERROR', 'Token not found!');
                router.push('/signin')
                return;
              }
              
              const decodedToken = jwtDecode(accessToken);
              const username = decodedToken.username;
      
              const response = await axios.get(`http://localhost:8081/api/users/${username}`);
              const user = response.data
      
              commit('SET_USER_DATA', user)
                  
            } catch (error) {
              console.error("Ошибка получения данных пользователя:", error);
              commit('CLEAR_ALL_DATA')
              commit('SET_ERROR', 'Не удалось получить данные пользователя.');
            } finally {
              commit('SET_LOADING', false);
            }
        },
        async fetchUsers({ commit }) {
            try {
              const response = await axios.get("http://localhost:8081/api/users");
              commit("SET_USERS", response.data);
            } catch (error) {
              console.error("Ошибка загрузки пользователей:", error);
            }
          },
        async saveUserToServer({ dispatch }, user) {
            try {
              if (user.id) {
                await axios.put(`http://localhost:8081/api/users/${user.id}`, user);
              } else {
                await axios.post("http://localhost:8081/api/users", user);
              }
              await dispatch("fetchUsers");
            } catch (error) {
              console.error("Ошибка сохранения пользователя:", error);
            }
          },
          async deleteUserFromServer({ dispatch }, userId) {
            try {
              await axios.delete(`http://localhost:8081/api/users/${userId}`);
              await dispatch("fetchUsers");
            } catch (error) {
              console.error("Ошибка удаления пользователя:", error);
            }
        },
    }
}