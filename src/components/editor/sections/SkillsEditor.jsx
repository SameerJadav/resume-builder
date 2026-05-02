import { useResume } from '../../../hooks/useResume';
import { TextField } from '../fields/TextField';
import './sections.css';

export function SkillsEditor() {
  const { resume, actions } = useResume();

  if (!resume.skills.length) {
    return (
      <div className="section-form">
        <p className="section-empty">No entries yet. Click + to add one.</p>
      </div>
    );
  }

  return (
    <div className="section-form">
      {resume.skills.map((entry, idx) => (
        <div key={entry.id} className="entry-card">
          <div className="entry-card__header">
            <span className="entry-card__number">{idx + 1}</span>
            <button
              type="button"
              className="entry-card__remove"
              onClick={() => actions.removeEntry('skills', entry.id)}
              title="Remove skill group"
            >
              Remove
            </button>
          </div>
          <TextField
            label="Category"
            value={entry.category}
            onChange={(v) => actions.updateEntry('skills', entry.id, 'category', v)}
            placeholder="Programming Languages"
          />
          <TextField
            label="Skills (comma-separated)"
            value={entry.items}
            onChange={(v) => actions.updateEntry('skills', entry.id, 'items', v)}
            placeholder="JavaScript, Python, Go, SQL"
          />
        </div>
      ))}
    </div>
  );
}
