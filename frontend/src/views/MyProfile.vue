<template>
  <n-spin :show="isLoading" style="padding: auto;">
    <template #description>
      Загрузка данных профиля...
    </template>

    <n-flex vertical style="padding: 2em; max-width: 600px;">
      <!-- Заголовок, как на других страницах -->
      <n-h2 prefix="bar">Профиль пользователя</n-h2>

      <!-- Карточка профиля -->
      <n-card style="width: auto;" bordered>
        <n-flex align="center" :wrap="false" style="margin-bottom: 1em;">
          <img
            src="@/assets/images/profile.png"
            alt="profile"
            style="max-width: 120px; object-fit: contain; height: auto; margin-right: 1em;"
          />
          <div>
            <n-p><strong>Никнейм:</strong> {{ username }}</n-p>
            <n-p><strong>Электронная почта:</strong> {{ email }}</n-p>
          </div>
        </n-flex>

        <!-- Ошибка загрузки данных пользователя -->
        <n-alert v-if="error" title="Ошибка" type="error">
          {{ error }}
        </n-alert>
      </n-card>
    </n-flex>
  </n-spin>
</template>

<script>
import { NSpin, NCard, NFlex, NAlert, NP, NH2 } from 'naive-ui';
import { mapGetters } from 'vuex';

export default {
  components: {
    NSpin,
    NCard,
    NFlex,
    NAlert,
    NP,
    NH2
  },
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
/* Здесь можно добавить дополнительные стили, если нужно */
</style>
