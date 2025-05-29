<template>
  <n-h1>xiany.ru</n-h1>
  <n-flex align="center" justify="center" width="100%" style="border-top: 1px solid #000; border-bottom: 1px solid #000;">
    <n-space style="margin: 0.5em 0;">
      <router-link to="/">БЛОГ</router-link>
      <router-link to="/gallery">ГАЛЕРЕЯ</router-link>
      <router-link to="/artist">О ХУДОЖНИКЕ</router-link>
      <router-link to="/faq">ЧАВО</router-link>
    </n-space>

    <n-space v-if="!isAuthorized" style="margin: 0.5em 0;">
      <router-link to="#" @click="showModal = !showModal">АВТОРИЗАЦИЯ</router-link>
      <router-link to="#" @click="showRegisterModal = !showRegisterModal">РЕГИСТРАЦИЯ</router-link>
    </n-space>

    <n-space v-if="isAuthorized" style="margin: 0.5em 0;">
      <router-link to="/profile">ПРОФИЛЬ</router-link>
      <!-- Показываем админку только если role_id === 2 -->
      <router-link v-if="role_id === 2" to="/admin">АДМИН</router-link>
      <router-link to="/" @click.prevent="logout">ВЫХОД</router-link>
    </n-space>
  </n-flex>

  <AuthModal :isVisible="showModal" @close="showModal = false" />
  <RegisterModal :isVisible="showRegisterModal" @close="showRegisterModal = false" />
</template>

<script>
import { NH1, NFlex, NSpace } from 'naive-ui';
import AuthModal from '@/components/AuthModal.vue';
import RegisterModal from '@/components/RegisterModal.vue';
import { mapState, mapMutations } from 'vuex';

export default {
  components: {
    NH1,
    NFlex,
    NSpace,
    AuthModal,
    RegisterModal,
  },
  data() {
    return {
      showModal: false,
      showRegisterModal: false,
    };
  },
  computed: {
    // Берём авторизацию из модуля auth
    ...mapState('auth', ['isAuthorized']),
    // Берём role_id из модуля user
    ...mapState('user', ['role_id']),
  },
  methods: {
    ...mapMutations('auth', ['SET_UNAUTHORIZED', 'CLEAR_ACCESS_TOKEN']),
    ...mapMutations('user', ['CLEAR_ALL_DATA']),
    logout() {
      this.CLEAR_ALL_DATA();
      this.CLEAR_ACCESS_TOKEN();
      this.SET_UNAUTHORIZED();
    },
  },
};
</script>

<style scoped>
a {
  margin: 0.5em 0.1em;
  padding: 0.5em 0.9em;
  color: #000;
  text-decoration: none;
  background-color: #f2e8fc;
  cursor: pointer;
}
@media (max-width: 768px) {
  a {
    margin: 0.3em 0.1em;
    padding: 0.3em 0.6em;
  }
}
@media (max-width: 480px) {
  a {
    margin: 0.2em 0.05em;
    padding: 0.2em 0.4em;
  }
}
</style>
