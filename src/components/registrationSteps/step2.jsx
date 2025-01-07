import FormInput from "../common/FormInput.jsx";

export default function Step2 ({ formData, setFormData, onNext }) {
  const handleNext = () => {
    // Ovdje dodaj validaciju ako je potrebna
    /*if (validateStep1()) {*/
    onNext();
    /*}*/
  };

  return (
    <>
      <FormInput
        label="Password"
        type="password"
        placeholder="●●●●●●●●"
      />

      <div className="password-requirements">
        <p className="password-requirements__title">Your password must contain at least</p>
        <div className="password-requirements__item">
          <i className="icon-arrow-right"></i>
          <span>1 lowecase letter</span>
        </div>
        <div className="password-requirements__item">
          <i className="icon-arrow-right"></i>
          <span>1 uppercase letter</span>
        </div>
        <div className="password-requirements__item">
          <i className="icon-arrow-right"></i>
          <span>1 special character</span>
        </div>
        <div className="password-requirements__item">
          <i className="icon-arrow-right"></i>
          <span>1 number</span>
        </div>
        <div className="password-requirements__item">
          <i className="icon-arrow-right"></i>
          <span>10 characters</span>
        </div>
      </div>

      <button
        type="button"
        className="btn btn--primary"
        onClick={handleNext}
      >
        Next
      </button>
    </>
  )
}