export default function FormInput({ label, type, errorMessage, ...rest }) {
  const isCheckbox = type === 'checkbox';

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
            <input
              className="form__input"
              type={type}
              {...rest}
            />
          </>
        )}
      </label>
      {errorMessage && (
        <p className="form__error">{errorMessage}</p>
      )}
    </div>
  );
}