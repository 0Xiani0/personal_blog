<template>
    <n-flex vertical style="padding: 2em;">
      <n-h2 prefix="bar" style="text-align: left;">О художнике</n-h2>
  
      <n-card
        style="width: 100%;" 
        content-style="display: flex; gap: 2em; align-items: flex-start; justify-content: space-between;"
        bordered
      >
        <!-- Текстовое описание, которое занимает всю доступную ширину -->
        <n-p style="flex: 1;">
          Привет! На данный момент вы находитесь на моём, пусть ещё не популярном сайте. Я — Xiany, начинающий художник, и скорее всего вы будете наблюдать здесь мои арты, которые по стилистике будут очень меняться, ведь я ещё в поисках своего стиля ^-^ а также мои любительские фотографии.
        </n-p>
  
        <!-- Фото справа -->
        <div style="flex-shrink: 0; width: 300px; text-align: center;">
          <n-image
            :src="require('@/assets/images/author.jpg')"
            alt="author"
            width="300"
            object-fit="cover"
            style="border-radius: 10px;"
          />
          <n-text depth="3" style="display: block; margin-top: 0.5em;">Анужис Ксения, 20 лет</n-text>
        </div>
      </n-card>
    </n-flex>
  </template>
  
  <script>
  import { NH2, NFlex, NCard, NP, NText, NImage } from 'naive-ui';
  
  export default {
    components: {
      NH2,
      NFlex,
      NCard,
      NP,
      NText,
      NImage
    }
  };
  </script>
  
  
  
  
  
  

