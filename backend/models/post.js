import db from '../database/index.js';

export default class Post {
  constructor(heading, description, create_datetime, author_id, author_username) {
    this.heading = heading;
    this.description = description;
    this.create_datetime = create_datetime;
    this.author_id = author_id;
    this.author_username = author_username;
  }

  // Получить все посты
  static async get() {
    return await db.query(
      `SELECT 
        id, 
        heading,
        description,
        created_at,
        updated_at,
        user_id AS author_id,
        (SELECT username FROM users WHERE users.id = posts.user_id) AS author_username
      FROM posts`
    );
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
    await db.query(`DELETE FROM posts WHERE id = $1`, [id]);
    return { message: 'Post deleted successfully' };
  }
}

