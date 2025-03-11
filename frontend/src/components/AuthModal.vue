<template>
  <section class="modal" v-if="isVisible" @click.self="closeModal">
    <div class="modal-content">
      <h2>Авторизация</h2>
      <form @submit.prevent="handleLogin">
        <label>
          <input
            type="text"
            :value="login" 
            @input="updateLogin" 
            placeholder="Введите логин"
            required
          />
        </label>

        <label>
          <input
            type="password"
            :value="password" 
            @input="updatePassword"
            placeholder="Введите пароль"
            required
          />
        </label>

        <div class="image-container">
          <img class="image" src="@/assets/icons/pompom.png" alt="pompom" />
        </div>

        <button type="submit" class="submit-btn">{{ isLoading ? "Вход..." : "Войти" }}</button>
      </form>
    </div>
  </section>
</template>

<script>
import { mapMutations, mapActions, mapState } from "vuex";

export default {
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    ...mapState("signin", ["login", "password", "isLoading", "error"]),
  },
  methods: {
    ...mapMutations("signin", ["SET_LOGIN", "SET_PASSWORD"]),
    ...mapActions("signin", ["signin"]),
    closeModal() {
      this.$emit("close");
    },
    async handleLogin() {
      try {
        await this.signin(this.$router);
        this.closeModal()
      } catch (error) {
        console.error("Ошибка авторизации:", error);
      }
    },
    updateLogin(event) {
      this.SET_LOGIN(event.target.value);
    },
    updatePassword(event) {
      this.SET_PASSWORD(event.target.value);
    }
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
  align-items: center;
  justify-content: center;
  z-index: 1000;
  display: flex;
  flex-direction: column; 
  
}

.modal-content {
  background: #f2e8fc; 
  padding: 30px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  text-align: center;
  width: 500px; 
  border: 2px solid #000000;
}

h2 {
  margin: 0 0 20px;
  font-size: 24px;
  font-weight: bold;
  color: #000;
  text-transform: uppercase;
  border-bottom: 2px solid #000;
  padding-bottom: 5px;
}

form label input {
  width: 100%;
  padding: 10px;
  margin-bottom: 30px;
  border: 1px solid #000;
  font-size: 16px;
  color: #000;
  background: #f2e8fc;
  text-align: center;
  padding-right: 0px;
}

form label input::placeholder {
  color: #000000;
}

.image-container {
  margin: 20px;
}

.image {
  width: 100px; 
  height: auto;
}

.submit-btn {
  
  background: #f2e8fc;
  color: #000;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.link {
  color: #000;
  cursor: pointer;
  display: flex;
  margin-top: 15px;
  width: 50%; 
  margin-left: auto;
  margin-right: auto; 
}

</style>
