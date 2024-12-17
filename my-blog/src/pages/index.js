// src/pages/index.js

import React, { useState } from 'react';
import CreatePost from '../components/CreatePost';

export async function getServerSideProps() {
  // Отримуємо пости кожного разу при запиті сторінки
  const res = await fetch('http://localhost:3000/api/posts');
  const posts = await res.json();

  return {
    props: { posts },
  };
}

const HomePage = ({ posts }) => {
  const [postsList, setPostsList] = useState(posts);

  const handleNewPost = (newPost) => {
    setPostsList((prevPosts) => [...prevPosts, newPost]);
  };

  return (
    <div>
      <h1>Головна сторінка</h1>
      <CreatePost onNewPost={handleNewPost} />
      <ul>
  {postsList.map((post) => (
    <li key={post.id} className="bg-white shadow-md rounded-lg p-6 my-4">
      <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
      <p className="text-base text-gray-600">{post.content}</p>
    </li>
  ))}
</ul>

    </div>
  );
};

export default HomePage;
