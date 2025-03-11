<template>
    <section>
      <article>
        <h2>Посты</h2>
        <button @click="openAddModal">Добавить</button>
      </article>
  
      <article v-for="post in posts" :key="post.id">
        <div>
          <p>#{{ post.id }}</p>
          <b>Название: {{ post.heading }}</b>
        </div>
        <div>
          <button @click="openEditModal(post)">Изменить</button>
          <button @click="deletePost(post.id)">Удалить</button>
        </div>
      </article>
  
      <!-- Модальное окно -->
      <PostModal
        :isVisible="isModalVisible"
        :post="selectedPost"
        @close="closeModal"
        @save="savePost"
      />
    </section>
  </template>
  
  <script>
  import PostModal from "@/components/PostModal.vue";
  import { mapActions, mapState } from "vuex";
  
  export default {
    components: {
      PostModal,
    },
    data() {
      return {
        isModalVisible: false,
        selectedPost: null,
      };
    },
    computed: {
      ...mapState("posts", ["posts"]),
    },
    methods: {
      ...mapActions("posts", ["fetchPosts", "savePostToServer", "deletePostFromServer"]),
      openAddModal() {
        this.selectedPost = null; // Для нового поста
        this.isModalVisible = true;
      },
      openEditModal(post) {
        this.selectedPost = { ...post }; // Копируем существующий пост для редактирования
        this.isModalVisible = true;
      },
      closeModal() {
        this.isModalVisible = false;
        this.selectedPost = null;
      },
      async savePost(postData) {
        try {
          await this.savePostToServer(postData); // Сохраняем пост через Vuex
          await this.fetchPosts(); // Обновляем список постов
        } catch (error) {
          console.error("Ошибка сохранения поста:", error);
        }
      },
      async deletePost(postId) {
        try {
          await this.deletePostFromServer(postId); // Удаляем пост через Vuex
          await this.fetchPosts(); // Обновляем список постов
        } catch (error) {
          console.error("Ошибка удаления поста:", error);
        }
      },
    },
    mounted() {
      this.fetchPosts(); // Загружаем посты при открытии страницы
    },
  };
  </script>

<style scoped>
section {
    width: 80%;
    display: flex;
    flex-direction: column;
    margin: 10px;
    
    
    
}
h2 {
    padding-left: 15px;
    
}
article {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid black;
    
}
button {
    background-color: #f2e8fc;  
    color: #333;  
    font-weight: bold;  /* Жирный текст */
    font-size: 14px;  /* Размер шрифта */
    border: 1px solid #000000;  /* Цвет рамки */
    padding : 10px 20px;  /* Отступы */  
    cursor: pointer;  /* Курсор при наведении */
    margin: 10px;
    
}

</style>