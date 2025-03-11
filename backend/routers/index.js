import { Router } from 'express';
import morgan from 'morgan';
import json from 'morgan-json';
import postRouter from './post.js';
import userRouter from './user.js';
import authRouter from './auth.js';

const router = new Router();
const format = json({
    remote_ip: ':remote-addr',
    remote_user: ':remote-user',
    time: ':date[clf]',
    request: ':method :url HTTP/:http-version',
    status: ':status',
    body_bytes_size: ':res[content-length]',
    referer: ':referrer',
    user_agent: ':user-agent'
});

router.use(morgan(format))

router.use('/posts', postRouter)
router.use('/users', userRouter)
router.use('/auth', authRouter)

export default router;