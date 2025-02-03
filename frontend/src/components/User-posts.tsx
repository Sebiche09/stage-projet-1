import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function UserPosts() {
  const { id } = useParams(); 
  const userId = id ? parseInt(id) : null;
  const [posts, setPosts] = useState<{ id: number; description: string; like: number; userId: number; username: string }[]>([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/post/user/${userId}`)
      .then((response) => {
        setPosts(response.data.data || []);
        console.log("Réponse API :", response.data);
      })
  }, [userId]);

  const handleEditPost = async (postId: number) => {
    const newDescription = prompt("Entrez le nouveau texte du post :");
    if (newDescription) {
      const response = await axios.put(`http://localhost:5000/api/post/${postId}`, { description: newDescription });
      setPosts(posts.map((post) => (post.id === postId ? { ...post, description: response.data.data.description } : post)));
    }
  };

  const handleDeletePost = async (postId: number) => {
    await axios.delete(`http://localhost:5000/api/post/${postId}`);
    setPosts(posts.filter((post) => post.id !== postId));
  };
  return (
    <div className="w-full max-w-2xl">
      <h2 className="text-2xl font-bold mt-6">Posts de l'utilisateur</h2>
      {posts.length === 0 ? (
        <p className="text-gray-600 mt-4">Cet utilisateur n'a pas encore posté.</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="p-4 bg-white shadow-md rounded-md mb-2">
            <h3 className="text-lg font-semibold">{post.description}</h3>
            <p className="text-gray-600">{post.like} likes</p>
            <p className="text-gray-600">Posté par : {post.username}</p>
            <div className="mt-2 flex gap-4">
              <button onClick={() => handleEditPost(post.id)} className="px-4 py-2 bg-yellow-500 text-white rounded-md">Modifier</button>
              <button onClick={() => handleDeletePost(post.id)} className="px-4 py-2 bg-red-500 text-white rounded-md">Supprimer</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
