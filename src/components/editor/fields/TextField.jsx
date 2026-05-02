import './fields.css';

export function TextField({ label, value, onChange, placeholder }) {
  return (
    <label className="field">
      <span className="field__label">{label}</span>
      <input
        type="text"
        className="field__input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </label>
  );
}
