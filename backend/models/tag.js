import db from '../database/index.js';

export default class Tag {
  // Получить все теги
  static async getAll() {
    const result = await db.query('SELECT id, name FROM tags');
    return result.rows;
  }

  // Создать тег (если не существует)
  static async create(name) {
    const existing = await db.query('SELECT * FROM tags WHERE name = $1', [name]);
    if (existing.rows.length > 0) {
      return existing.rows[0]; // Возвращаем существующий тег, если он есть
    }

    const result = await db.query(
      'INSERT INTO tags (name) VALUES ($1) RETURNING id, name',
      [name],
    );
    return result.rows[0];
  }

  // Привязать тег к посту
  static async addTagToPost(postId, tagId) {
    await db.query('INSERT INTO post_tags (post_id, tag_id) VALUES ($1, $2) ON CONFLICT DO NOTHING', [postId, tagId]);
  }

  // Получить теги для поста
  static async getTagsForPost(postId) {
    const result = await db.query(
      `SELECT t.id, t.name
       FROM tags t
       JOIN post_tags pt ON pt.tag_id = t.id
       WHERE pt.post_id = $1`,
      [postId],
    );
    return result.rows;
  }

  // Удалить все теги у поста
  static async removeTagsFromPost(postId) {
    await db.query('DELETE FROM post_tags WHERE post_id = $1', [postId]);
  }

  // Удалить тег у поста
  static async removeTagFromPost(postId, tagId) {
    await db.query('DELETE FROM post_tags WHERE post_id = $1 AND tag_id = $2', [postId, tagId]);
  }

  // Получить тег по имени
  static async getByName(name) {
    const result = await db.query('SELECT id, name FROM tags WHERE name = $1', [name]);
    return result.rows[0]; // Возвращаем первый тег по имени
  }
}
