import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { create } from 'naive-ui';

const naive = create();

const app = createApp(App);
app.use(router).use(store).use(naive);
app.mount('body');
