import Tag from '../models/tag.js';

class TagHandler {
  // Получить все теги
  async getAll(req, res) {
    try {
      const tags = await Tag.getAll();
      res.status(200).json(tags.rows);
    } catch (error) {
      console.error('Ошибка получения тегов:', error);
      res.status(500).json({ error: 'Ошибка получения тегов' });
    }
  }

  // Получить теги для поста
  async getTagsByPost(req, res) {
    const { postId } = req.params;
    try {
      const tags = await Tag.getTagsForPost(postId);
      res.status(200).json(tags);
    } catch (error) {
      console.error('Ошибка получения тегов для поста:', error);
      res.status(500).json({ error: 'Ошибка получения тегов для поста' });
    }
  }

  // Добавить тег к посту
  async addTagToPost(req, res) {
    const { postId, tagName } = req.body;
    const userId = req.user.id; // Получаем userId из токена

    if (!postId || !tagName) {
      return res.status(400).json({ error: 'Необходимо передать postId и tagName' });
    }

    try {
      // Создаём тег, если его нет
      const tag = await Tag.create(tagName);
      // Привязываем тег к посту
      await Tag.addTagToPost(postId, tag.id);
      res.status(201).json({ message: 'Тег успешно добавлен к посту' });
    } catch (error) {
      console.error('Ошибка добавления тега к посту:', error);
      res.status(500).json({ error: 'Ошибка добавления тега к посту' });
    }
  }

  // Удалить тег с поста
  async removeTagFromPost(req, res) {
    const { postId, tagName } = req.body;
    const userId = req.user.id; // Получаем userId из токена

    if (!postId || !tagName) {
      return res.status(400).json({ error: 'Необходимо передать postId и tagName' });
    }

    try {
      // Получаем id тега по имени
      const tag = await Tag.getByName(tagName);
      if (!tag) {
        return res.status(404).json({ error: 'Тег не найден' });
      }

      // Удаляем привязку тега к посту
      await Tag.removeTagsFromPost(postId);
      res.status(200).json({ message: 'Тег успешно удален с поста' });
    } catch (error) {
      console.error('Ошибка удаления тега с поста:', error);
      res.status(500).json({ error: 'Ошибка удаления тега с поста' });
    }
  }
}

export default new TagHandler();
