export default function TableCheckbox ({ value, onChange, id = 'all' }) {
  return (
    <div className="custom-checkbox-field">
      <input
        type="checkbox"
        id={`checkbox-${id}`}
        className="custom-checkbox-field__input"
        checked={value}
        onChange={onChange}
      />
      <label
        className="custom-checkbox-field__label"
        htmlFor={`checkbox-${id}`}
      >
        <span className="custom-checkbox-field__indicator"></span>
      </label>
    </div>
  )
}