import Header from "../components/layout/Header.jsx";
import Footer from "../components/layout/Footer.jsx";
import LoginForm from "../components/common/LoginForm.jsx";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && user) {
      navigate('/music');
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return null; // or a loading spinner
  }

  return (
    <div className="bg-dots">
      <Header />
      <main className="flex-col align-items-center relative | mt-64">
        <h2 className="text-center | mb-80">
          <span className="text-primary-500">Life</span> and
          <span className="text-primary-500"> Love</span> go on, let the
          <span className="text-secondary-500"> Music</span> play.
        </h2>
        <LoginForm/>
      </main>
      <Footer type="bottom"/>
    </div>
  );
}