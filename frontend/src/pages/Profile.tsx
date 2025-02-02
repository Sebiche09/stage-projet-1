import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUser, getPosts } from "../api";
import UserInfo from "../components/User-info";
import UserPosts from "../components/User-posts";

export default function Profile() {
  const { id } = useParams();
  const [user, setUser] = useState<{ id: number; name: string; email: string; phone: string; website: string } | null>(null);
  const [posts, setPosts] = useState<{ id: number; title: string; body: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const userData = await getUser(id as string);
        const userPosts = await getPosts(id as string);
        setUser(userData);
        setPosts(userPosts);
      } catch (error) {
        console.error("Erreur lors du chargement :", error);
        setError("Impossible de charger les données.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Chargement...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      {user && <UserInfo user={user} />}
      {posts.length > 0 && <UserPosts posts={posts} />}
    </div>
  );
}
