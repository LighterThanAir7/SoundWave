import TestForm from "./TestForm.jsx";
import AdminNav from "./AdminNav.jsx";

export default function AdminDashboard() {
  return (
    <div className="bg-main">
      <h1>Admin dasboard</h1>
      <AdminNav />
      <TestForm />
    </div>
  )
}
