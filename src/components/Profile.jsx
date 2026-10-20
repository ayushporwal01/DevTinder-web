import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";

const Profile = () => {
  const user = useSelector((store) => store.user);
  if (!user) return <span className="loading loading-spinner"></span>;

  return <EditProfile user={user} />;
};

export default Profile;
