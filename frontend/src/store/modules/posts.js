import axios from 'axios';

export default {
  namespaced: true,
  state: {
    posts: [],
  },
  getters: {
    allPosts: (state) => state.posts
  },
  mutations: {
    SET_POSTS(state, posts) {
      state.posts = posts;
    },
  },
  actions: {
    async fetchPosts({ commit }) {
      try {
        const response = await axios.get('http://localhost:8081/api/posts');
        commit('SET_POSTS', response.data);
      } catch (error) {
        console.error('Ошибка при загрузке постов:', error);
      }
    },
    async savePostToServer({ dispatch }, post) {
      try {
        if (post.id) {
          await axios.put(`http://localhost:8081/api/posts/${post.id}`, post);
        } else {
          await axios.post("http://localhost:8081/api/posts", post);
        }
        await dispatch("fetchPosts");
      } catch (error) {
        console.error("Ошибка при сохранении поста:", error);
      }
    },
    async deletePostFromServer({ dispatch }, postId) {
      try {
        await axios.delete(`http://localhost:8081/api/posts/${postId}`);
        await dispatch("fetchPosts");
      } catch (error) {
        console.error("Ошибка при удалении поста:", error);
      }
    },
  },
};