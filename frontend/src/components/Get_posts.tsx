import axios from 'axios';
import { useState, useEffect } from 'react';

export default function GetPosts() {
  const [posts, setPosts] = useState<{ id: number; description: string; like: number; userId: number; username: string; }[]>([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/post/all')
      .then((response) => {
        setPosts(response.data.data);
      })
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Liste des Posts</h1>
      <div className="w-full max-w-2xl">
        {posts.map((post) => (
          <div key={post.id} className="p-4 bg-white shadow-md rounded-md mb-2">
            <h2 className="text-xl font-semibold">{post.description}</h2>
            <p className="text-gray-600">{post.like}</p>
            <p className="text-gray-600">{post.username}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
