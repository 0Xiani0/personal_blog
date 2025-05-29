<template>
  <div style="width: 100%; padding: 2em;">
    <n-h2 prefix="bar">Галерея</n-h2>

    <n-grid :cols="4" :x-gap="16" :y-gap="16" responsive="screen">
      <n-gi v-for="(img, index) in images" :key="index">
        <n-image
  :src="img.url"
  :alt="`photo_${index + 1}`"
  object-fit="cover"
  width="100%"
  height="220"
  preview-disabled
/>

      </n-gi>
    </n-grid>
  </div>
</template>

<script>
import { NH2, NGrid, NGi, NImage } from 'naive-ui';
import axios from 'axios'; // убедись, что axios установлен и импортирован

export default {
  components: {
    NH2,
    NGrid,
    NGi,
    NImage
  },
  data() {
    return {
      images: []  // изначально пустой массив
    };
  },
  mounted() {
    // запрос к API для получения фото
    axios.get('http://localhost:8081/api/photos')
      .then(response => {
        this.images = response.data; // ожидаем, что массив объектов с { id, name, url }
      })
      .catch(error => {
        console.error('Ошибка загрузки фото', error);
      });
  }
};
</script>


