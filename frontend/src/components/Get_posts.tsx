import axios from 'axios';
import { useState, useEffect } from 'react';

export default function GetPosts() {
  const [posts, setPosts] = useState<{ id: number; title: string; body: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then((response: { data: { id: number; title: string; body: string }[] }) => {
        setPosts(response.data);
        console.log(response.data);
        setLoading(false);
      })
      .catch((error: Error) => {
        console.error('Une erreur est survenue :', error);
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Chargement...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">Erreur de chargement.</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Liste des Posts</h1>
      <div className="w-full max-w-2xl">
        {posts.map((post) => (
          <div key={post.id} className="p-4 bg-white shadow-md rounded-md mb-2">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-gray-600">{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
