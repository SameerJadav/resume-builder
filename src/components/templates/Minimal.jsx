import { useResume } from '../../hooks/useResume';
import './shared.css';
import './Minimal.css';

function SectionHeading({ children }) {
  return <h2 className="minimal-heading">{children}</h2>;
}

function SummarySection({ text }) {
  if (!text) return null;
  return (
    <div className="minimal-section">
      <SectionHeading>Summary</SectionHeading>
      <p>{text}</p>
    </div>
  );
}

function ExperienceSection({ entries }) {
  if (!entries.length) return null;
  return (
    <div className="minimal-section">
      <SectionHeading>Experience</SectionHeading>
      {entries.map((entry) => (
        <div key={entry.id} className="minimal-entry">
          <h3>{entry.title}{entry.company && <span className="minimal-muted"> at {entry.company}</span>}</h3>
          <p className="minimal-dates">
            {entry.startDate}{entry.startDate && ' — '}{entry.current ? 'Present' : entry.endDate}
          </p>
          {entry.bullets.some((b) => b) && (
            <ul>
              {entry.bullets.map((b, i) => (b ? <li key={i}>{b}</li> : null))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

function EducationSection({ entries }) {
  if (!entries.length) return null;
  return (
    <div className="minimal-section">
      <SectionHeading>Education</SectionHeading>
      {entries.map((entry) => (
        <div key={entry.id} className="minimal-entry">
          <h3>
            {entry.degree}{entry.field && ` in ${entry.field}`}
            {entry.school && <span className="minimal-muted"> — {entry.school}</span>}
          </h3>
          <p className="minimal-dates">
            {entry.startDate}{entry.startDate && ' — '}{entry.endDate}
            {entry.gpa && ` | GPA: ${entry.gpa}`}
          </p>
        </div>
      ))}
    </div>
  );
}

function SkillsSection({ entries }) {
  if (!entries.length) return null;
  return (
    <div className="minimal-section">
      <SectionHeading>Skills</SectionHeading>
      <div className="minimal-skills">
        {entries.map((entry) => (
          <p key={entry.id}>
            {entry.category && <strong>{entry.category}: </strong>}
            {entry.items}
          </p>
        ))}
      </div>
    </div>
  );
}

function ProjectsSection({ entries }) {
  if (!entries.length) return null;
  return (
    <div className="minimal-section">
      <SectionHeading>Projects</SectionHeading>
      {entries.map((entry) => (
        <div key={entry.id} className="minimal-entry">
          <h3>{entry.name}</h3>
          {entry.description && <p>{entry.description}</p>}
          {entry.technologies && <p className="minimal-muted">{entry.technologies}</p>}
        </div>
      ))}
    </div>
  );
}

function CertificationsSection({ entries }) {
  if (!entries.length) return null;
  return (
    <div className="minimal-section">
      <SectionHeading>Certifications</SectionHeading>
      {entries.map((entry) => (
        <div key={entry.id} className="minimal-entry">
          <h3>{entry.name}{entry.issuer && <span className="minimal-muted"> — {entry.issuer}</span>}</h3>
          {entry.date && <p className="minimal-dates">{entry.date}</p>}
        </div>
      ))}
    </div>
  );
}

const sectionRenderers = {
  summary: (r) => <SummarySection text={r.summary.text} />,
  experience: (r) => <ExperienceSection entries={r.experience} />,
  education: (r) => <EducationSection entries={r.education} />,
  skills: (r) => <SkillsSection entries={r.skills} />,
  projects: (r) => <ProjectsSection entries={r.projects} />,
  certifications: (r) => <CertificationsSection entries={r.certifications} />,
};

export default function Minimal() {
  const { resume, settings } = useResume();
  const { personalInfo } = resume;

  const style = {
    '--accent': settings.accentColor,
    '--font-family': settings.fontFamily,
    '--font-size': `${settings.fontSize}pt`,
    '--line-height': settings.lineHeight,
    '--section-spacing': `${settings.sectionSpacing}px`,
    '--page-margin': `${settings.pageMargin}px`,
  };

  return (
    <div className="template-root minimal" style={style}>
      <header className="minimal-header">
        <h1>{personalInfo.fullName || 'Your Name'}</h1>
        <div className="minimal-contact">
          {[personalInfo.email, personalInfo.phone, personalInfo.location, personalInfo.linkedin, personalInfo.website]
            .filter(Boolean)
            .join('  ·  ')}
        </div>
      </header>
      {resume.sectionOrder
        .filter((key) => key !== 'personalInfo' && sectionRenderers[key])
        .map((key) => (
          <div key={key}>{sectionRenderers[key](resume)}</div>
        ))}
    </div>
  );
}
