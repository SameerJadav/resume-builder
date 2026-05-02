import { useResume } from '../../hooks/useResume';
import { templates } from '../templates/index';
import './TemplatePicker.css';

export function TemplatePicker() {
  const { settings, setSettings } = useResume();

  return (
    <div className="template-picker">
      {templates.map((t) => (
        <button
          key={t.id}
          type="button"
          className={`template-picker__item ${settings.templateId === t.id ? 'template-picker__item--active' : ''}`}
          onClick={() => setSettings({ ...settings, templateId: t.id })}
          title={t.name}
        >
          {t.name}
        </button>
      ))}
    </div>
  );
}
