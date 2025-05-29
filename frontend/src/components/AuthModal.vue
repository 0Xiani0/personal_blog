<template>
  <n-modal
    v-model:show="localVisible"
    closable
    @update:show="closeModal"
  >
    <n-card
      title="Авторизация"
      :bordered="false"
      style="width: 60%;"
    >
      <n-form @submit.prevent="handleLogin">
        <n-form-item label="Логин">
          <n-input v-model="login" @input="updateLogin" placeholder="Введите логин" required />
        </n-form-item>

        <n-form-item label="Пароль">
          <n-input v-model="password" @input="updatePassword" type="password" placeholder="Введите пароль" required />
        </n-form-item>

        <n-alert v-if="error" type="error" :bordered="false" closable>{{ error }}</n-alert>

        <div class="actions">
          <n-button type="primary" attr-type="submit" :loading="isLoading">Войти</n-button>
          <n-button type="error" @click="closeModal">Отмена</n-button>
        </div>
      </n-form>
    </n-card>
  </n-modal>
</template>

<script>
import { defineComponent, ref, watch } from "vue";
import { mapState, mapActions } from "vuex";

import {
  NModal, NCard, NForm, NFormItem,
  NInput, NButton, NAlert
} from "naive-ui";

export default defineComponent({
  components: {
    NModal,
    NCard,
    NForm,
    NFormItem,
    NInput,
    NButton,
    NAlert,
  },
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
  },
  setup(props, { emit }) {
    const localVisible = ref(props.isVisible);

    watch(() => props.isVisible, (newVal) => {
      localVisible.value = newVal;
    });

    function closeModal() {
      localVisible.value = false;
      emit("close");
    }

    return {
      localVisible,
      closeModal,
    };
  },
  computed: {
    ...mapState("signin", ["login", "password", "isLoading", "error"]),
  },
  methods: {
    ...mapActions("signin", ["signin", "updateLogin", "updatePassword"]),

    async handleLogin() {
      try {
        // Метод signin в Vuex-модуле должен возвращать token
        const token = await this.signin(this.$router);
        if (token) {
          localStorage.setItem("token", token); // Сохраняем токен
          this.closeModal(); // Закрываем модалку
        }
      } catch (error) {
        console.error("Ошибка авторизации:", error);
      }
    },
  },
});
</script>

<style scoped>
.actions {
  display: flex;
  justify-content: space-between;
}
</style>
