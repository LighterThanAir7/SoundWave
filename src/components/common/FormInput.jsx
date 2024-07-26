export default function FormInput({ label, type, placeholder }) {
  const isCheckbox = type === 'checkbox';
  return (
    <label className={`form__label ${isCheckbox ? 'form__label--checkbox' : ''}`}>
      {isCheckbox ? (
        <>
          <input className="form__input form__input--checkbox" type={type} />
          <i className="form__checkbox"></i>
          {label}
        </>
      ) : (
        <>
          {label}
          <input className="form__input" type={type} placeholder={placeholder} />
        </>
      )}
    </label>
  );
}