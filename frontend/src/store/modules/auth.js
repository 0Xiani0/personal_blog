import { jwtDecode } from 'jwt-decode';


export default {
  namespaced: true,

  state: {
    isAuthorized: !!localStorage.getItem("access_token"),
    accessToken: localStorage.getItem("access_token") || null,
  },

  getters: {
    accessToken: (state) => state.accessToken,
    isAuthorized: (state) => state.isAuthorized,

    role: () => {
      const token = localStorage.getItem("access_token");
      if (!token) return null;
      try {
        return jwtDecode(token).role;
      } catch {
        return null;
      }
    },

    roleId: () => {
      const token = localStorage.getItem("access_token");
      if (!token) return null;
      try {
        return jwtDecode(token).role_id;
      } catch {
        return null;
      }
    },

    userId: () => {
      const token = localStorage.getItem("access_token");
      if (!token) return null;
      try {
        return jwtDecode(token).id;
      } catch {
        return null;
      }
    },

    user: () => {
      const token = localStorage.getItem("access_token");
      if (!token) return null;
      try {
        const decoded = jwtDecode(token);
        return {
          id: decoded.id,
          username: decoded.username,
          isAdmin: decoded.role_id === 2 || decoded.role === 'Admin'
        };
      } catch {
        return null;
      }
    }
  },

  mutations: {
    SET_AUTHORIZED(state) {
      state.isAuthorized = true;
    },
    SET_UNAUTHORIZED(state) {
      state.isAuthorized = false;
    },
    SET_ACCESS_TOKEN(state, token) {
      state.accessToken = token;
      localStorage.setItem("access_token", token);
      state.isAuthorized = true;
    },
    CLEAR_ACCESS_TOKEN(state) {
      localStorage.removeItem("access_token");
      state.accessToken = null;
      state.isAuthorized = false;
    }
  },

  actions: {}
};
