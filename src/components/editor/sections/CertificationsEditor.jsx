import { useResume } from '../../../hooks/useResume';
import { TextField } from '../fields/TextField';
import './sections.css';

export function CertificationsEditor() {
  const { resume, actions } = useResume();

  if (!resume.certifications.length) {
    return (
      <div className="section-form">
        <p className="section-empty">No entries yet. Click + to add one.</p>
      </div>
    );
  }

  return (
    <div className="section-form">
      {resume.certifications.map((entry, idx) => (
        <div key={entry.id} className="entry-card">
          <div className="entry-card__header">
            <span className="entry-card__number">{idx + 1}</span>
            <button
              type="button"
              className="entry-card__remove"
              onClick={() => actions.removeEntry('certifications', entry.id)}
              title="Remove certification"
            >
              Remove
            </button>
          </div>
          <TextField
            label="Certification Name"
            value={entry.name}
            onChange={(v) => actions.updateEntry('certifications', entry.id, 'name', v)}
            placeholder="AWS Solutions Architect"
          />
          <div className="field-row">
            <TextField
              label="Issuer"
              value={entry.issuer}
              onChange={(v) => actions.updateEntry('certifications', entry.id, 'issuer', v)}
              placeholder="Amazon Web Services"
            />
            <TextField
              label="Date"
              value={entry.date}
              onChange={(v) => actions.updateEntry('certifications', entry.id, 'date', v)}
              placeholder="Mar 2023"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
