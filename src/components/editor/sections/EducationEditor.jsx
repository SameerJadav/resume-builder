import { useResume } from '../../../hooks/useResume';
import { TextField } from '../fields/TextField';
import './sections.css';

export function EducationEditor() {
  const { resume, actions } = useResume();

  if (!resume.education.length) {
    return (
      <div className="section-form">
        <p className="section-empty">No entries yet. Click + to add one.</p>
      </div>
    );
  }

  return (
    <div className="section-form">
      {resume.education.map((entry, idx) => (
        <div key={entry.id} className="entry-card">
          <div className="entry-card__header">
            <span className="entry-card__number">{idx + 1}</span>
            <button
              type="button"
              className="entry-card__remove"
              onClick={() => actions.removeEntry('education', entry.id)}
              title="Remove school"
            >
              Remove
            </button>
          </div>
          <TextField
            label="School"
            value={entry.school}
            onChange={(v) => actions.updateEntry('education', entry.id, 'school', v)}
            placeholder="University of California, Berkeley"
          />
          <div className="field-row">
            <TextField
              label="Degree"
              value={entry.degree}
              onChange={(v) => actions.updateEntry('education', entry.id, 'degree', v)}
              placeholder="Bachelor of Science"
            />
            <TextField
              label="Field of Study"
              value={entry.field}
              onChange={(v) => actions.updateEntry('education', entry.id, 'field', v)}
              placeholder="Computer Science"
            />
          </div>
          <div className="field-row-3">
            <TextField
              label="Start Date"
              value={entry.startDate}
              onChange={(v) => actions.updateEntry('education', entry.id, 'startDate', v)}
              placeholder="2015"
            />
            <TextField
              label="End Date"
              value={entry.endDate}
              onChange={(v) => actions.updateEntry('education', entry.id, 'endDate', v)}
              placeholder="2019"
            />
            <TextField
              label="GPA (optional)"
              value={entry.gpa}
              onChange={(v) => actions.updateEntry('education', entry.id, 'gpa', v)}
              placeholder="3.8"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
