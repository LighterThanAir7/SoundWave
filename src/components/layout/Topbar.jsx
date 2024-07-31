import TopbarAccount from "../common/TopbarAccount.jsx";
import TopbarForm from "../common/TopbarForm.jsx";

export default function Topbar () {
  return (
    <header className="topbar">
      <TopbarForm />
      <TopbarAccount />
    </header>
  )
}