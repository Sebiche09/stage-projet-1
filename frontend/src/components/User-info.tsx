import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { putUser, deleteUser } from "../api";

export default function UserInfo({ user }: { user: { id: number; name: string; email: string; phone: string; website: string } }) {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(user);

  const handleEditUser = async () => {
    const newName = prompt("Entrez un nouveau nom :", userData.name);
    if (newName) {
      const updatedUser = await putUser(userData.id.toString(), { ...userData, name: newName });
      setUserData(updatedUser);
    }
  };

  const handleDeleteUser = async () => {
    await deleteUser(userData.id.toString());
    alert("Utilisateur supprimé !");
    navigate("/users");
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-md max-w-lg">
      <h1 className="text-3xl font-bold mb-4">{userData.name}</h1>
      <p className="text-gray-600"><strong>Email :</strong> {userData.email}</p>
      <p className="text-gray-600"><strong>Téléphone :</strong> {userData.phone}</p>
      <p className="text-gray-600"><strong>Site web :</strong> {userData.website}</p>

      <div className="mt-4 flex gap-4">
        <button onClick={handleEditUser} className="px-4 py-2 bg-yellow-500 text-white rounded-md">Modifier</button>
        <button onClick={handleDeleteUser} className="px-4 py-2 bg-red-500 text-white rounded-md">Supprimer</button>
      </div>
    </div>
  );
}
