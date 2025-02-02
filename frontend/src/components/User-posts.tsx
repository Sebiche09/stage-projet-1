import { useState } from "react";
import { putPost, deletePost } from "../api";

export default function UserPosts({ posts }: { posts: { id: number; title: string; body: string }[] }) {
  const [postList, setPostList] = useState(posts);

  const handleEditPost = async (postId: number) => {
    const newTitle = prompt("Entrez le nouveau titre du post :");
    if (newTitle) {
      const updatedPost = await putPost(postId, { title: newTitle });
      setPostList(postList.map((post) => (post.id === postId ? { ...post, title: updatedPost.title } : post)));
    }
  };

  const handleDeletePost = async (postId: number) => {
    await deletePost(postId);
    setPostList(postList.filter((post) => post.id !== postId));
  };

  return (
    <div className="w-full max-w-2xl">
      <h2 className="text-2xl font-bold mt-6">Posts de l'utilisateur</h2>
      {postList.map((post) => (
        <div key={post.id} className="p-4 bg-white shadow-md rounded-md mb-2">
          <h3 className="text-lg font-semibold">{post.title}</h3>
          <p className="text-gray-600">{post.body}</p>
          <div className="mt-2 flex gap-4">
            <button onClick={() => handleEditPost(post.id)} className="px-4 py-2 bg-yellow-500 text-white rounded-md">Modifier</button>
            <button onClick={() => handleDeletePost(post.id)} className="px-4 py-2 bg-red-500 text-white rounded-md">Supprimer</button>
          </div>
        </div>
      ))}
    </div>
  );
}
