<template>
    <main>
      <section>
        <h2>Профиль</h2>
      </section>
      <img src="@/assets/images/profile.png" alt="profile">
      <div>
        <p><strong>Никнейм:</strong> {{ username }}</p>
        <p><strong>Электронная почта:</strong> {{ email }}</p>
      </div>
      <div v-if="error" class="error">
        <p>{{ error }}</p>
      </div>
      <div v-if="isLoading" class="loading">
        <p>Загрузка...</p>
      </div>
    </main>
  </template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters('user', ['username', 'email', 'error', 'isLoading']),
  },
  created() {
    this.fetchUserData();
  },
  methods: {
    async fetchUserData() {
      try {
        await this.$store.dispatch('user/fetchUser', this.$router);
      } catch (e) {
        console.error('Ошибка загрузки данных пользователя:', e);
      }
    },
  },
};
</script>

<style scoped>
main{

    
    container {
        display: flex;
        align-items: center; /* Выравнивание по вертикали */
        gap: 15px; /* Расстояние между изображением и текстом */
        align-items: flex-start;
        
        
    }
    img {
        max-width: 15%;
        object-fit: contain;
        margin: 1%;
        height: auto;
    }
   
}
   
</style>