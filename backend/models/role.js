import db from '../database/index.js';

export default class Role {
  // Получить все роли
  static async getAll() {
    const result = await db.query('SELECT id, name FROM roles ORDER BY id');
    return result.rows;
  }

  // Получить роль по id
  static async getById(id) {
    const result = await db.query('SELECT id, name FROM roles WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  // Получить роль по имени
  static async getByName(name) {
    const result = await db.query('SELECT id, name FROM roles WHERE name = $1', [name]);
    return result.rows[0] || null;
  }

  // Создать новую роль
  static async create(name) {
    const result = await db.query(
      'INSERT INTO roles (name) VALUES ($1) RETURNING id, name',
      [name]
    );
    return result.rows[0];
  }

  // Обновить имя роли по id
  static async update(id, name) {
    const result = await db.query(
      'UPDATE roles SET name = $1 WHERE id = $2 RETURNING id, name',
      [name, id]
    );
    return result.rows[0] || null;
  }

  // Удалить роль по id
  static async delete(id) {
    await db.query('DELETE FROM roles WHERE id = $1', [id]);
  }
}
