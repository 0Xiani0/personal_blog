import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
const generateAccessToken = (id, username, role) => {
    const payload = {
        id,
        username,
        role
    };
    return jwt.sign(payload, "SECRET_KEY_RANDOM", {expiresIn:"24h"})

}
class AuthHandler {
    async registration(req, res) {
        try {
            const {login, email, password} = req.body
            const candidate = await User.getByLogin(login)
            console.log(candidate.rowCount)
            if (candidate.rowCount != 0) {
                return res.status(400).json({message: "Пользователь с таким именем существует"})
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const user = new User(login, email, hashPassword, 'User')
            user.create();
            return res.json({Message: "Пользователь успешно зарегестрирован "})
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
                return res.status(400).json({ message: `Пользователь с логином или почтой "${login}" не найден` });
            }
    
            const user = userResult.rows[0];
            if (!user.password_hash) {
                return res.status(500).json({ message: 'У пользователя отсутствует пароль' });
            }
    
            const validPassword = bcrypt.compareSync(password, user.password_hash);
            if (!validPassword) {
                return res.status(400).json({ message: 'Неверный пароль' });
            }
    
            const token = generateAccessToken(user.id, user.username, user.role_id);
            return res.json({ token });
        } catch (e) {
            console.error('Ошибка при входе:', e);
            res.status(500).json({ message: 'Ошибка сервера' });
        }
    }
}

export default new AuthHandler();
