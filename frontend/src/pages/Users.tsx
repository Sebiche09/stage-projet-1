import GetUsers from "../components/Get_users";
import { Link } from "react-router-dom"; 
export default function Users() {


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Liste des Utilisateurs</h1>
      <Link to={`/`}>
                <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md">retour aux posts</button>
      </Link>
      <Link to={`/new-user/`}>
                <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md">Ajouter un utilisateur</button>
      </Link>
      <GetUsers />
    </div>
  );
}
