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

  const getContextMenuOptions = () => [
    { label: 'Edit', link: `/admin/songs/}` },
    { label: 'Delete', link: `/admin/songs/}` },
  ];

  return (
    <div className="topbar__account">
      <div className="flex align-items-center g-8 relative">
        <img className="topbar__profile-icon" src={AccountImg} alt="Profile icon"/>
        <p className="topbar__profile-name">
          {user ? user.base_username : 'Guest'}
        </p>
      </div>
      <div className="topbar__separator"></div>
      <i className="icon-notifications"></i>
      <button className="btn-logout" onClick={handleLogout}>Logout</button>
    </div>
  );
}
