import Header from "../components/layout/Header.jsx";
import Footer from "../components/layout/Footer.jsx";
import LoginForm from "../components/common/LoginForm.jsx";

export default function Login () {
  return (
    <div className="bg-dots">
      <Header className="test"/>

      <main className="flex-col align-items-center | mt-80">
        <h1 className="text-center">
          <span className="text-primary-500">Life</span> and
          <span className="text-primary-500"> Love</span> go on, let the
          <span className="text-secondary-500"> Music</span> play.
        </h1>
        <h3 className="text-center">Sing Up or Log In</h3>
        <LoginForm/>
      </main>

      <Footer type="bottom"/>
    </div>
  )
}