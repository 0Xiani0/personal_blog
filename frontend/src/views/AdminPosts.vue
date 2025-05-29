<template>
  <n-flex vertical class="post-container">
    <n-h2 prefix="bar">Посты</n-h2>

    <n-button class="pink-button" @click="openAddModal">
      Добавить
    </n-button>

    <!-- Ошибка, если она есть -->
    <n-alert v-if="error" type="error" :bordered="false" closable>{{ error }}</n-alert>

    <!-- Список постов -->
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
              <n-button class="pink-button" @click="openEditModal(post)">Изменить</n-button>
              <n-button class="pink-button" @click="deletePost(post.id)">Удалить</n-button>
            </div>
          </template>
        </n-card>
      </div>
    </div>
    <n-empty v-else description="Нет постов" />

    <!-- Модальное окно -->
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
import { mapActions, mapState } from "vuex";

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
    };
  },
  computed: {
    ...mapState("posts", ["posts"]),
  },
  methods: {
    ...mapActions("posts", ["fetchPosts", "savePostToServer", "deletePostFromServer"]),

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

    async savePost(postData) {
      try {
        await this.savePostToServer(postData);
        await this.fetchPosts();
        this.error = null;
      } catch (error) {
        console.error("Ошибка сохранения поста:", error);
        this.error = "Не удалось сохранить пост.";
      }
    },

    async deletePost(postId) {
      try {
        await this.deletePostFromServer(postId);
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

.pink-button {
  background-color: #f2e8fc;
  color: #000;
  font-size: 14px;
  border: 1px solid #000;
  transition: background-color 0.3s ease;
  padding: 8px 16px;
  width: 100%;
  border-radius: 0;
}

.pink-button:hover {
  background-color: #f2e8fc;
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

/* Основной стиль для карточек без теней и обводок */
.post-card {
  width: 100%;
  box-shadow: none !important;
  transition: none !important;
  outline: none !important;
  --n-focus-box-shadow: none !important; /* Убираем тень фокуса Naive UI */
  --n-card-box-shadow-hover: none !important; /* Убираем тень при наведении */
  --n-card-border-hover: transparent !important; /* Убираем границу при наведении */
  border: none !important; /* Убираем стандартную границу */
}

/* Убираем все тени и обводки при наведении */
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





