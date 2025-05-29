import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const generateAccessToken = (id, username, roleName) => {
  const payload = {
    id,
    username,
    role: roleName, // передаём строку "Admin" или "User"
  };
  return jwt.sign(payload, 'SECRET_KEY_RANDOM', { expiresIn: '24h' });
};

class AuthHandler {
  async registration(req, res) {
    try {
      const { login, email, password } = req.body;
      const candidate = await User.getByLogin(login);

      if (candidate.rowCount !== 0) {
        return res.status(400).json({ message: 'Пользователь с таким именем существует' });
      }

      const hashPassword = bcrypt.hashSync(password, 7);
      const user = new User(login, email, hashPassword, 'User'); // 'User' как строка роли
      await user.create();

      return res.json({ message: 'Пользователь успешно зарегистрирован' });
    } catch (e) {
      console.error('Ошибка при регистрации: ', e);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }

  async login(req, res) {
    try {
      const { login, password } = req.body;

      if (!login || !password) {
        return res.status(400).json({ message: 'Логин или пароль не переданы' });
      }

      const userResult = await User.getByLogin(login);
      if (!userResult || userResult.rowCount === 0) {
        return res.status(400).json({ message: `Пользователь с логином "${login}" не найден` });
      }

      const user = userResult.rows[0];
      if (!user.password_hash) {
        return res.status(500).json({ message: 'У пользователя отсутствует пароль' });
      }

      const validPassword = bcrypt.compareSync(password, user.password_hash);
      if (!validPassword) {
        return res.status(400).json({ message: 'Неверный пароль' });
      }

      // предполагается, что role_name доступен в user (например, через JOIN при запросе)
      const roleName = user.role_name || 'User'; // fallback если нет role_name

      const token = generateAccessToken(user.id, user.username, roleName);

      return res.json({
        token,
        user: {
          id: user.id,
          username: user.username,
          role: roleName,
          isAdmin: roleName === 'Admin'
        }
      });
    } catch (e) {
      console.error('Ошибка при входе:', e);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }
}

export default new AuthHandler();
