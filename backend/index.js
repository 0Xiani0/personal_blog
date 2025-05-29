import express from 'express';
import cors from 'cors';
import path from 'path';

import router from './routers/index.js';

const PORT = 8081;
const app = express();

// Разрешаем JSON и CORS
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:8080', // адрес твоего фронтенда
  credentials: true                // разрешаем куки и заголовки авторизации
}));


// Отдаём статичные файлы из папки uploads
app.use('/uploads', express.static(path.resolve('uploads')));

// Используем основной роутер с префиксом /api
app.use('/api', router);

function start() {
  try {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (error) {
    console.error(error);
  }
}

start();
