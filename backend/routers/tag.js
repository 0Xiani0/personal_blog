import { Router } from 'express';
import TagHandler from '../handlers/tag.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = new Router();

router.get('/', TagHandler.getAll);
router.get('/posts/:postId', TagHandler.getTagsByPost);
router.post('/add', authMiddleware, TagHandler.addTagToPost);
router.delete('/remove', authMiddleware, TagHandler.removeTagFromPost);

export default router;
