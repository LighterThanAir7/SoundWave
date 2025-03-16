import {useState} from "react";

export default function FormInput({ label, type, errorMessage, options, ...rest }) {
  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const isCheckbox = type === 'checkbox';
  const isRadio = type === 'radio';
  const isPassword = type === 'password';

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!isPasswordVisible);
  };

  if (isRadio && options) {
    return (
      <div className="form__field">
        <label className="form__label">{label}</label>
        <div className="form__radio-group">
          {options.map((option) => (
            <label key={option.value} className="form__radio-label">
              <input
                name={rest.name}
                className="form__input form__input--radio"
                type="radio"
                value={option.value}
                checked={rest.value === option.value}
                onChange={rest.onChange}
              />
              {option.label}
            </label>
          ))}
        </div>
        {errorMessage && <p className="form__error">{errorMessage}</p>}
      </div>
    );
  }

  return (
    <div className="form__field">
      <label className={`form__label ${isCheckbox ? 'form__label--checkbox' : ''}`}>
        {isCheckbox ? (
          <>
            <input
              className="form__input form__input--checkbox"
              type={type}
              {...rest}
            />
            <i className="form__checkbox"></i>
            {label}
          </>
        ) : (
          <>
            {label}
            <div style={{ position: 'relative' }}>
              <input
                className="form__input"
                type={isPassword ? (isPasswordVisible ? 'text' : 'password') : type}
                {...rest}
              />
              {isPassword && (
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <i className={`icon-eye${isPasswordVisible ? '-off' : ''}`}></i>
                </button>
              )}
            </div>
          </>
        )}
      </label>
      {errorMessage && (
        <p className="form__error">{errorMessage}</p>
      )}
    </div>
  );
}