<template>
  <n-space vertical :size="24" style="padding: 2em;">
    <!-- Пост -->
    <div v-if="post">
      <n-h2 prefix="bar">{{ post.heading }}</n-h2>
      <n-text depth="3" block>
        Опубликовано {{ formatDate(post.created_at) }}
      </n-text>
      <p style="margin: 1em 0; white-space: pre-line;">{{ post.description }}</p>
      <n-button
        quaternary
        :type="post.liked_by_user ? 'error' : 'default'"
        @click="toggleLike"
        :loading="loading.like"
        :disabled="loading.like || !userId"
      >
        <n-icon style="margin-right: 4px;"><Heart /></n-icon>
        {{ post.like_count }}
      </n-button>
    </div>

    <n-divider />

    <!-- Форма комментария -->
    <div v-if="userId">
      <h3 style="margin-bottom: 0.5em;">Оставить комментарий</h3>
      <n-input
        v-model:value="newComment"
        placeholder="Напишите комментарий..."
        type="textarea"
        :disabled="loading.comment"
        :autosize="{ minRows: 3, maxRows: 6 }"
        show-count
        :maxlength="1000"
      />
      <n-button 
        type="primary" 
        @click="submitComment" 
        style="margin-top: 0.5em;"
        :loading="loading.comment"
        :disabled="!isCommentValid || loading.comment"
      >
        Отправить
      </n-button>
    </div>
    <div v-else style="margin-bottom: 1em;">
      <n-alert type="info" closable>
        Чтобы оставить комментарий, 
        <n-button text type="primary" @click="openAuthModal">войдите</n-button>
      </n-alert>
    </div>

    <n-divider />

    <!-- Список комментариев -->
    <div>
      <h3 style="margin-bottom: 0.5em;">Комментарии ({{ comments.length }})</h3>
      <div v-if="loading.comments" style="text-align: center; margin: 20px 0;">
        <n-spin size="medium" />
      </div>
      <div v-else-if="!comments.length" style="color: #666; text-align: center; padding: 20px;">
        <n-text depth="3">Пока нет ни одного комментария. Будьте первым!</n-text>
      </div>
      <transition-group name="comment-list" tag="div">
        <n-card
          v-for="c in comments"
          :key="c.id"
          size="small"
          bordered
          class="comment-card"
          style="margin-bottom: 1em; transition: all 0.3s ease;"
        >
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <n-text strong>{{ c.author_username || 'Аноним' }}</n-text>
              <n-text depth="3" style="margin-left: 1em; font-size: 0.9em;">
                {{ formatDate(c.created_at) }}
              </n-text>
            </div>
            <n-button
              v-if="c.user_id === userId || isAdmin"
              size="tiny"
              text
              type="error"
              @click="deleteComment(c.id)"
              :loading="loading.deleting === c.id"
              :disabled="loading.deleting === c.id"
            >
              Удалить
            </n-button>
          </div>
          <p style="margin-top: 0.5em; white-space: pre-line;">{{ c.text }}</p>
        </n-card>
      </transition-group>
    </div>

    <!-- Модальное окно авторизации -->
    <AuthModal :isVisible="showAuthModal" @close="onAuthModalClose" />
  </n-space>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import {
  NSpace, NText, NInput, NButton, NCard, NDivider, NIcon, useMessage, NH2, NSpin, NAlert
} from 'naive-ui';
import { Heart } from '@vicons/tabler';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import axios from 'axios';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

import AuthModal from '@/components/AuthModal.vue'; // импорт модалки авторизации

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8081/api',
  timeout: 10000,
  withCredentials: true
});

axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('access_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosInstance.interceptors.response.use(
  res => res,
  err => {
    if (err.code === 'ECONNABORTED') {
      err.response = { status: 408, data: { message: 'Превышено время ожидания сервера' }};
    }
    return Promise.reject(err);
  }
);

const route = useRoute();
const router = useRouter();
const store = useStore();
const message = useMessage();

const post = ref(null);
const comments = ref([]);
const newComment = ref('');
const loading = ref({ comments: false, comment: false, like: false, deleting: null });

// Управление модалкой авторизации
const showAuthModal = ref(false);

const userId = computed(() => store.getters['user/id']);
const roleId = computed(() => store.getters['user/role_id']);
const isAdmin = computed(() => roleId.value === 2);

const isCommentValid = computed(() => {
  const len = newComment.value.trim().length;
  return len >= 2 && len <= 1000;
});

const formatDate = dateString => {
  const d = new Date(dateString);
  return isNaN(d) ? '' : format(d, 'dd.MM.yyyy в HH:mm', { locale: ru });
};

const fetchData = async () => {
  loading.value.comments = true;
  try {
    const id = route.params.id;
    const [p, c] = await Promise.all([
      axiosInstance.get(`/posts/${id}`),
      axiosInstance.get(`/posts/${id}/comments`)
    ]);
    post.value = p.data;
    comments.value = c.data;
  } catch (e) {
    handleError(e, 'Не удалось загрузить данные');
  } finally {
    loading.value.comments = false;
  }
};

const submitComment = async () => {
  if (!isCommentValid.value || loading.value.comment) return;
  try {
    loading.value.comment = true;
    const { data } = await axiosInstance.post(`/posts/${post.value.id}/comments`, { text: newComment.value.trim() });
    comments.value.unshift(data);
    newComment.value = '';
    message.success('Комментарий успешно добавлен');
  } catch (e) {
    handleError(e, 'Не удалось отправить комментарий');
  } finally {
    loading.value.comment = false;
  }
};

const deleteComment = async id => {
  if (loading.value.deleting) return;
  try {
    loading.value.deleting = id;
    await axiosInstance.delete(`/comments/${id}`);
    comments.value = comments.value.filter(c => c.id !== id);
    message.success('Комментарий удалён');
  } catch (e) {
    handleError(e, 'Не удалось удалить комментарий');
  } finally {
    loading.value.deleting = null;
  }
};

const toggleLike = async () => {
  if (!userId.value) {
    // Показываем модалку, вместо перехода на /login
    showAuthModal.value = true;
    message.warning('Нужно авторизоваться');
    return;
  }
  try {
    loading.value.like = true;
    const method = post.value.liked_by_user ? 'delete' : 'post';
    await axiosInstance({ method, url: `/posts/${post.value.id}/like` });
    post.value.liked_by_user = !post.value.liked_by_user;
    post.value.like_count += post.value.liked_by_user ? 1 : -1;
  } catch (e) {
    handleError(e, 'Не удалось обновить лайк');
  } finally {
    loading.value.like = false;
  }
};

const handleError = (error, defaultMessage) => {
  console.error(error);
  const msg = error.response?.data?.message || defaultMessage;
  message.error(msg);
  if (error.response?.status === 401) {
    store.dispatch('auth/logout');
    // Показываем модалку, вместо перехода на /login
    showAuthModal.value = true;
  } else if (error.response?.status === 403) {
    router.push('/403');
  } else if (error.response?.status === 404) {
    router.push('/404');
  }
};

// Открыть модалку
const openAuthModal = () => {
  showAuthModal.value = true;
};

// Закрыть модалку
const onAuthModalClose = () => {
  showAuthModal.value = false;
};

onMounted(fetchData);
</script>

<style scoped>
.comment-card { border-radius: 8px; transition: all 0.3s ease; }
.comment-card:hover { box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
.comment-list-enter-active, .comment-list-leave-active { transition: all 0.3s ease; }
.comment-list-enter-from, .comment-list-leave-to { opacity: 0; transform: translateX(30px); }
</style>
