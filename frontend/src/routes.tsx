import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Users from "./pages/Users";
import Profile from "./pages/Profile";
import NewUser from "./pages/NewUser";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/users" element={<Users />} />
      <Route path="/new-user" element={<NewUser />} />
      <Route path="/profile/:id" element={<Profile />} /> 
    </Routes>
  );
}