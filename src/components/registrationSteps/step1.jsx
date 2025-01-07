import FormInput from "../common/FormInput.jsx";
import FormSocials from "../common/FormSocials.jsx";
import {Link} from "react-router-dom";

export default function Step1({ formData, setFormData, onNext }) {
  const handleNext = () => {
    // Ovdje dodaj validaciju ako je potrebna
    /*if (validateStep1()) {*/
      onNext();
    /*}*/
  };

  return (
    <>
      <FormInput
        label="Email address"
        type="email"
        placeholder="johndoe@gmail.com"
        value={formData.step1.email || ''}
        onChange={(e) => setFormData(prev => ({
          ...prev,
          step1: {...prev.step1, email: e.target.value}
        }))}
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