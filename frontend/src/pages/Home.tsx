import { Link } from "react-router-dom";
import GetPosts from "../components/Get_posts";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Bienvenue sur l'App</h1>
      <Link to="/users" className="px-4 py-2 bg-blue-500 text-white rounded-md">
        Aller aux utilisateurs
      </Link>
      <GetPosts />
    </div>
  );
}
