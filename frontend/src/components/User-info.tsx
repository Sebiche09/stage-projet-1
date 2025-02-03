import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function UserInfo() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [userData, setUserData] = useState<{ id: number; username: string; email: string; phone: string } | null>(null);


  useEffect(() => {
    axios.get(`http://localhost:5000/api/user/${id}`)
      .then(response => {
        setUserData(response.data.data);
      });
  }, [id]);

  const handleDeleteUser = async () => {
    await axios.delete(`http://localhost:5000/api/user/${userData?.id}`);
    alert("Utilisateur supprimé !");
    navigate("/users");
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-md max-w-lg">
      <h1 className="text-3xl font-bold mb-4">{userData?.username}</h1>
      <p className="text-gray-600"><strong>Email :</strong> {userData?.email}</p>
      <p className="text-gray-600"><strong>Téléphone :</strong> {userData?.phone}</p>

      <div className="mt-4 flex gap-4">
        <button onClick={handleDeleteUser} className="px-4 py-2 bg-red-500 text-white rounded-md">Supprimer</button>
      </div>
    </div>
  );
}
