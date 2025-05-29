import Post from '../models/post.js';

class PostHandler {
  // Получить все посты
  async getAll(req, res) {
    try {
      const currentUserId = req.user?.id || null;  // Получаем ID пользователя
      const posts = await Post.get(currentUserId);  // Передаем в метод get
      res.status(200).json(posts);  // Отправляем данные
    } catch (error) {
      console.error('Ошибка получения постов:', error);
      res.status(500).json({ error: 'Ошибка получения постов' });
    }
  }

  // Получить один пост по id
 async getOne(req, res) {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ error: 'Некорректный ID поста' });
    }

    const currentUserId = req.user?.id || null;  // Получаем id текущего пользователя, если авторизован
    const post = await Post.getOne(id, currentUserId);  // Передаем currentUserId

    if (!post) {
      return res.status(404).json({ error: 'Пост не найден' });
    }

    res.status(200).json(post);
  } catch (error) {
    console.error('Ошибка получения поста:', error);
    res.status(500).json({ error: 'Ошибка получения поста' });
  }
}


  // Создать пост
  async create(req, res) {
    const { heading, description, userId } = req.body;
    if (!heading || !description || !userId) {
      return res.status(400).json({ error: 'Некорректные данные для создания поста' });
    }

    try {
      const newPost = await Post.create({ heading, description, userId });
      res.status(201).json(newPost);
    } catch (error) {
      console.error('Ошибка создания поста:', error);
      res.status(500).json({ error: 'Ошибка создания поста' });
    }
  }

  // Обновить пост
  async update(req, res) {
    console.log('Получен запрос на обновление поста:', req.body);
    const { id, heading, description } = req.body;
    if (!id || !heading || !description) {
      return res.status(400).json({ error: 'Некорректные данные для обновления поста' });
    }

    try {
      const updatedPost = await Post.update({ id, heading, description });
      res.status(200).json(updatedPost);
    } catch (error) {
      console.error('Ошибка обновления поста:', error);
      res.status(500).json({ error: 'Ошибка обновления поста' });
    }
  }

  // Удалить пост
  async delete(req, res) {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'Некорректный ID для удаления поста' });
    }

    try {
      const result = await Post.delete(id);
      res.status(200).json(result);
    } catch (error) {
      console.error('Ошибка удаления поста:', error);
      res.status(500).json({ error: 'Ошибка удаления поста' });
    }
  }
}

export default new PostHandler();
