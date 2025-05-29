<template>
  <n-layout class="n-layout-root">
    <n-layout-header style="text-align: center; ">
      <my-header/>
    </n-layout-header>
    <n-layout-content class="layout-content">
      <n-message-provider>
        <router-view/>
      </n-message-provider>
    </n-layout-content>
    <n-layout-footer style="border-top: 1px solid #000; text-align: center;">
      <my-footer />
    </n-layout-footer>
  </n-layout>
</template>

<script>
import MyFooter from '@/views/MyFooter.vue';
import MyHeader from '@/views/MyHeader.vue';
import { 
  NLayout, 
  NLayoutHeader, 
  NLayoutContent, 
  NLayoutFooter,
  NMessageProvider
} from 'naive-ui';

export default {
  components: {
    MyFooter,
    MyHeader,
    NLayout,
    NLayoutHeader,
    NLayoutContent,
    NLayoutFooter,
    NMessageProvider
  }
}
</script>

<style>
.n-layout-root {
  margin: auto 20%; 
  min-height: 100vh; 
  display: flex; 
  flex-direction: column;
}
/* Медиазапрос для планшетов и мобильных */
@media (max-width: 1024px) {
  .n-layout-root {
    margin: auto 5%;
  }
}

@media (max-width: 600px) {
  .n-layout-root {
    margin: auto 2%;
  }
}

.n-layout-root .n-layout-scroll-container {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.layout-content {
  flex: 1 0 auto;
  display: 'flex';
}

.layout-content .n-layout-scroll-container {
  display: flex;
  flex-direction: row;
}

/* Для мобильных экранов — переключаем на колонку */
@media (max-width: 768px) {
  .layout-content .n-layout-scroll-container {
    flex-direction: column;

  }
}
</style>
