import { useResume } from '../../hooks/useResume';
import './shared.css';
import './Creative.css';

function SectionHeading({ children }) {
  return (
    <div className="creative-heading">
      <h2>{children}</h2>
    </div>
  );
}

function SummarySection({ text }) {
  if (!text) return null;
  return (
    <div className="creative-section">
      <SectionHeading>Summary</SectionHeading>
      <p>{text}</p>
    </div>
  );
}

function ExperienceSection({ entries }) {
  if (!entries.length) return null;
  return (
    <div className="creative-section">
      <SectionHeading>Experience</SectionHeading>
      {entries.map((entry) => (
        <div key={entry.id} className="creative-entry">
          <div className="creative-entry__row">
            <div>
              <h3>{entry.title}</h3>
              {entry.company && <p className="creative-sub">{entry.company}</p>}
            </div>
            <span className="creative-dates">
              {entry.startDate}{entry.startDate && ' — '}{entry.current ? 'Present' : entry.endDate}
            </span>
          </div>
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
    <div className="creative-section">
      <SectionHeading>Education</SectionHeading>
      {entries.map((entry) => (
        <div key={entry.id} className="creative-entry">
          <div className="creative-entry__row">
            <div>
              <h3>{entry.degree}{entry.field && ` in ${entry.field}`}</h3>
              {entry.school && <p className="creative-sub">{entry.school}</p>}
            </div>
            <span className="creative-dates">
              {entry.startDate}{entry.startDate && ' — '}{entry.endDate}
            </span>
          </div>
          {entry.gpa && <p>GPA: {entry.gpa}</p>}
        </div>
      ))}
    </div>
  );
}

function SkillsSection({ entries }) {
  if (!entries.length) return null;
  return (
    <div className="creative-section">
      <SectionHeading>Skills</SectionHeading>
      <div className="creative-skills">
        {entries.map((entry) => (
          <div key={entry.id} className="creative-skill-group">
            {entry.category && <span className="creative-skill-cat">{entry.category}</span>}
            <span>{entry.items}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectsSection({ entries }) {
  if (!entries.length) return null;
  return (
    <div className="creative-section">
      <SectionHeading>Projects</SectionHeading>
      {entries.map((entry) => (
        <div key={entry.id} className="creative-entry">
          <h3>
            {entry.name}
            {entry.link && <span className="creative-link"> — {entry.link}</span>}
          </h3>
          {entry.description && <p>{entry.description}</p>}
          {entry.technologies && (
            <div className="creative-tags">
              {entry.technologies.split(',').map((t, i) => (
                <span key={i} className="creative-tag">{t.trim()}</span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function CertificationsSection({ entries }) {
  if (!entries.length) return null;
  return (
    <div className="creative-section">
      <SectionHeading>Certifications</SectionHeading>
      {entries.map((entry) => (
        <div key={entry.id} className="creative-entry">
          <div className="creative-entry__row">
            <h3>{entry.name}{entry.issuer && <span className="creative-sub"> — {entry.issuer}</span>}</h3>
            {entry.date && <span className="creative-dates">{entry.date}</span>}
          </div>
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

export default function Creative() {
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
    <div className="template-root creative" style={style}>
      <header className="creative-header">
        <h1>{personalInfo.fullName || 'Your Name'}</h1>
        <div className="creative-contact">
          {[personalInfo.email, personalInfo.phone, personalInfo.location, personalInfo.linkedin, personalInfo.website]
            .filter(Boolean)
            .map((item, i) => (
              <span key={i}>{item}</span>
            ))}
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
