import { useParams, Link } from "react-router-dom";
import UserInfo from "../components/User-info";
import UserPosts from "../components/User-posts";

export default function Profile() {
  const { id } = useParams(); 
  const userId = id ? parseInt(id) : null; 

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      {userId && <UserInfo />}
      {userId && (
        <Link to={`/new-post/${userId}`}>
          <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md">
            Ajouter un post
          </button>
        </Link>
      )}

      {userId && <UserPosts />}
    </div>
  );
}