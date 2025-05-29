import db from '../database/index.js';

export default class User {
  constructor(username, email, password_hash, role_name) {
    this.username = username;
    this.email = email;
    this.password_hash = password_hash;
    this.role_name = role_name;
  }

  // Получить всех пользователей
  static async getAll() {
    return await db.query(`
            SELECT 
                users.id,
                users.username,
                users.email,
                users.role_id,
                roles.name AS role_name
            FROM users
            LEFT JOIN roles ON roles.id = users.role_id
        `);
  }

  // Получить пользователя по ID
  static async getById(id) {
    return await db.query(`
            SELECT 
                users.id,
                users.username,
                users.email,
                users.password_hash,
                users.role_id,
                roles.name AS role_name
            FROM users
            LEFT JOIN roles ON roles.id = users.role_id
            WHERE users.id = $1
        `, [id]);
  }

  static async getByLogin(login) {
    return await db.query(`
            SELECT 
                users.id,
                users.username,
                users.email,
                users.password_hash,
                users.role_id,
                roles.name AS role_name
            FROM users
            LEFT JOIN roles ON roles.id = users.role_id
            WHERE users.username = $1 OR users.email = $1
        `, [login]);
  }

  // Создать пользователя
  async create() {
    return await db.query(`
            INSERT INTO users (username, email, password_hash, role_id)
            VALUES ($1, $2, $3, (SELECT id FROM roles WHERE name = $4))
            RETURNING id, username, email, role_id
        `, [this.username, this.email, this.password_hash, this.role_name]);
  }

  // Обновить данные пользователя
  static async update(id, {
    username, email, password_hash, role_id,
  }) {
    return await db.query(`
            UPDATE users
            SET 
                username = COALESCE($1, username),
                email = COALESCE($2, email),
                password_hash = COALESCE($3, password_hash),
                role_id = COALESCE($4, role_id),
                updated_at = NOW()
            WHERE id = $5
            RETURNING id, username, email, role_id
        `, [username, email, password_hash, role_id, id]);
  }

  // Удалить пользователя
  static async delete(id) {
    return await db.query(`
            DELETE FROM users
            WHERE id = $1
            RETURNING id, username
        `, [id]);
  }
}
