// src/components/CreatePost.js

import { useState } from 'react';

const CreatePost = ({ onNewPost }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Перевірка на наявність заголовка та контенту
    if (!title || !content) {
      setError('Будь ласка, заповніть всі поля.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('http://localhost:3000/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      });

      if (!res.ok) {
        throw new Error('Не вдалося додати пост. Спробуйте ще раз пізніше.');
      }

      const newPost = await res.json();
      onNewPost(newPost);

      setTitle('');
      setContent('');
    } catch (err) {
      setError(err.message || 'Щось пішло не так.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-3xl mx-auto mt-8">
      <h2 className="text-center text-xl font-semibold">Додати новий пост</h2>
      {error && <p className="text-red-500 font-bold mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="mb-4">
          <label htmlFor="title" className="block mb-2">Заголовок:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="p-3 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block mb-2">Контент:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="p-3 border border-gray-300 rounded-md w-full"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="py-3 px-6 bg-green-500 text-white rounded-md font-semibold cursor-pointer transition-all duration-300 disabled:bg-gray-300"
        >
          {loading ? 'Завантаження...' : 'Додати пост'}
        </button>
      </form>
    </div>
  );
};


export default CreatePost;
