import AccountImg from "../../assets/account.png";

export default function TopbarAccount () {
  return (
    <div className="topbar__account">
      <img className="topbar__profile-icon" src={AccountImg} alt="Profile icon"/>
      <p className="topbar__profile-name">Lighter Than Air</p>
      <div className="topbar__separator"></div>
      <i className="icon-notifications"></i>
    </div>
  )
}