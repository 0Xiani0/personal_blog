import { Router } from 'express';
import UserHandler from '../handlers/user.js';

const router = new Router();

// Получить список всех пользователей
router.get('/', UserHandler.getAll);

// Получить пользователя по ID
router.get('/:id', UserHandler.getById);

// Создать нового пользователя
router.post('/', UserHandler.create);

// Обновить данные пользователя
router.put('/:id', UserHandler.update);

// Удалить пользователя
router.delete('/:id', UserHandler.delete);

export default router;