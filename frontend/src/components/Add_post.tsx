import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function AddUser() {
    const { id } = useParams(); 
    const userId = id ? parseInt(id) : null;
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newPost = { description, userId };

        const response = await axios.post("http://localhost:5000/api/post", newPost);
        console.log("Post ajouté :", response.data);
        setMessage("Post ajouté avec succès !");
        setDescription("");
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">

        <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-md w-80">
            <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Description</label>
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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
