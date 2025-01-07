import FormInput from "../common/FormInput.jsx";

export default function Step3 ({ formData, setFormData, onNext }) {
  const handleNext = () => {
    // Ovdje dodaj validaciju ako je potrebna
    /*if (validateStep1()) {*/
    onNext();
    /*}*/
  };

  return (
    <>
      <FormInput
        label="Display name"
        type="text"
        placeholder=""
      />

      <label htmlFor="day" className="mb-8 fw-600">Date of birth</label>
      <div className="form__date-of-birth">
        <FormInput
          id="day"
          name="day"
          type="number"
          placeholder="dd"
          className="form__input form__input--test form__input--day"
        />

        <select className="form__select flex-1" id="month" name="month" required>
          <option disabled selected value="">Month</option>
          <option value="1">January</option>
          <option value="2">February</option>
          <option value="3">March</option>
          <option value="4">April</option>
          <option value="5">May</option>
          <option value="6">June</option>
          <option value="7">July</option>
          <option value="8">August</option>
          <option value="9">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>

        <FormInput
          id="year"
          name="year"
          type="number"
          placeholder="yyyy"
          className="form__input form__input--test"
        />
      </div>

      <fieldset role="radiogroup" className="form__fieldset | mb-24">
        <legend className="mb-6 fw-600">Gender</legend>
        <label className="block">
          <input name="gender" type="radio" className="mr-10 mb-8"/>Male
        </label>

        <label>
          <input name="gender" type="radio" className="mr-10"/>Female
        </label>
      </fieldset>


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