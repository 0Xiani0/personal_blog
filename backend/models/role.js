import db from '../database/index.js';

export default class User {
    constructor(id, username, email, password_hash, role_id, role_name) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password_hash = password_hash;
        this.role_id = role_id;
        this.role_name = role_name;
    }

    static async get() {
        return await db.query(
            `SELECT 
                users.id,
                users.username,
                users.email,
                users.password_hash,
                users.role_id,
                (SELECT name FROM roles WHERE roles.id = users.role_id) AS role_name
             FROM users`
        );
    }
}
