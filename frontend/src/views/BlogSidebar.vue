<template>
  <n-layout-sider style="margin: 1em; flex: 1 0; width: auto; max-width: none;">
    <!-- Поиск -->
    <n-card bordered title="Поиск по записям">
      <n-input
        v-model:value="searchQuery"
        placeholder="Поиск"
        clearable
        @input="filterPosts"
        class="search-input"
        style="margin-bottom: 16px;"
      />
    </n-card>

    <!-- Карточка о художнике -->
    <n-card bordered title="О художнике">
      <n-p>Привет! На данный момент вы находитесь на моём, пусть ещё не популярном сайте. 
        Я - Xiany, начинающий художник, и скорее всего вы будете наблюдать здесь мои арты 
        которые по стилистике будут очень меняться, ведь я ещё в поисках своего стиля^-^ а 
        также мои любительские фотографии.
      </n-p> 
      <n-image src="https://i.postimg.cc/DZxJj12r/author.jpg" alt="author" width="100%" />
    </n-card>

    <!-- Карточка с соцсетями -->
<n-card bordered title="Мои соцсети">
  <n-flex justify="start" align="center" style="gap: 12px;">
    <n-a href="https://t.me/+dzrrqB_OawA4N2Fi" target="_blank" style="display: inline-block;">
      <n-image 
        width="48" 
        src="https://cdn-icons-png.flaticon.com/512/2111/2111646.png" 
        alt="tg" 
        preview-disabled
      />
    </n-a>
    <n-a href="https://vk.com/sei_xiany" target="_blank" style="display: inline-block;">
      <n-image 
        width="48" 
        src="https://cdn-icons-png.flaticon.com/512/3670/3670055.png" 
        alt="vk" 
        preview-disabled
      />
    </n-a>
  </n-flex>
</n-card>
  </n-layout-sider>
</template>

<script>
import { NCard, NLayoutSider, NInput, NImage, NA, NP, NFlex } from 'naive-ui'

export default {
  components: {
    NCard,
    NLayoutSider,
    NInput,
    NImage,
    NA,
    NP,
    NFlex
  },
  data() {
    return {
      searchQuery: '' // Для хранения поискового запроса
    };
  },
  methods: {
    filterPosts() {
      this.$emit('search', this.searchQuery); // Отправляем запрос родительскому компоненту для фильтрации постов
    }
  }
}
</script>

<style scoped>
.n-card {
  margin-bottom: 1em;
}
.n-card.n-card--bordered {
  border: 1px solid #000;
  border-radius: 0;
}
.search-input {
  margin-bottom: 16px;
}
</style>





