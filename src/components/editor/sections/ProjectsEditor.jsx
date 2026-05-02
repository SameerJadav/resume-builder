import { useResume } from '../../../hooks/useResume';
import { TextField } from '../fields/TextField';
import { TextArea } from '../fields/TextArea';
import './sections.css';

export function ProjectsEditor() {
  const { resume, actions } = useResume();

  if (!resume.projects.length) {
    return (
      <div className="section-form">
        <p className="section-empty">No entries yet. Click + to add one.</p>
      </div>
    );
  }

  return (
    <div className="section-form">
      {resume.projects.map((entry, idx) => (
        <div key={entry.id} className="entry-card">
          <div className="entry-card__header">
            <span className="entry-card__number">{idx + 1}</span>
            <button
              type="button"
              className="entry-card__remove"
              onClick={() => actions.removeEntry('projects', entry.id)}
              title="Remove project"
            >
              Remove
            </button>
          </div>
          <TextField
            label="Project Name"
            value={entry.name}
            onChange={(v) => actions.updateEntry('projects', entry.id, 'name', v)}
            placeholder="My Awesome Project"
          />
          <TextArea
            label="Description"
            value={entry.description}
            onChange={(v) => actions.updateEntry('projects', entry.id, 'description', v)}
            placeholder="Brief description of the project..."
            rows={2}
          />
          <div className="field-row">
            <TextField
              label="Technologies"
              value={entry.technologies}
              onChange={(v) => actions.updateEntry('projects', entry.id, 'technologies', v)}
              placeholder="React, Node.js, PostgreSQL"
            />
            <TextField
              label="Link"
              value={entry.link}
              onChange={(v) => actions.updateEntry('projects', entry.id, 'link', v)}
              placeholder="github.com/user/project"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
