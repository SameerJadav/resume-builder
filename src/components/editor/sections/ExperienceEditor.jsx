import { useResume } from '../../../hooks/useResume';
import { TextField } from '../fields/TextField';
import { BulletListEditor } from '../fields/BulletListEditor';
import './sections.css';

export function ExperienceEditor() {
  const { resume, actions } = useResume();

  if (!resume.experience.length) {
    return (
      <div className="section-form">
        <p className="section-empty">No entries yet. Click + to add one.</p>
      </div>
    );
  }

  return (
    <div className="section-form">
      {resume.experience.map((entry, idx) => (
        <div key={entry.id} className="entry-card">
          <div className="entry-card__header">
            <span className="entry-card__number">{idx + 1}</span>
            <button
              type="button"
              className="entry-card__remove"
              onClick={() => actions.removeEntry('experience', entry.id)}
              title="Remove position"
            >
              Remove
            </button>
          </div>
          <TextField
            label="Job Title"
            value={entry.title}
            onChange={(v) => actions.updateEntry('experience', entry.id, 'title', v)}
            placeholder="Software Engineer"
          />
          <TextField
            label="Company"
            value={entry.company}
            onChange={(v) => actions.updateEntry('experience', entry.id, 'company', v)}
            placeholder="Acme Corp"
          />
          <div className="field-row">
            <TextField
              label="Start Date"
              value={entry.startDate}
              onChange={(v) => actions.updateEntry('experience', entry.id, 'startDate', v)}
              placeholder="Jan 2022"
            />
            <div>
              <TextField
                label="End Date"
                value={entry.current ? '' : entry.endDate}
                onChange={(v) => actions.updateEntry('experience', entry.id, 'endDate', v)}
                placeholder={entry.current ? 'Present' : 'Dec 2023'}
              />
              <label className="field-checkbox" style={{ marginTop: 4 }}>
                <input
                  type="checkbox"
                  checked={entry.current}
                  onChange={(e) => actions.updateEntry('experience', entry.id, 'current', e.target.checked)}
                />
                Current position
              </label>
            </div>
          </div>
          <BulletListEditor
            bullets={entry.bullets}
            onUpdate={(i, v) => actions.updateBullet('experience', entry.id, i, v)}
            onAdd={() => actions.addBullet('experience', entry.id)}
            onRemove={(i) => actions.removeBullet('experience', entry.id, i)}
          />
        </div>
      ))}
    </div>
  );
}
