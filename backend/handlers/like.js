import db from '../database/index.js';

const LikeHandler = {
  // Добавить лайк
  async addLike(req, res) {
    try {
      const user_id = req.user.id;
      const post_id = req.params.id;

      if (!post_id) {
        return res.status(400).json({ message: 'post_id обязателен' });
      }

      const postExists = await db.query('SELECT * FROM posts WHERE id = $1', [post_id]);
      if (postExists.rowCount === 0) {
        return res.status(404).json({ message: 'Пост не найден' });
      }

      const existingLike = await db.query(
        'SELECT * FROM likes WHERE user_id = $1 AND post_id = $2',
        [user_id, post_id],
      );

      if (existingLike.rowCount > 0) {
        return res.status(400).json({ message: 'Вы уже поставили лайк' });
      }

      await db.query(
        'INSERT INTO likes (user_id, post_id, created_at) VALUES ($1, $2, NOW())',
        [user_id, post_id],
      );

      res.status(201).json({ message: 'Лайк добавлен' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  },

  // Удалить лайк
  async removeLike(req, res) {
    try {
      const user_id = req.user.id;
      const post_id = req.params.id;

      if (!post_id) {
        return res.status(400).json({ message: 'post_id обязателен' });
      }

      const result = await db.query(
        'DELETE FROM likes WHERE user_id = $1 AND post_id = $2 RETURNING *',
        [user_id, post_id],
      );

      if (result.rowCount === 0) {
        return res.status(404).json({ message: 'Лайк не найден' });
      }

      res.json({ message: 'Лайк удалён' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  },

  // Получить количество лайков
  async getLikesCount(req, res) {
    try {
      const { id } = req.params;
      const result = await db.query(
        'SELECT COUNT(*) FROM likes WHERE post_id = $1',
        [id],
      );

      res.json({ post_id: id, likes: result.rows[0].count });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  },
  // Проверить, лайкнул ли пользователь пост
 async likedByUser(req, res) {
   try {
     const user_id = req.user.id;
     const post_id = req.params.id;

     if (!post_id) {
       return res.status(400).json({ message: 'post_id обязателен' });
     }

     const result = await db.query(
       'SELECT 1 FROM likes WHERE user_id = $1 AND post_id = $2',
       [user_id, post_id]
     );

     res.status(200).json({ liked: result.rowCount > 0 });
   } catch (error) {
     console.error('Ошибка при проверке лайка:', error);
     res.status(500).json({ message: 'Ошибка сервера' });
  }
 }
};

export default LikeHandler;
