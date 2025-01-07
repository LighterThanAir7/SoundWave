import FormInput from "./FormInput.jsx";
import FormSocials from "./FormSocials.jsx";
import {Link} from "react-router-dom";

export default function LoginForm () {
  return (
    <div className="z-1">
      <form className="form form--login" method="post">
        <FormInput
          label="Email or Username"
          type="text"
          placeholder="LighterThanAir"
        />

        <FormInput
          label="Password"
          type="password"
          placeholder="●●●●●●●●"
        />

        <FormInput
          label="Remember me"
          type="checkbox"
        />

        <button type="submit" className="btn btn--primary mb-24">Continue</button>
        <p className="text-center mb-24">or</p>

        <FormSocials/>

        <p className="form__register">Don&apos;t have an account?
          <Link to="/register" className="form__register-link">Register now</Link>
        </p>
      </form>
    </div>
  )
}