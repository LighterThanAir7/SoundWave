import TestForm from "./TestForm.jsx";
import AdminSidebar from "./AdminSidebar.jsx";

export default function AdminDashboard() {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="admin-wrapper">
        <h1>Admin dasboard</h1>
        <TestForm />
      </div>
    </div>
  )
}
