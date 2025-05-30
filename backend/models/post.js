import db from '../database/index.js';

export default class Post {
  constructor(heading, description, created_at, updated_at, author_id, author_username) {
    this.heading = heading;
    this.description = description;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.author_id = author_id;
    this.author_username = author_username;
  }

  // Получить все посты
  static async get(currentUserId = null) {
    const result = await db.query(
      `SELECT 
        posts.id, 
        posts.heading,
        posts.description,
        posts.created_at,
        posts.updated_at,
        posts.user_id AS author_id,
        (SELECT username FROM users WHERE users.id = posts.user_id) AS author_username,
        (SELECT COUNT(*) FROM likes WHERE likes.post_id = posts.id) AS like_count,
        CASE 
          WHEN $1::INTEGER IS NOT NULL THEN EXISTS (
            SELECT 1 FROM likes WHERE likes.post_id = posts.id AND likes.user_id = $1::INTEGER
          )
          ELSE false
        END AS liked_by_user
      FROM posts`,
      [currentUserId]
    );
    return result.rows;
  }

  // Получить один пост по ID
  static async getOne(id, currentUserId = null) {
    const result = await db.query(
      `SELECT 
        posts.id, 
        posts.heading,
        posts.description,
        posts.created_at,
        posts.updated_at,
        posts.user_id AS author_id,
        (SELECT username FROM users WHERE users.id = posts.user_id) AS author_username,
        (SELECT COUNT(*) FROM likes WHERE likes.post_id = posts.id) AS like_count,
        CASE 
          WHEN $2::INTEGER IS NOT NULL THEN EXISTS (
            SELECT 1 FROM likes WHERE likes.post_id = posts.id AND likes.user_id = $2::INTEGER
          )
          ELSE false
        END AS liked_by_user
      FROM posts
      WHERE posts.id = $1`,
      [id, currentUserId]
    );

    return result.rows[0] || null;
  }

  // Создать новый пост
  static async create({ heading, description, userId }) {
    const result = await db.query(
      `INSERT INTO posts (heading, description, user_id)
      VALUES ($1, $2, $3)
      RETURNING id, heading, description, created_at, updated_at, user_id AS author_id`,
      [heading, description, userId]
    );
    return result.rows[0];
  }

  // Обновить существующий пост
  static async update({ id, heading, description }) {
    const result = await db.query(
      `UPDATE posts
      SET heading = $1, description = $2, updated_at = NOW()
      WHERE id = $3
      RETURNING id, heading, description, created_at, updated_at, user_id AS author_id`,
      [heading, description, id]
    );
    return result.rows[0];
  }

  // Удалить пост
  static async delete(id) {
    await db.query('DELETE FROM posts WHERE id = $1', [id]);
    return { message: 'Post deleted successfully' };
  }
}
