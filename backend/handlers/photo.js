import db from '../database/index.js';
import path from 'path';
import fs from 'fs';

class PhotoHandler {
  static async upload(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'Файл не прикреплён' });
      }

      // Используем базовый URL из env или дефолт
      const baseUrl = 'https://xiany.ru/';
      const url = `${baseUrl}/uploads/${req.file.filename}`;
      const name = req.body.name || req.file.originalname;

      const result = await db.query(
        'INSERT INTO images (url, name) VALUES ($1, $2) RETURNING id, url, name',
        [url, name]
      );

      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error('Upload error:', err);
      res.status(500).json({ message: 'Ошибка сервера при загрузке фото' });
    }
  }

  static async getAll(req, res) {
    try {
      const result = await db.query('SELECT id, url, name FROM images ORDER BY id DESC');
      res.json(result.rows);
    } catch (err) {
      console.error('Get all images error:', err);
      res.status(500).json({ message: 'Ошибка сервера при получении фото' });
    }
  }

  static async delete(req, res) {
    const { id } = req.params;
    try {
      // Получаем URL фото
      const photo = await db.query('SELECT url FROM images WHERE id = $1', [id]);
      if (photo.rows.length === 0) {
        return res.status(404).json({ message: 'Фото не найдено' });
      }

      // Удаляем из БД
      await db.query('DELETE FROM images WHERE id = $1', [id]);

      // Получаем имя файла из полного URL (последняя часть пути)
      const filename = path.basename(photo.rows[0].url);

      // Формируем путь к файлу в папке uploads
      const uploadsDir = path.resolve('uploads');
      const filePath = path.join(uploadsDir, filename);

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }

      res.json({ message: 'Удалено' });
    } catch (err) {
      console.error('Delete image error:', err);
      res.status(500).json({ message: 'Ошибка сервера при удалении фото' });
    }
  }
}

export default PhotoHandler;
