<template>
    <n-flex vertical style="padding: 2em;">
      <n-h2 prefix="bar">Добро пожаловать в админ панель!</n-h2>
    </n-flex>
  </template>
  
  <script>
  import { NH2, NFlex } from 'naive-ui';
  
  export default {
    components: {
      NH2,
      NFlex
    }
  };
  </script>
  
  <style scoped>
  ::v-deep(.n-h2__prefix) {
    background-color: #ff69b4; /* Розовый цвет флажка */
  }
  
  n-flex {
    padding: 2em;
  }
  
  n-h2 {
    margin: 0;
    font-weight: bold;
  }
  </style>
  