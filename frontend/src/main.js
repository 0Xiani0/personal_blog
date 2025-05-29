import { createApp } from 'vue'
import AppProvider from '@/AppProvider.vue'
import router from '@/router'
import store from '@/store'

const app = createApp(AppProvider);
app.use(router).use(store);
app.mount('body');