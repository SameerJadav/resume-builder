import { useResume } from '../../hooks/useResume';
import './StyleControls.css';

const fontOptions = [
  { label: 'Inter', value: "'Inter Variable', Inter, system-ui, sans-serif" },
  { label: 'Georgia', value: 'Georgia, serif' },
  { label: 'Times', value: "'Times New Roman', Times, serif" },
  { label: 'Arial', value: 'Arial, Helvetica, sans-serif' },
  { label: 'Palatino', value: "'Palatino Linotype', Palatino, serif" },
  { label: 'Courier', value: "'Courier New', Courier, monospace" },
];

export function StyleControls() {
  const { settings, setSettings } = useResume();

  function update(key, value) {
    setSettings({ ...settings, [key]: value });
  }

  return (
    <div className="style-controls">
      <label className="style-control">
        <span className="style-control__label">Font</span>
        <select
          className="style-control__select"
          value={settings.fontFamily}
          onChange={(e) => update('fontFamily', e.target.value)}
        >
          {fontOptions.map((f) => (
            <option key={f.value} value={f.value}>
              {f.label}
            </option>
          ))}
        </select>
      </label>

      <label className="style-control">
        <span className="style-control__label">Color</span>
        <input
          type="color"
          className="style-control__color"
          value={settings.accentColor}
          onChange={(e) => update('accentColor', e.target.value)}
        />
      </label>

      <label className="style-control">
        <span className="style-control__label">Size</span>
        <input
          type="range"
          className="style-control__range"
          min="9"
          max="14"
          step="0.5"
          value={settings.fontSize}
          onChange={(e) => update('fontSize', parseFloat(e.target.value))}
        />
      </label>

      <label className="style-control">
        <span className="style-control__label">Spacing</span>
        <input
          type="range"
          className="style-control__range"
          min="8"
          max="32"
          step="2"
          value={settings.sectionSpacing}
          onChange={(e) => update('sectionSpacing', parseInt(e.target.value, 10))}
        />
      </label>

      <label className="style-control">
        <span className="style-control__label">Margin</span>
        <input
          type="range"
          className="style-control__range"
          min="24"
          max="64"
          step="4"
          value={settings.pageMargin}
          onChange={(e) => update('pageMargin', parseInt(e.target.value, 10))}
        />
      </label>
    </div>
  );
}
