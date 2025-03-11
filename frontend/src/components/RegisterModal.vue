<template>
  <section class="modal" v-if="isVisible" @click.self="closeModal">
    <div class="modal-content">
      <h2>Регистрация</h2>
      <form @submit.prevent="handleRegister">
        <!-- Никнейм -->
        <label>
          <input
            type="text"
            :value="login" 
            @input="updateLogin"
            placeholder="придумайте никнейм"
            required
          />
        </label>

        <!-- Адрес электронной почты -->
        <label>
          <input
            type="email"
            :value="email" 
            @input="updateEmail"
            placeholder="адрес эл. почты"
            required
          />
        </label>

         <!-- Пароль -->
         <label>
          <input
            type="password"
            :value="password" 
            @input="updatePassword"
            placeholder="придумайте пароль"
            required
          />
        </label>

         <!-- Подтверждение пароля -->
         <label>
          <input
            type="password"
            :value="passwordRepeat" 
            @input="updatePasswordRepeat"
            placeholder="повторите пароль"
            required
          />
        </label>

        <button type="submit" :disabled="isLoading">{{ isLoading ? "Загрузка..." : "Зарегистрироваться" }}</button>
      </form>
    </div>
  </section>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    ...mapState("register", [
      "login",
      "email", 
      "password", 
      "passwordRepeat", 
      "error",
      "isLoading"
    ]),
  },
  methods: {
    ...mapMutations("register", [
      "SET_LOGIN",
      "SET_EMAIL",
      "SET_PASSWORD",
      "SET_PASSWORD_REPEAT",
      "CLEAR_ERROR",
    ]),
    ...mapActions("register", ["register"]),

    updateLogin(event) {
      this.SET_LOGIN(event.target.value)
    },
    updateEmail(event) {
      this.SET_EMAIL(event.target.value)
    },
    updatePassword(event) {
      this.SET_PASSWORD(event.target.value)
    },
    updatePasswordRepeat(event) {
      this.SET_PASSWORD_REPEAT(event.target.value)
    },

    closeModal() {
      this.$emit("close");
      this.CLEAR_ERROR(); // Очищаем ошибку при закрытии модального окна
    },
    async handleRegister() {
      if (this.password !== this.passwordRepeat) {
        alert("Пароли не совпадают!");
        return;
      }

      try {
        await this.register(this.$router); // Передаем роутер для редиректа
        this.closeModal(); // Закрываем окно при успешной регистрации
      } catch (error) {
        console.error("Ошибка регистрации:", error);
      }
    },
  },
};
</script>

<style scoped>
/* Общий стиль для модального окна */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5); /* Полупрозрачный черный фон */
  align-items: center;
  justify-content: center;
  z-index: 1000;
  display: flex; /* Flexbox для внутреннего выравнивания */
  flex-direction: column; /* Элементы в колонке */
  
}

/* Внутренний контейнер модального окна */
.modal-content {
  background: #f2e8fc; /* Фон модального окна */
  padding: 30px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  text-align: center;
  width: 500px; /* Ширина модального окна */
  border: 2px solid #000000;
}

/* Заголовок окна */
h2 {
  margin: 0 0 20px;
  font-size: 24px;
  font-weight: bold;
  color: #000;
  text-transform: uppercase;
  border-bottom: 2px solid #000;
  padding-bottom: 5px;
}

/* Поля ввода */
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

/* Изображение */
.image-container {
  margin: 20px;
}

.image {
  width: 100px; /* Размер изображения */
  height: auto;
}

/* Кнопка входа */
.submit-btn {
  
  background: #f2e8fc;
  color: #000;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s ease;
}
/*ссылка для перехода в окно регистрации*/
.link {
  color: #000;
  cursor: pointer;
  display: flex;
  margin-top: 15px;
  width: 50%; /* Ширина элемента */
  margin-left: auto;
  margin-right: auto; /* Центрирует блок по горизонтали */
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