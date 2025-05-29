<template>
    <n-layout class="admin-layout">
      <!-- Боковое меню -->
      <n-layout-sider
        bordered
        width="220px"
        style="flex: 0 0 220px;"
        content-style="padding: 1em;"
      >
        <n-h3 style="margin-bottom: 1em;">Админ панель</n-h3>
        <n-menu
          :options="menuOptions"
          :value="activePath"
          @update:value="handleSelect"
        />
      </n-layout-sider>
  
      <!-- Основной контент -->
      <n-layout-content class="content-area">
        <router-view />
      </n-layout-content>
    </n-layout>
  </template>
  
  <script>
  import { NLayout, NLayoutSider, NLayoutContent, NMenu, NH3 } from 'naive-ui'
  import { h } from 'vue'
  
  export default {
    components: {
      NLayout,
      NLayoutSider,
      NLayoutContent,
      NMenu,
      NH3,
    },
    computed: {
      activePath() {
        return this.$route.path
      },
    },
    methods: {
      handleSelect(path) {
        this.$router.push(path)
      },
    },
    data() {
      return {
        menuOptions: [
          { label: () => h('span', 'Главная'), key: '/admin' },
          { label: () => h('span', 'Посты'), key: '/admin/posts' },
          { label: () => h('span', 'Галерея'), key: '/admin/gallery' },
          { label: () => h('span', 'Пользователи'), key: '/admin/users' },
        ],
      }
    },
  }
  </script>
  
  <style scoped>
  .admin-layout {
    display: flex;
    min-height: 100vh;
  }
  
  /* Основной контент растягивается на всё оставшееся пространство */
  .content-area {
    flex: 1 1 auto;
    padding: 1em;
  }
  </style>
  