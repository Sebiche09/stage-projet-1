import axios from "axios";

// Récupérer un utilisateur
export const getUser = async (id: string) => {
  const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
  return response.data;
};

// Récupérer les posts d'un utilisateur
export const getPosts = async (id: string) => {
  const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}/posts`);
  return response.data;
};

// Modifier un utilisateur
export const putUser = async (id: string, updatedUser: object) => {
  const response = await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, updatedUser);
  return response.data;
};

// Modifier un post
export const putPost = async (postId: number, updatedPost: object) => {
  const response = await axios.put(`https://jsonplaceholder.typicode.com/posts/${postId}`, updatedPost);
  return response.data;
};

// Supprimer un utilisateur
export const deleteUser = async (id: string) => {
  const response = await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
  return response.data;
};

// Supprimer un post
export const deletePost = async (postId: number) => {
  const response = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`);
  return response.data;
};
