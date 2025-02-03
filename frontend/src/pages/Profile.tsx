import UserInfo from "../components/User-info";
import UserPosts from "../components/User-posts";

export default function Profile() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <UserInfo />
      <UserPosts />
    </div>
  );
}
