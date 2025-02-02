import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; 

export default function Profile() {
  const [users, setUsers] = useState<{ id: number; name: string; email: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users")
      .then(response => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Une erreur est survenue :", error);
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Chargement...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">Erreur de chargement des utilisateurs.</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-2xl">
        {users.map((user) => (
          <div key={user.id} className="p-4 bg-white shadow-md rounded-md mb-2">
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
            <Link to={`/profile/${user.id}`}>
                <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md">Voir le profil</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
