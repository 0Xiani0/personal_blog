<template>
  <n-flex vertical class="user-container">
    <n-h2 prefix="bar">Пользователи</n-h2>

    <n-alert v-if="error" type="error" :bordered="false" closable>{{ error }}</n-alert>

    <div class="user-list" v-if="users.length > 0">
      <div
        v-for="user in users"
        :key="user.id"
        class="user-item"
      >
        <n-card class="user-card">
          <div class="card-header">
            <n-typography class="user-info">
              <b>#{{ user.id }}</b> {{ user.username }} ({{ user.email }})
            </n-typography>
          </div>
          <template #footer>
            <div class="user-actions">
              <n-button class="pink-button" @click="deleteUser(user.id)">Удалить</n-button>
            </div>
          </template>
        </n-card>
      </div>
    </div>
    <n-empty v-else description="Пользователи не найдены" />
  </n-flex>
</template>

<script>
import { NButton, NCard, NH2, NAlert, NEmpty } from 'naive-ui';
import { mapState, mapActions } from 'vuex';

export default {
  name: "AdminUsers",
  components: {
    NButton,
    NCard,
    NH2,
    NAlert,
    NEmpty,
  },
  computed: {
    ...mapState('user', ['users', 'error']),
  },
  methods: {
    ...mapActions('user', ['fetchUsers', 'deleteUserFromServer']),

    async deleteUser(userId) {
      try {
        await this.deleteUserFromServer(userId);
      } catch (error) {
        console.error('Ошибка удаления пользователя:', error);
      }
    }
  },
  mounted() {
    this.fetchUsers();
  }
}
</script>

<style scoped>
.user-container {
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
  cursor: pointer;
}

.pink-button:hover {
  background-color: #f2e8fc;
  color: #000;
}

.user-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 20px;
}

.user-item {
  display: flex;
  width: 100%;
}

.user-card {
  width: 100%;
  box-shadow: none !important;
  border: none !important;
  transition: none !important;
  outline: none !important;
  --n-focus-box-shadow: none !important;
  --n-card-box-shadow-hover: none !important;
  --n-card-border-hover: transparent !important;
}

.user-card:hover,
.user-card:focus,
.user-card:focus-visible {
  box-shadow: none !important;
  outline: none !important;
  --n-focus-box-shadow: none !important;
  --n-card-box-shadow-hover: none !important;
  --n-card-border-hover: transparent !important;
  border: none !important;
}

.user-actions {
  display: flex;
  gap: 8px;
  justify-content: flex-start;
  align-items: center;
}

@media (max-width: 480px) {
  .user-actions {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
