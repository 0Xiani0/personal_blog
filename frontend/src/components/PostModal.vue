<template>
  <n-modal
    v-model:show="localVisible"
    :title="post?.id ? 'Редактировать пост' : 'Создать пост'"
    preset="card"
    :bordered="false"
    size="medium"
    closable
    @update:show="handleUpdateShow"
  >
    <n-form @submit.prevent="handleSave">
      <n-form-item label="Название">
        <n-input v-model:value="postData.heading" placeholder="Введите название" required />
      </n-form-item>

      <n-form-item label="Содержание">
        <n-input
          type="textarea"
          v-model:value="postData.description"
          placeholder="Введите содержание"
          required
        />
      </n-form-item>

      <n-alert v-if="error" type="error" :bordered="false" closable>{{ error }}</n-alert>

      <div class="actions">
        <n-button type="primary" attr-type="submit" :loading="isSaving">Сохранить</n-button>
        <n-button @click="closeModal">Отмена</n-button>
      </div>
    </n-form>
  </n-modal>
</template>

<script>
import { mapState } from "vuex";
import { NModal, NForm, NFormItem, NInput, NButton, NAlert } from "naive-ui";

export default {
  components: {
    NModal,
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
    post: {
      type: Object,
      default: () => ({ heading: "", description: "" }),
    },
  },
  data() {
    return {
      localVisible: this.isVisible,
      postData: { ...this.post },
      isSaving: false,
      error: null,
    };
  },
  watch: {
    isVisible(val) {
      this.localVisible = val;
    },
    post: {
      immediate: true,
      handler(newPost) {
        this.postData = { ...newPost };
      },
    },
  },
  computed: {
    ...mapState("user", ["id"]),
  },
  methods: {
    handleUpdateShow(val) {
      if (!val) this.closeModal();
    },
    closeModal() {
      this.$emit("close");
    },
    async handleSave() {
      this.isSaving = true;
      this.error = null;
      try {
        const payload = {
          ...this.postData,
          userId: this.id,
        };
        this.$emit("save", payload);
      } catch (err) {
        this.error = "Не удалось сохранить пост";
        console.error(err);
      } finally {
        this.isSaving = false;
      }
    },
  },
};
</script>

<style scoped>
.actions {
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
}
</style>

