import FormInput from "../common/FormInput.jsx";
import { useState } from "react";

// Konstanta za password requirements
const PASSWORD_REQUIREMENTS = {
  lowercase: {
    pattern: /[a-z]/,
    message: '1 lowercase letter'
  },
  uppercase: {
    pattern: /[A-Z]/,
    message: '1 uppercase letter'
  },
  special: {
    pattern: /[!@#$%^&*(),.?":{}|<>]/,
    message: '1 special character'
  },
  number: {
    pattern: /[0-9]/,
    message: '1 number'
  },
  length: {
    pattern: (value) => value.length >= 10,
    message: '10 characters'
  }
};

export default function Step1({ formData, setFormData, onNext, setCurrentStep }) {
  const [password, setPassword] = useState(formData.step1?.password || '');
  const [errorMessage, setErrorMessage] = useState('');
  const [requirements, setRequirements] = useState(
    Object.entries(PASSWORD_REQUIREMENTS).reduce((acc, [key, req]) => ({
      ...acc,
      [key]: typeof req.pattern === 'function'
        ? req.pattern(formData.step1?.password || '')
        : req.pattern.test(formData.step1?.password || '')
    }), {})
  );

  const validatePassword = (value) => {
    if (!value) {
      setErrorMessage('Password is required');
      return false;
    }

    setRequirements(Object.entries(PASSWORD_REQUIREMENTS).reduce((acc, [key, req]) => ({
      ...acc,
      [key]: typeof req.pattern === 'function' ? req.pattern(value) : req.pattern.test(value)
    }), {}));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setErrorMessage('');
    validatePassword(value);
    setFormData(prev => ({
      ...prev,
      step1: { ...prev.step1, password: value }
    }));
  };

  const handleNext = () => {
    const isValid = Object.values(requirements).every(req => req);
    if (isValid) {
      onNext();
    }
  };

  const handleEmailChange = () => {
    setCurrentStep(0);

    setTimeout(() => {
      const emailInput = document.getElementById('email');
      if (emailInput) {
        emailInput.focus();
      }
    }, 100);
  };

  const handlePasswordBlur = () => {
    validatePassword(password);
  };

  return (
    <>
      <FormInput
        label="Password"
        type="password"
        placeholder="●●●●●●●●"
        value={password}
        onChange={handlePasswordChange}
        onBlur={handlePasswordBlur}
        errorMessage={errorMessage}
      />

      <div className="password-requirements">
        <p className="password-requirements__title">Your password must contain at least</p>
        {Object.entries(PASSWORD_REQUIREMENTS).map(([key, req]) => (
          <div key={key} className={`password-requirements__item ${requirements[key] ? 'is-valid' : ''}`}>
            <i className={`icon-${requirements[key] ? 'check' : 'x'}`}></i>
            <span>{req.message}</span>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="btn btn--primary | mb-12"
        onClick={handleNext}
        disabled={!Object.values(requirements).every(req => req)}
      >
        Next
      </button>

      <button
        type="button"
        className="btn btn--ghost"
        onClick={handleEmailChange}
      >
        Change Email
      </button>
    </>
  );
}