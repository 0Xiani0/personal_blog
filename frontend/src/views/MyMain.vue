<template>
  <div
    class="container"
    style="display: flex; width: 100vw; height: 100vh; overflow-y: auto;"
  >
    <!-- Основной контент: посты слева -->
    <div
      style="
        flex-grow: 1;
        padding: 16px;
        padding-bottom: 80px;
        overflow: visible;
      "
    >
      <n-spin v-if="!error" :show="isLoading">
        <template #description>
          Загрузка постов...
        </template>

        <n-flex
          v-if="filteredPosts.length > 0"
          vertical
          :gap="8"
          style="margin-top: 1em;"
        >
          <n-card
            v-for="post in filteredPosts"
            :key="post.id"
            :title="post.heading"
            bordered
            class="custom-card"
          >
            <n-text depth="3" style="display: block; margin-bottom: 0.5em;">
              Опубликовано {{ formatDate(post.created_at) }}
            </n-text>
            <n-p>{{ post.description }}</n-p>

            <template #action>
              <n-button
                quaternary
                :type="post.liked_by_user ? 'error' : 'default'"
                @click="toggleLike(post)"
              >
                <n-icon style="margin-right: 4px;"><Heart /></n-icon>
                {{ post.like_count }}
              </n-button>

              <n-button quaternary @click="goToComments(post.id)">
                <n-icon style="margin-right: 4px;"><MessageCircle2 /></n-icon>
              </n-button>
            </template>
          </n-card>
        </n-flex>

        <div
          v-else-if="!isLoading"
          style="text-align: center; margin-top: 2em;"
        >
          Нет постов для отображения.
        </div>
      </n-spin>

      <n-alert
        v-else
        title="Ошибка загрузки постов"
        type="error"
        style="margin: 1em auto auto auto; max-width: 600px;"
      >
        {{ error }}
      </n-alert>
    </div>

    <!-- Сайдбар справа -->
    <div
      style="
        width: 320px;
        padding: 16px;
        border-left: 1px solid #ddd;
        overflow: visible;
        flex-shrink: 0;
        height: auto;
      "
    >
      <BlogSidebar @search="handleSearch" />
    </div>
  </div>
</template>

<script>
import {
  NSpin,
  NAlert,
  NFlex,
  NCard,
  NText,
  NButton,
  NIcon
} from 'naive-ui';
import { Heart, MessageCircle2 } from '@vicons/tabler';
import { mapGetters, mapActions } from 'vuex';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import BlogSidebar from '@/views/BlogSidebar.vue';

export default {
  components: {
    NSpin,
    NAlert,
    NFlex,
    NCard,
    NText,
    NButton,
    NIcon,
    BlogSidebar,
    Heart,
    MessageCircle2
  },
  data() {
    return {
      searchQuery: ''
    };
  },
  computed: {
    ...mapGetters('posts', ['allPosts', 'isLoading', 'error']),
    filteredPosts() {
      if (!this.allPosts) return [];
      const q = this.searchQuery.toLowerCase();
      return this.allPosts.filter(post =>
        post.heading.toLowerCase().includes(q) ||
        post.description.toLowerCase().includes(q)
      );
    }
  },
  async mounted() {
    await this.fetchPosts();
  },
  methods: {
    ...mapActions('posts', ['fetchPosts', 'likePost', 'unlikePost']),
    formatDate(dateString) {
      return format(new Date(dateString), 'dd.MM.yyyy в HH:mm', { locale: ru });
    },
    async toggleLike(post) {
      try {
        if (post.liked_by_user) {
          await this.unlikePost(post.id);
        } else {
          await this.likePost(post.id);
        }
      } catch (error) {
        console.error('Ошибка при переключении лайка:', error);
      }
    },
    handleSearch(query) {
      this.searchQuery = query;
    },
    goToComments(postId) {
      this.$router.push({ name: 'PostComments', params: { id: postId } });
    }
  }
};
</script>

<style scoped>
.container::-webkit-scrollbar {
  width: 0px;
  background: transparent;
}

.container {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE и Edge */
}

.custom-card {
  border: 1px solid #000;
  border-radius: 0;
  box-shadow: none;
}
</style>
