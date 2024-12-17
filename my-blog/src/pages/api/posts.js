// src/pages/api/posts.js

let posts = [
  { id: 1, title: 'Перше повідомлення', content: 'Контент першого повідомлення' },
  { id: 2, title: 'Друге повідомлення', content: 'Контент другого повідомлення' },
];

export default function handler(req, res) {
  if (req.method === 'GET') {
    // Повертаємо всі пости
    return res.status(200).json(posts);
  }

  if (req.method === 'POST') {
    const { title, content } = req.body;

    // Перевірка на наявність даних у запиті
    if (!title || !content) {
      return res.status(400).json({ message: 'Заголовок та контент є обов\'язковими.' });
    }

    // Створення нового поста
    const newPost = {
      id: posts.length + 1,
      title,
      content,
    };

    // Додавання нового поста до масиву
    posts.push(newPost);

    return res.status(201).json(newPost); // Повертаємо доданий пост
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}
