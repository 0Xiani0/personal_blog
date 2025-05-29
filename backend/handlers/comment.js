import db from '../database/index.js';

const CommentHandler = {
  async getAllComments(req, res) {
    const { postId } = req.params;
    if (!postId || isNaN(postId)) {
      return res.status(400).json({ message: 'Неверный ID поста' });
    }
    try {
      const comments = await db.query(
        `SELECT c.*, u.username AS author_username
         FROM comments c
         JOIN users u ON c.user_id = u.id
         WHERE c.post_id = $1
         ORDER BY c.created_at DESC`,
        [postId]
      );
      res.status(200).json(comments.rows);
    } catch (error) {
      console.error('Ошибка получения комментариев:', error);
      res.status(500).json({ message: 'Ошибка получения комментариев', error: error.message });
    }
  },

  async addComment(req, res) {
    const { postId } = req.params;
    const { text } = req.body;
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: 'Необходима авторизация' });
    }
    if (!postId || isNaN(postId)) {
      return res.status(400).json({ message: 'Неверный ID поста' });
    }
    if (!text || text.trim().length < 2 || text.length > 1000) {
      return res.status(400).json({ message: 'Комментарий должен содержать от 2 до 1000 символов' });
    }
    try {
      const post = await db.query('SELECT id FROM posts WHERE id = $1', [postId]);
      if (post.rows.length === 0) {
        return res.status(404).json({ message: 'Пост не найден' });
      }
      const newComment = await db.query(
        `INSERT INTO comments (post_id, user_id, text)
         VALUES ($1, $2, $3)
         RETURNING *,
           (SELECT username FROM users WHERE id = $2) AS author_username`,
        [postId, userId, text.trim()]
      );
      res.status(201).json(newComment.rows[0]);
    } catch (error) {
      console.error('Ошибка добавления комментария:', error);
      res.status(500).json({ message: 'Ошибка добавления комментария', error: error.message });
    }
  },

  async deleteComment(req, res) {
    const { commentId } = req.params;
    const userId = req.user?.id;
    const userRole = req.user?.role;      // строка, например 'Admin'
    const userRoleId = req.user?.role_id; // число, например 2

    if (!userId) {
      return res.status(401).json({ message: 'Необходима авторизация' });
    }
    if (!commentId || isNaN(commentId)) {
      return res.status(400).json({ message: 'Неверный ID комментария' });
    }

    try {
      const commentRes = await db.query(
        'SELECT user_id FROM comments WHERE id = $1',
        [commentId]
      );
      if (commentRes.rows.length === 0) {
        return res.status(404).json({ message: 'Комментарий не найден' });
      }

      const ownerId = commentRes.rows[0].user_id;

      // Проверяем, является ли пользователь админом или владельцем комментария
      const isAdmin = userRole === 'Admin' || userRoleId === 2;
      if (ownerId !== userId && !isAdmin) {
        return res.status(403).json({ message: 'Недостаточно прав' });
      }

      await db.query('DELETE FROM comments WHERE id = $1', [commentId]);
      res.status(200).json({ message: 'Комментарий удален' });
    } catch (error) {
      console.error('Ошибка удаления комментария:', error);
      res.status(500).json({ message: 'Ошибка удаления комментария', error: error.message });
    }
  }
};

export default CommentHandler;
