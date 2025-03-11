<template>
  <header> <!-- этот тег используется как верхняя панель сайта -->
    <h1>xiany.ru</h1> <!-- этот тег используется для обозначения логотипа сайта.-->
    <nav> <!-- этот тег используется на сайте как ссылка для перемещения между страницами -->
      <section>
        <router-link to="/">БЛОГ</router-link>
        <router-link to="/gallery">ГАЛЕРЕЯ</router-link>
        <router-link to="/artist">О ХУДОЖНИКЕ</router-link>
        <router-link to="/faq">FAQ</router-link>
      </section>
              
      <section v-if="!isAutorized">
        <a @click="showModal = !showModal">АВТОРИЗАЦИЯ</a>
        <a @click="showRegisterModal = !showRegisterModal">РЕГИСТРАЦИЯ</a>
      </section>

      <section v-if="isAutorized">
        <router-link to="/profile">ПРОФИЛЬ</router-link>
        <router-link v-if="role_name == 'Admin'" to="/admin">АДМИН</router-link>
        <router-link to="/" @click="logout">ВЫХОД</router-link>
      </section>
    </nav>
  </header>

  <AuthModal :isVisible="showModal" @close="showModal = false"/>
  <RegisterModal :isVisible="showRegisterModal" @close="showRegisterModal = false"/>
</template>

<script>
import AuthModal from '@/components/AuthModal.vue';
import RegisterModal from '@/components/RegisterModal.vue';
import { mapState, mapMutations } from 'vuex';

export default {
  components: {
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
    ...mapState("auth", ["isAutorized"]),
    ...mapState("user", ["role_name"]),
  },
  methods: {
    ...mapMutations("auth", ["SET_UNAUTORIZED", "CLEAR_ACCESS_TOKEN"]),
    ...mapMutations("user", ["CLEAR_ALL_DATA"]),
    logout() {
      this.CLEAR_ALL_DATA()
      this.CLEAR_ACCESS_TOKEN();
      this.SET_UNAUTORIZED();
    },
  }
};
</script>

<style scoped>
header {
    width: 100%;
    text-align: center;

    h1 {
        margin: 1em;
        font-size: xxx-large;
    }

    nav {
        width: 100%;

        border-top: 1px solid #000;
        border-bottom: 1px solid #000;

        text-align: center;
        display: flex;
        justify-content: center;

        section {
          margin: 0.5em 0;
        }

        a {
            margin: 0.5em 0.1em;
            padding: 0.5em 0.9em;
            color:#000;
            text-decoration: none;
            background-color: #f2e8fc;
            cursor: pointer;
        }
    }
}
</style>