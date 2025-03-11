<template>
    <section class="modal" v-if="isVisible" @click.self="closeModal">
      <div class="modal-content">
        <h2>{{ post?.id ? "Редактировать пост" : "Создать пост" }}</h2>
        <form @submit.prevent="handleSave">
          <label>
            Название:
            <input
              type="text"
              v-model="postData.heading"
              placeholder="Введите название"
              required
            />
          </label>
          
          <label>
            Содержание:
            <textarea
              v-model="postData.description"
              placeholder="Введите содержание"
              required
            ></textarea>
          </label>
  
          <div class="actions">
            <button type="submit" class="submit-btn">{{ isSaving ? "Сохранение..." : "Сохранить" }}</button>
            <button type="button" class="cancel-btn" @click="closeModal">Отмена</button>
          </div>
        </form>
      </div>
    </section>
  </template>
  
  <script>
  import { mapState } from "vuex";
  export default {
    props: {
      isVisible: {
        type: Boolean,
        required: true,
      },
      post: {
        type: Object,
        default: () => ({ heading: "", description: "" }),
      },
    },
    computed: {
    ...mapState("user", ["id"]), // Получаем userId из Vuex
    },
    data() {
      return {
        postData: { ...this.post },
        isSaving: false,
      };
    },
    watch: {
  post: {
    immediate: true, // Выполнять при первой передаче post
    handler(newPost) {
      this.postData = { ...newPost }; // Копируем данные из post в локальное состояние
    },
  },
},
    methods: {
      closeModal() {
        this.$emit("close");
      },
      async handleSave() {
        this.isSaving = true;
        try {
          // Отправляем данные в родительский компонент
          const postData = { ...this.postData, userId: this.id };
          this.$emit("save", postData);
          this.closeModal();
        } catch (error) {
          console.error("Ошибка сохранения поста:", error);
        } finally {
          this.isSaving = false;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 5px;
    width: 400px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  }
  label {
    display: block;
    margin-bottom: 10px;
  }
  textarea,
  input {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
  }
  .actions {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
  }
  .submit-btn {
    background: #4caf50;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
  }
  .cancel-btn {
    background: #f44336;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
  }
  </style>