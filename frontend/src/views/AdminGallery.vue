<template>
  <n-space vertical :size="24">
    <n-h2 prefix="bar">Галерея</n-h2>

    <!-- Загрузка фото -->
    <n-card>
      <n-upload
        :default-upload="false"
        :show-file-list="false"
        @change="onFileChange"
      >
        <n-button>Выбрать файл</n-button>
      </n-upload>

      <n-input
        v-model:value="photoName"
        placeholder="Название фото"
        style="margin-top: 12px;"
      />

      <n-button
        type="primary"
        @click="uploadPhoto"
        :disabled="!selectedFile || !photoName"
        style="margin-top: 12px;"
      >
        Загрузить
      </n-button>
    </n-card>

    <!-- Список фото -->
    <n-grid :cols="4" :x-gap="16" :y-gap="16">
      <n-gi v-for="photo in photos" :key="photo.id">
        <n-card :title="photo.name" size="small">
          <n-image :src="photo.url" width="100%" height="180px" object-fit="cover" />
          <template #footer>
            <n-button
              type="error"
              size="small"
              block
              @click="deletePhoto(photo.id)"
            >
              Удалить
            </n-button>
          </template>
        </n-card>
      </n-gi>
    </n-grid>
  </n-space>
</template>

<script setup>
import {
  NH2,
  NSpace,
  NCard,
  NButton,
  NInput,
  NImage,
  NGrid,
  NGi,
  NUpload,
  useMessage
} from 'naive-ui'
import { ref, onMounted } from 'vue'
import axios from '@/utils/axios.js' // ✅ axiosInstance с токеном и baseURL

const message = useMessage()
const photos = ref([])
const selectedFile = ref(null)
const photoName = ref('')

const fetchPhotos = async () => {
  try {
    const res = await axios.get('/images') // ✅ соответствует переименованной таблице
    photos.value = res.data
  } catch (err) {
    message.error('Ошибка загрузки фотографий')
    console.error(err)
  }
}

const onFileChange = ({ file }) => {
  selectedFile.value = file.file
}

const uploadPhoto = async () => {
  if (!selectedFile.value || !photoName.value) {
    message.warning('Выберите файл и введите название')
    return
  }

  const form = new FormData()
  form.append('photo', selectedFile.value)
  form.append('name', photoName.value)

  try {
    const res = await axios.post('/images/upload', form, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    photos.value.unshift(res.data)
    selectedFile.value = null
    photoName.value = ''
    message.success('Фото загружено')
  } catch (err) {
    message.error('Ошибка при загрузке')
    console.error(err)
  }
}

const deletePhoto = async (id) => {
  try {
    await axios.delete(`/images/${id}`)
    photos.value = photos.value.filter(p => p.id !== id)
    message.success('Фото удалено')
  } catch (err) {
    message.error('Ошибка при удалении')
    console.error(err)
  }
}

onMounted(fetchPhotos)
</script>
