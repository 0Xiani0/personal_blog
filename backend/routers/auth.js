import { Router } from 'express';
import AuthHandler from '../handlers/auth.js';

const router = new Router();

router.post('/registration', AuthHandler.registration);
router.post('/login', AuthHandler.login);

export default router;
