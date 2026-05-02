import { useResume } from '../../../hooks/useResume';
import { TextField } from '../fields/TextField';
import './sections.css';

export function PersonalInfoEditor() {
  const { resume, actions } = useResume();
  const info = resume.personalInfo;

  return (
    <div className="section-form">
      <TextField
        label="Full Name"
        value={info.fullName}
        onChange={(v) => actions.updatePersonalInfo('fullName', v)}
        placeholder="John Doe"
      />
      <div className="field-row">
        <TextField
          label="Email"
          value={info.email}
          onChange={(v) => actions.updatePersonalInfo('email', v)}
          placeholder="john@example.com"
        />
        <TextField
          label="Phone"
          value={info.phone}
          onChange={(v) => actions.updatePersonalInfo('phone', v)}
          placeholder="(555) 123-4567"
        />
      </div>
      <TextField
        label="Location"
        value={info.location}
        onChange={(v) => actions.updatePersonalInfo('location', v)}
        placeholder="San Francisco, CA"
      />
      <div className="field-row">
        <TextField
          label="LinkedIn"
          value={info.linkedin}
          onChange={(v) => actions.updatePersonalInfo('linkedin', v)}
          placeholder="linkedin.com/in/johndoe"
        />
        <TextField
          label="Website"
          value={info.website}
          onChange={(v) => actions.updatePersonalInfo('website', v)}
          placeholder="johndoe.com"
        />
      </div>
    </div>
  );
}
