<template>
  <div style="width: 100%; padding: 2em;">
    <n-h2 prefix="bar">Галерея</n-h2>

    <n-grid :cols="4" :x-gap="16" :y-gap="16" responsive="screen">
      <n-gi v-for="(img, index) in images" :key="img.id">
        <n-image
          :src="img.url"
          :alt="`photo_${index + 1}`"
          object-fit="cover"
          width="100%"
          height="220px"
          :preview-disabled="true"
        />
      </n-gi>
    </n-grid>
  </div>
</template>

<script>
import { NH2, NGrid, NGi, NImage } from 'naive-ui';
import axios from '@/utils/axios.js'

export default {
  components: {
    NH2,
    NGrid,
    NGi,
    NImage
  },
  data() {
    return {
      images: []
    };
  },
  mounted() {
     axios.get('/images')
      .then(response => {
        this.images = response.data;
      })
      .catch(error => {
        console.error('Ошибка загрузки фото', error);
      });
  }
};
</script>

