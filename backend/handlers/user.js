import User from '../models/user.js';

class UserHandler {
  // Получить всех пользователей
  async getAll(req, res) {
    try {
      const usersResult = await User.getAll();
      res.status(200).json(usersResult.rows);
    } catch (error) {
      console.error('Ошибка получения пользователей:', error);
      res.status(500).json({ error: 'Ошибка получения пользователей' });
    }
  }

  // Получить пользователя по ID
  async getById(req, res) {
    try {
      const { id } = req.params;

      // Определяем, это ID или username
      let userResult;
      if (isNaN(Number(id))) {
        userResult = await User.getByLogin(id);
      } else {
        userResult = await User.getById(id);
      }

      if (!userResult || userResult.rowCount === 0) {
        return res.status(404).json({ message: 'Пользователь не найден' });
      }

      const user = userResult.rows[0];
      res.status(200).json(user);
    } catch (error) {
      console.error('Ошибка получения пользователя:', error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }

  // Создать нового пользователя
  async create(req, res) {
    try {
      const {
        username, email, password_hash, role_name,
      } = req.body;

      const newUser = new User(username, email, password_hash, role_name);
      const result = await newUser.create();

      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Ошибка создания пользователя:', error);
      res.status(500).json({ error: 'Не удалось создать пользователя' });
    }
  }

  // Обновить данные пользователя
  async update(req, res) {
    try {
      const { id } = req.params;
      const {
        username, email, password_hash, role_id,
      } = req.body;

      const updatedUser = await User.update(id, {
        username, email, password_hash, role_id,
      });

      if (!updatedUser.rows.length) {
        return res.status(404).json({ error: 'Пользователь не найден' });
      }

      res.status(200).json(updatedUser.rows[0]);
    } catch (error) {
      console.error('Ошибка обновления пользователя:', error);
      res.status(500).json({ error: 'Не удалось обновить пользователя' });
    }
  }

  // Удалить пользователя
  async delete(req, res) {
    try {
      const { id } = req.params;
      const deletedUser = await User.delete(id);

      if (!deletedUser.rows.length) {
        return res.status(404).json({ error: 'Пользователь не найден' });
      }

      res.status(200).json(deletedUser.rows[0]);
    } catch (error) {
      console.error('Ошибка удаления пользователя:', error);
      res.status(500).json({ error: 'Не удалось удалить пользователя' });
    }
  }
}

export default new UserHandler();
