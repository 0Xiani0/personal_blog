<template>
  <n-spin v-if="!error" :show="isLoading" style="padding: auto; flex: 2 0;">
    <template #description>
      Загрузка постов...
    </template>

    <n-flex
      style="margin: 1em; flex: 2 0;"
      justify="center"
      vertical
      :gap="8"
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
            {{ post.comment_count || 0 }}
          </n-button>
        </template>
      </n-card>
    </n-flex>
  </n-spin>

  <n-alert
    v-else
    title="Ошибка загрузки постов"
    type="error"
    style="margin: 1em auto auto auto;"
  >
    {{ error }}
  </n-alert>

  <BlogSidebar @search="handleSearch" />
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
  computed: {
    ...mapGetters('posts', ['allPosts', 'isLoading', 'error']),
    filteredPosts() {
      return this.allPosts.filter(post =>
        post.heading.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  data() {
    return {
      searchQuery: ''
    };
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
.custom-card {
  border: 1px solid #000;
  border-radius: 0;
}
</style>
