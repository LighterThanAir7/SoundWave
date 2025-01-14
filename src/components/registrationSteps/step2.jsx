import FormInput from "../common/FormInput.jsx";
import { useState } from "react";

export default function Step2({ formData, setFormData, onNext }) {
  const [displayName, setDisplayName] = useState(formData.step2?.displayName || '');
  const [day, setDay] = useState(formData.step2?.day || '');
  const [month, setMonth] = useState(formData.step2?.month || '');
  const [year, setYear] = useState(formData.step2?.year || '');
  const [selectedGender, setSelectedGender] = useState(formData.step2?.gender || '');

  const [errors, setErrors] = useState({
    displayName: '',
    dateError: '',
    gender: ''
  });

  // Display Name handlers
  const handleDisplayNameChange = (e) => {
    const value = e.target.value;
    setDisplayName(value);
    setFormData(prev => ({
      ...prev,
      step2: { ...prev.step2, displayName: value }
    }));
    setErrors(prev => ({ ...prev, displayName: '' }));
  };

  const handleDisplayNameBlur = (e) => {
    validateDisplayName(e.target.value);
  };

  // Date handlers
  const handleDayChange = (e) => {
    const value = e.target.value;
    setDay(value);
    setFormData(prev => ({
      ...prev,
      step2: { ...prev.step2, day: value }
    }));
    setErrors(prev => ({ ...prev, dateError: '' }));
  };

  const handleMonthChange = (e) => {
    const value = e.target.value;
    setMonth(value);
    setFormData(prev => ({
      ...prev,
      step2: { ...prev.step2, month: value }
    }));
    setErrors(prev => ({ ...prev, dateError: '' }));
  };

  const handleYearChange = (e) => {
    const value = e.target.value;
    setYear(value);
    setFormData(prev => ({
      ...prev,
      step2: { ...prev.step2, year: value }
    }));
    setErrors(prev => ({ ...prev, dateError: '' }));
  };

  // Gender handler
  const handleGenderChange = (e) => {
    const value = e.target.value;
    setSelectedGender(value);
    setFormData(prev => ({
      ...prev,
      step2: { ...prev.step2, gender: value }
    }));
    setErrors(prev => ({ ...prev, gender: '' }));
  };

  // Validation functions
  const validateDisplayName = (value) => {
    if (!value) {
      setErrors(prev => ({ ...prev, displayName: 'Display name is required' }));
      return false;
    }
    if (value.length < 4) {
      setErrors(prev => ({ ...prev, displayName: 'Display name must be at least 4 characters' }));
      return false;
    }
    setErrors(prev => ({ ...prev, displayName: '' }));
    return true;
  };

  const validateDate = () => {
    const currentYear = new Date().getFullYear();

    if (!day || !month || !year) {
      setErrors(prev => ({ ...prev, dateError: 'Please enter your complete date of birth' }));
      return false;
    }

    if (day < 1 || day > 31) {
      setErrors(prev => ({ ...prev, dateError: 'Please enter a valid day between 1 and 31' }));
      return false;
    }

    if (year < 1900 || year > currentYear) {
      setErrors(prev => ({ ...prev, dateError: 'Please enter a valid year between 1900 and ' + currentYear }));
      return false;
    }

    setErrors(prev => ({ ...prev, dateError: '' }));
    return true;
  };

  const validateForm = () => {
    let isValid = true;
    if (!validateDisplayName(displayName)) isValid = false;
    if (!validateDate()) isValid = false;
    if (!selectedGender) {
      setErrors(prev => ({ ...prev, gender: 'Please select your gender' }));
      isValid = false;
    }
    return isValid;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext();
    }
  };

  return (
    <>
      <FormInput
        id="display_name"
        name="display_name"
        label="Display name"
        type="text"
        placeholder=""
        value={displayName}
        onChange={handleDisplayNameChange}
        onBlur={handleDisplayNameBlur}
        errorMessage={errors.displayName}
      />

      <label htmlFor="day" className="mb-8 fw-600">Date of birth</label>
      <div className="form__date-of-birth">
        <FormInput
          id="day"
          name="day"
          type="number"
          placeholder="dd"
          className="form__input form__input--test form__input--day"
          value={day}
          onChange={handleDayChange}
        />

        <select
          className="form__select flex-1"
          id="month"
          name="month"
          value={month}
          onChange={handleMonthChange}
        >
          <option disabled value="">Month</option>
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
          value={year}
          onChange={handleYearChange}
        />
      </div>
      {errors.dateError && <p className="form__error">{errors.dateError}</p>}

      <fieldset role="radiogroup" className="form__fieldset | mb-24">
        <legend className="mb-6 fw-600">Gender</legend>
        <label className="block">
          <input
            name="gender"
            type="radio"
            className="mr-10 mb-8"
            value="male"
            checked={selectedGender === 'male'}
            onChange={handleGenderChange}
          />
          Male
        </label>
        <label>
          <input
            name="gender"
            type="radio"
            className="mr-10"
            value="female"
            checked={selectedGender === 'female'}
            onChange={handleGenderChange}
          />
          Female
        </label>
        {errors.gender && <p className="form__error">{errors.gender}</p>}
      </fieldset>

      <button
        type="button"
        className="btn btn--primary"
        onClick={handleNext}
      >
        Next
      </button>
    </>
  );
}