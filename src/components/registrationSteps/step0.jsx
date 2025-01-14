import FormInput from "../common/FormInput.jsx";
import FormSocials from "../common/FormSocials.jsx";
import {Link} from "react-router-dom";
import {useState} from "react";

export default function Step0({ formData, setFormData, onNext }) {
  const [email, setEmail] = useState(formData.step0?.email || '');
  const [emailError, setEmailError] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      setEmailError("Email is required");
      return false;
    }

    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return false;
    }

    setEmailError("");
    return true;
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setFormData(prev => ({
      ...prev,
      step0: { ...prev.step0, email: value }
    }));
    setEmailError('');
  };

  const handleEmailBlur = (e) => {
    validateEmail(e.target.value);
  };

  const handleNext = () => {
    const isEmailValid = validateEmail(email);
    if (isEmailValid) {
      onNext();
    }
  };

  return (
    <>
      <FormInput
        id="email"
        label="Email address"
        type="email"
        placeholder="johndoe@gmail.com"
        value={email}
        onChange={handleEmailChange}
        onBlur={handleEmailBlur}
        errorMessage={emailError}
      />

      <button
        type="button"
        className="btn btn--primary mb-24"
        onClick={handleNext}
      >
        Next
      </button>

      <p className="text-center mb-24">or</p>

      <FormSocials/>

      <p className="form__register">Already have an account?
        <Link to="/register" className="form__register-link">Log in here</Link>
      </p>
    </>
  )
}