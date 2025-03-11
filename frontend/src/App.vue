<template>
  <n-layout>
    <n-layout-header>
      <my-header/>
    </n-layout-header>
    <n-layout-content>
      <router-view/>
    </n-layout-content>
    <n-layout-footer>
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
  NLayoutFooter 
} from 'naive-ui';

export default {
  components: {
    MyFooter,
    MyHeader,
    NLayout,
    NLayoutHeader,
    NLayoutContent,
    NLayoutFooter,
  }
}
</script>