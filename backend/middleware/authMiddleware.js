import jwt from 'jsonwebtoken';

export default function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Нет доступа. Токен отсутствует.' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Нет доступа. Токен отсутствует.' });
  }

  try {
    const decoded = jwt.verify(token, 'SECRET_KEY_RANDOM');
    console.log('decoded token:', decoded);

    // Добавляем поле isAdmin для удобства
    decoded.isAdmin = decoded.role_name === 'Admin';

    req.user = decoded;
    next();
  } catch (e) {
    return res.status(403).json({ message: 'Ошибка проверки токена.' });
  }
}
