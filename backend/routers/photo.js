import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import PhotoHandler from '../handlers/photo.js';

const router = new Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve('uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

router.post('/upload', upload.single('photo'), PhotoHandler.upload);
router.get('/', PhotoHandler.getAll);
router.delete('/:id', PhotoHandler.delete);

export default router;

