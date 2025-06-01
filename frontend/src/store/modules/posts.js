import axios from '@/utils/axios.js';

export default {
  namespaced: true,
  state: {
    posts: [],
    isLoading: false,
    error: null,
    searchQuery: '', // Поле для хранения поискового запроса
  },
  getters: {
    allPosts: (state) => state.posts || null,
    isLoading: (state) => state.isLoading,
    error: (state) => state.error,
    // Геттер для фильтрации постов по запросу
    filteredPosts: (state) => {
      if (!state.searchQuery) return state.posts;
      return state.posts.filter(post =>
        post.heading.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
    },
  },
  mutations: {
    SET_POSTS(state, posts) {
      state.posts = posts;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
    LOADING(state) {
      state.isLoading = true;
    },
    LOADED(state) {
      state.isLoading = false;
    },
    UPDATE_POST_LIKE(state, { postId, liked_by_user, like_count }) {
      const post = state.posts.find((p) => p.id === postId);
      if (post) {
        post.liked_by_user = liked_by_user;
        post.like_count = like_count;
      }
    },
    SET_SEARCH_QUERY(state, query) {
      state.searchQuery = query;
    },
  },
  actions: {
    async fetchPosts({ commit }) {
      try {
        commit('LOADING');
        const response = await axios.get('/posts');
        commit('SET_POSTS', response.data);
      } catch (error) {
        const errMessage = `Ошибка при загрузке постов: ${error.response?.data?.message || error.message}`;
        commit('SET_ERROR', errMessage);
        console.error(errMessage);
      } finally {
        commit('LOADED');
      }
    },
    async savePostToServer({ dispatch, commit }, post) {
      try {
        if (post.id) {
          await axios.put(`/posts/${post.id}`, post);
        } else {
          await axios.post('/posts', post);
        }
        await dispatch('fetchPosts');
      } catch (error) {
        const errMessage = `Ошибка при сохранении поста: ${error.response?.data?.message || error.message}`;
        commit('SET_ERROR', errMessage);
        console.error(errMessage);
      }
    },
    async deletePostFromServer({ dispatch, commit }, postId) {
      try {
        await axios.delete(`/posts/${postId}`);
        await dispatch('fetchPosts');
      } catch (error) {
        const errMessage = `Ошибка при удалении поста: ${error.response?.data?.message || error.message}`;
        commit('SET_ERROR', errMessage);
        console.error(errMessage);
      }
    },
    async likePost({ commit }, postId) {
      try {
        const response = await axios.post(`/posts/${postId}/like`);
        commit('UPDATE_POST_LIKE', {
          postId,
          liked_by_user: true,
          like_count: response.data.like_count,
        });
      } catch (error) {
        console.error("Ошибка при лайке поста:", error);
      }
    },
    async unlikePost({ commit }, postId) {
      try {
        const response = await axios.delete(`/posts/${postId}/like`);
        commit('UPDATE_POST_LIKE', {
          postId,
          liked_by_user: false,
          like_count: response.data.like_count,
        });
      } catch (error) {
        console.error("Ошибка при удалении лайка:", error);
      }
    },
    setSearchQuery({ commit }, query) {
      commit('SET_SEARCH_QUERY', query);
    },
  },
};
