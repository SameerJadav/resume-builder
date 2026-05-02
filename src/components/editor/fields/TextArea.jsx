import './fields.css';

export function TextArea({ label, value, onChange, placeholder, rows = 3 }) {
  return (
    <label className="field">
      <span className="field__label">{label}</span>
      <textarea
        className="field__input field__textarea"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
      />
    </label>
  );
}
