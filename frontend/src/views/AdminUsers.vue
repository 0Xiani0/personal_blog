<template>
    <section>
      <article>
        <h2>Пользователи</h2>
        <button @click="openAddModal">Добавить пользователя</button>
      </article>
  
      <article v-for="user in users" :key="user.id">
        <div>
          <p>#{{ user.id }}</p>
          <b>Имя пользователя: {{ user.username }}</b>
          <p>Email: {{ user.email }}</p>
          <p>Роль: {{ user.role_name }}</p>
        </div>
        <div>
          <button @click="openEditModal(user)">Изменить</button>
          <button @click="deleteUser(user.id)">Удалить</button>
        </div>
      </article>
  
      <!-- Модальное окно -->
      <UserModal
        :isVisible="isModalVisible"
        :user="selectedUser"
        @close="closeModal"
        @save="saveUser"
      />
    </section>
  </template>
  
  <script>
  import UserModal from "@/components/UserModal.vue";
  import { mapActions, mapState } from "vuex";
  
  export default {
    components: {
      UserModal,
    },
    data() {
      return {
        isModalVisible: false,
        selectedUser: null,
      };
    },
    computed: {
      ...mapState("user", ["users"]),
    },
    methods: {
      ...mapActions("user", ["fetchUsers", "saveUserToServer", "deleteUserFromServer"]),
      openAddModal() {
        this.selectedUser = null;
        this.isModalVisible = true;
      },
      openEditModal(user) {
        this.selectedUser = { ...user };
        this.isModalVisible = true;
      },
      closeModal() {
        this.isModalVisible = false;
        this.selectedUser = null;
      },
      async saveUser(userData) {
        try {
          await this.saveUserToServer(userData);
          await this.fetchUsers();
        } catch (error) {
          console.error("Ошибка сохранения пользователя:", error);
        }
      },
      async deleteUser(userId) {
        try {
          await this.deleteUserFromServer(userId);
          await this.fetchUsers();
        } catch (error) {
          console.error("Ошибка удаления пользователя:", error);
        }
      },
    },
    mounted() {
      this.fetchUsers();
    },
  };
  </script>

<style scoped>
section {
    width: 70%;
    display: flex;
    flex-direction: column;
    margin: 10px;
    
}
article {
    border-bottom: 1px solid black;
    display:flex ;
    justify-content: space-between;
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