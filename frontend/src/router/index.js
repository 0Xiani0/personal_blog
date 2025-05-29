import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/MyMain.vue';
import Gallery from '@/views/MyGallery.vue';
import FAQ from '@/views/MyFAQ.vue';
import Artist from '@/views/MyArtist.vue';
import Profile from '@/views/MyProfile.vue';
import Admin from '@/views/MyAdmin.vue';
import AdminUsers from '@/views/AdminUsers.vue';
import AdminGallery from '@/views/AdminGallery.vue';
import AdminPosts from '@/views/AdminPosts.vue';
import AdminMain from '@/views/AdminMain.vue';
import PostComments from '@/views/PostComments.vue';

const routes = [
  {
    path: '/', 
    name: 'Home', 
    component: Home,
  },
  {
    path: '/gallery', 
    name: 'Gallery', 
    component: Gallery,
  },
  {
    path: '/faq', 
    name: 'FAQ', 
    component: FAQ,
  },
  {
    path: '/artist', 
    name: 'Artist', 
    component: Artist,
  },
  {
    path: '/profile', 
    name: 'Profile', 
    component: Profile,
  },
  {
    path: '/admin', 
    name: 'Admin', 
    component: Admin,
    children: [
      {
        path: '', // Главная страница админки (по умолчанию)
        name: 'AdminMain',
        component: AdminMain,
      },
      {
        path: 'posts',
        name: 'AdminPosts',
        component: AdminPosts,
      },
      {
        path: 'gallery',
        name: 'AdminGallery',
        component: AdminGallery,
      },
      {
        path: 'users',
        name: 'AdminUsers',
        component: AdminUsers,
      },
    ],
  },
  {
    path: '/posts/:id/comments', // Оставляем маршрут для комментариев
    name: 'PostComments',
    component: PostComments,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

