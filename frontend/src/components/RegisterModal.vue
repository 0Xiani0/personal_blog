<template>
  <n-modal
    v-model:show="localVisible"
    closable
    @update:show="closeModal"
  >
    <n-card
      title="Регистрация"
      :bordered="false"
      style="width: 60%;"
    >
      <n-form @submit.prevent="handleRegister">
      <n-form-item label="Никнейм">
        <n-input v-model="login" @input="updateLogin" placeholder="Придумайте никнейм" required />
      </n-form-item>

      <n-form-item label="Электронная почта">
        <n-input v-model="email" @input="updateEmail" type="email" placeholder="Введите email" required />
      </n-form-item>

      <n-form-item label="Пароль">
        <n-input v-model="password" @input="updatePassword" type="password" placeholder="Придумайте пароль" required />
      </n-form-item>

      <n-form-item label="Повторите пароль">
        <n-input v-model="passwordRepeat" @input="updatePasswordRepeat" type="password" placeholder="Повторите пароль" required />
      </n-form-item>

      <n-alert v-if="error" type="error" :bordered="false" closable>{{ error }}</n-alert>

      <div class="actions">
        <n-button type="primary" attr-type="submit" :loading="isLoading">Зарегистрироваться</n-button>
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
  NModal,
  NCard, 
  NForm, 
  NFormItem, 
  NInput, 
  NButton, 
  NAlert 
} from "naive-ui";

export default defineComponent({
  components: {
    NModal,
    NCard,
    NForm,
    NFormItem,
    NInput,
    NButton,
    NAlert
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
    ...mapState("register", ["login", "email", "password", "passwordRepeat", "error", "isLoading"]),
  },
  methods: {
    ...mapActions("register", ["register", "updateLogin", "updateEmail", "updatePassword", "updatePasswordRepeat"]),

    async handleRegister() {
      if (this.password !== this.passwordRepeat) {
        this.$emit("error", "Пароли не совпадают!");
        return;
      }

      try {
        await this.register(this.$router);
        this.closeModal();
      } catch (error) {
        console.error("Ошибка регистрации:", error);
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
