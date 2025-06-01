<template>
  <n-flex vertical class="post-container">
    <n-h2 prefix="bar">Посты</n-h2>

    <n-button class="custom-button" @click="openAddModal">
      Добавить
    </n-button>

    <n-alert v-if="error" type="error" :bordered="false" closable @close="error = null">
      {{ error }}
    </n-alert>

    <div class="post-list" v-if="posts.length > 0">
      <div
        v-for="post in posts"
        :key="post.id"
        class="post-item"
      >
        <n-card class="post-card">
          <div class="card-header">
            <n-typography class="post-title">
              <b>#{{ post.id }}</b> {{ post.heading }}
            </n-typography>
          </div>
          <template #footer>
            <div class="post-actions">
              <n-button class="custom-button" @click="openEditModal(post)">Изменить</n-button>
              <n-button class="custom-button" @click="deletePost(post.id)">Удалить</n-button>
            </div>
          </template>
        </n-card>
      </div>
    </div>
    <n-empty v-else description="Нет постов" />

    <PostModal
      :isVisible="isModalVisible"
      :post="selectedPost"
      @close="closeModal"
      @save="savePost"
    />
  </n-flex>
</template>

<script>
import { NButton, NCard, NH2, NAlert, NEmpty } from 'naive-ui';
import PostModal from "@/components/PostModal.vue";
// импортируем axios instance
import api from '@/utils/axios.js';



export default {
  components: {
    PostModal,
    NButton,
    NCard,
    NH2,
    NAlert,
    NEmpty,
  },
  data() {
    return {
      isModalVisible: false,
      selectedPost: null,
      error: null,
      posts: [],
    };
  },
  methods: {
    openAddModal() {
      this.selectedPost = null;
      this.isModalVisible = true;
    },

    openEditModal(post) {
      this.selectedPost = { ...post };
      this.isModalVisible = true;
    },

    closeModal() {
      this.isModalVisible = false;
      this.selectedPost = null;
    },

    async fetchPosts() {
      try {
        // Убираем /api из пути
        const res = await api.get('/posts');
        this.posts = res.data;
        this.error = null;
      } catch (err) {
        console.error('Ошибка загрузки постов:', err);
        this.error = 'Ошибка загрузки постов.';
      }
    },

    async savePost(postData) {
      try {
        if (postData.id) {
          // обновление
          await api.put(`/posts/${postData.id}`, postData);
        } else {
          // создание
          await api.post('/posts', postData);
        }
        await this.fetchPosts();
        this.error = null;
        this.closeModal();
      } catch (error) {
        console.error("Ошибка сохранения поста:", error);
        this.error = "Не удалось сохранить пост.";
      }
    },

    async deletePost(postId) {
      if (!postId) {
        this.error = "Неверный ID поста.";
        return;
      }
      try {
        await api.delete(`/posts/${postId}`);
        await this.fetchPosts();
        this.error = null;
      } catch (error) {
        console.error("Ошибка удаления поста:", error);
        this.error = "Не удалось удалить пост.";
      }
    },
  },
  mounted() {
    this.fetchPosts();
  },
};
</script>

<style scoped>
.post-container {
  padding: 2em;
}

.custom-button {
  background-color: #f2e8fc;
  color: #000;
  font-size: 14px;
  border: 1px solid #000;
  transition: background-color 0.3s ease;
  padding: 8px 16px;
  width: 100%;
  border-radius: 0;
}

.custom-button:hover {
  background-color: #d9c9f9;
  color: #000;
}

.post-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 20px;
}

.post-item {
  display: flex;
  width: 100%;
}

.post-card {
  width: 100%;
  box-shadow: none !important;
  transition: none !important;
  outline: none !important;
  --n-focus-box-shadow: none !important;
  --n-card-box-shadow-hover: none !important;
  --n-card-border-hover: transparent !important;
  border: none !important;
}

.post-card:hover,
.post-card:focus,
.post-card:focus-visible {
  box-shadow: none !important;
  outline: none !important;
  --n-focus-box-shadow: none !important;
  --n-card-box-shadow-hover: none !important;
  --n-card-border-hover: transparent !important;
  border: none !important;
}

.post-actions {
  display: flex;
  gap: 8px;
  justify-content: flex-start;
  align-items: center;
}

@media (max-width: 480px) {
  .post-actions {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
