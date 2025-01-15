import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import AccountImg from "../../assets/account.png";

export default function TopbarAccount() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="topbar__account">
      <img className="topbar__profile-icon" src={AccountImg} alt="Profile icon"/>
      <p className="topbar__profile-name">
        {user ? user.base_username : 'Guest'}
      </p>
      <div className="topbar__separator"></div>
      <i className="icon-notifications"></i>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
