import { useState } from "react";
import axios from "axios";

export default function AddUser() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newUser = { username, email, phone };

    const response = await axios.post("http://localhost:5000/api/user", newUser);
    console.log("Utilisateur ajouté :", response.data);
    setMessage("Utilisateur ajouté avec succès !");
    setUsername("");
    setEmail("");
    setPhone("");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">

      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-md w-80">
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Nom</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Téléphone</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Ajouter
        </button>
      </form>

      {message && <p className="mt-4 text-green-500">{message}</p>}
    </div>
  );
}
