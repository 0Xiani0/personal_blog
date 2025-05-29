<template>
  <n-config-provider 
    :theme="theme"
    :theme-overrides="lightThemeOverrides"
  >
    <App />
    <n-global-style />
  </n-config-provider>
</template>

<script>
import App from '@/App.vue'
import { NConfigProvider, NGlobalStyle, lightTheme } from 'naive-ui';

// Переопределение стандартной темы, потом вынести отдельным файлом
const lightThemeOverrides  = { 
  common: {
    bodyColor: '#f2e8fc',
    modalColor: '#f2e8fc'
  },
  Layout: {
    headerColor: '#f2e8fc',
    footerColor: '#f2e8fc',
    siderColor: 'f2e8fc'
  },
  Card: {
    color: '#f2e8fc',
    actionColor: '#f2e8fc',
  }
}
    
export default {
 components: {
  App,
  NConfigProvider,
  NGlobalStyle,
 },
 data() {
    return {
      theme: lightTheme,
      lightThemeOverrides 
    }
  }
}
</script>