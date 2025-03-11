<template>
    <section class="modal" v-if="isVisible" @click.self="closeModal">
      <div class="modal-content">
        <h2>{{ user?.id ? "Редактировать пользователя" : "Создать пользователя" }}</h2>
        <form @submit.prevent="handleSave">
          <label>
            Имя пользователя:
            <input
              type="text"
              v-model="userData.username"
              placeholder="Введите имя пользователя"
              required
            />
          </label>
  
          <label>
            Email:
            <input
              type="email"
              v-model="userData.email"
              placeholder="Введите email"
              required
            />
          </label>
  
          <label>
            Роль:
            <select v-model="userData.role_id" required>
              <option value="" disabled>Выберите роль</option>
              <option value="2">Администратор</option>
              <option value="3">Модератор</option>
              <option value="1">Пользователь</option>
            </select>
          </label>
  
          <div class="actions">
            <button type="submit" class="submit-btn">
              {{ isSaving ? "Сохранение..." : "Сохранить" }}
            </button>
            <button type="button" class="cancel-btn" @click="closeModal">Отмена</button>
          </div>
        </form>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    props: {
      isVisible: {
        type: Boolean,
        required: true,
      },
      user: {
        type: Object,
        default: () => ({ username: "", email: "", role_id: "" }),
      },
    },
    data() {
      return {
        userData: { ...this.user },
        isSaving: false,
      };
    },
    watch: {
      user: {
        immediate: true,
        handler(newUser) {
          this.userData = { ...newUser };
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
          this.$emit("save", this.userData);
          this.closeModal();
        } catch (error) {
          console.error("Ошибка сохранения пользователя:", error);
        } finally {
          this.isSaving = false;
        }
      },
    },
  };
  </script>