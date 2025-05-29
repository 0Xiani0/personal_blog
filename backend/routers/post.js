import { Router } from 'express';
import PostHandler from '../handlers/post.js';
import LikeHandler from '../handlers/like.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = new Router();

// Получить все посты
router.get('/', PostHandler.getAll);

// Получить пост - ОДИН
router.get('/:id', PostHandler.getOne);

// Создать пост
router.post('/', PostHandler.create);

// Обновить пост
router.put('/:id', PostHandler.update);

// Удалить пост
router.delete('/:id', PostHandler.delete);

// Добавить лайк
router.post('/:id/like', authMiddleware, LikeHandler.addLike);

// Удалить лайк
router.delete('/:id/like', authMiddleware, LikeHandler.removeLike);

// Получить количество лайков
router.get('/:id/likes', LikeHandler.getLikesCount);

// Проверить, лайкал ли пользователь пост
router.get('/:id/liked', authMiddleware, LikeHandler.likedByUser);

export default router;