import { Router } from 'express';
import CommentHandler from '../handlers/comment.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = new Router();

// Получить все комментарии для поста — без авторизации, открыто
router.get('/posts/:postId/comments', CommentHandler.getAllComments);

// Добавить комментарий — только авторизованные пользователи
router.post('/posts/:postId/comments', authMiddleware, CommentHandler.addComment);

// Удалить комментарий — только владелец или админ (проверка прав внутри хендлера)
router.delete('/comments/:commentId', authMiddleware, CommentHandler.deleteComment);

export default router;
