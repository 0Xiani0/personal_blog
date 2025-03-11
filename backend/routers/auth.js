import { Router } from 'express';
const router = new Router()
import AuthHandler from '../handlers/auth.js'

router.post('/registration', AuthHandler.registration)
router.post('/login', AuthHandler.login)

export default router