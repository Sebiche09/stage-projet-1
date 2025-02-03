import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; 

export default function Profile() {
  const [users, setUsers] = useState<{ id: number; username: string; email: string }[]>([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/user/all")
      .then(response => {
        console.log("Réponse API :", response.data); 
        setUsers(response.data.data); 
      })
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-2xl">
        {users.map((user) => (
          <div key={user.id} className="p-4 bg-white shadow-md rounded-md mb-2">
            <h2 className="text-xl font-semibold">{user.username}</h2>
            <Link to={`/profile/${user.id}`}>
                <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md">Voir le profil</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
