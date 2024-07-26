import FormInput from "./FormInput.jsx";

export default function LoginForm () {
  return (
    <form className="form" method="post">

      <FormInput
        label="Email or Username"
        type="text"
        placeholder="LighterThanAir"
      />

      <FormInput
        label="Password"
        type="password"
        placeholder="Type here..."
      />

      <button type="submit" className="btn btn--primary mb-24">Continue</button>

      <FormInput
        label="Remember me"
        type="checkbox"
      />

      <p className="text-center mb-600">or</p>

      <h4>Join via social media</h4>

      <div className="form__socials">
        <div className="form__socials-item">
          <p></p>
          <i className="icon-facebook"></i>
        </div>

        <i className="icon-twitter"></i>
        <i className="icon-instagram"></i>
        <i className="icon-apple"></i>
      </div>
    </form>
  )
}