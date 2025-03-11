import { Router } from 'express';
import PostHandler from '../handlers/post.js';

const router = new Router();

// Получить все посты
router.get('/', PostHandler.getAll);

// Создать пост
router.post('/', PostHandler.create);

// Обновить пост
router.put('/:id', PostHandler.update);

// Удалить пост
router.delete('/:id', PostHandler.delete);

export default router;
