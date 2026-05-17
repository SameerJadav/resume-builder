/* eslint-disable react-refresh/only-export-components */
import './shared.css';
import './Executive.css';

function ExecutiveHeader({ personalInfo }) {
  return (
    <header className="exec-header">
      <h1>{personalInfo.fullName || 'Your Name'}</h1>
      <div className="exec-contact">
        {[personalInfo.email, personalInfo.phone, personalInfo.location].filter(Boolean).join('  |  ')}
      </div>
      <div className="exec-contact">
        {[personalInfo.linkedin, personalInfo.website].filter(Boolean).join('  |  ')}
      </div>
    </header>
  );
}

function SectionHeading({ children }) {
  return <h2 className="exec-heading">{children}</h2>;
}

function SummarySection({ text }) {
  if (!text) return null;
  return (
    <div className="exec-section">
      <SectionHeading>Professional Summary</SectionHeading>
      <p>{text}</p>
    </div>
  );
}

function ExperienceSection({ entries }) {
  if (!entries.length) return null;
  return (
    <div className="exec-section">
      <SectionHeading>Professional Experience</SectionHeading>
      {entries.map((entry) => (
        <div key={entry.id} className="exec-entry">
          <div className="exec-entry__top">
            <div>
              <h3>{entry.title}</h3>
              {entry.company && <p className="exec-org">{entry.company}</p>}
            </div>
            <span className="exec-dates">
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
    <div className="exec-section">
      <SectionHeading>Education</SectionHeading>
      {entries.map((entry) => (
        <div key={entry.id} className="exec-entry">
          <div className="exec-entry__top">
            <div>
              <h3>{entry.degree}{entry.field && ` in ${entry.field}`}</h3>
              {entry.school && <p className="exec-org">{entry.school}</p>}
            </div>
            <span className="exec-dates">
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
    <div className="exec-section">
      <SectionHeading>Core Competencies</SectionHeading>
      <div className="exec-skills">
        {entries.map((entry) => (
          <div key={entry.id}>
            {entry.category && <strong>{entry.category}: </strong>}
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
    <div className="exec-section">
      <SectionHeading>Key Projects</SectionHeading>
      {entries.map((entry) => (
        <div key={entry.id} className="exec-entry">
          <h3>{entry.name}</h3>
          {entry.description && <p>{entry.description}</p>}
          {entry.technologies && <p className="exec-tech">{entry.technologies}</p>}
        </div>
      ))}
    </div>
  );
}

function CertificationsSection({ entries }) {
  if (!entries.length) return null;
  return (
    <div className="exec-section">
      <SectionHeading>Certifications</SectionHeading>
      {entries.map((entry) => (
        <div key={entry.id} className="exec-entry">
          <div className="exec-entry__top">
            <h3>{entry.name}{entry.issuer && <span className="exec-issuer"> — {entry.issuer}</span>}</h3>
            {entry.date && <span className="exec-dates">{entry.date}</span>}
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

export function getExecutiveBlocks({ resume, settings }) {
  const style = {
    '--accent': settings.accentColor,
    '--font-family': settings.fontFamily,
    '--font-size': `${settings.fontSize}pt`,
    '--line-height': settings.lineHeight,
    '--section-spacing': `${settings.sectionSpacing}px`,
    '--page-margin': `${settings.pageMargin}px`,
  };

  const blocks = [
    { key: 'personalInfo', node: <ExecutiveHeader personalInfo={resume.personalInfo} /> },
    ...resume.sectionOrder
      .filter((key) => key !== 'personalInfo' && sectionRenderers[key])
      .map((key) => ({ key, node: sectionRenderers[key](resume) })),
  ].filter((b) => b.node !== null);

  return { rootClass: 'executive', style, blocks, paginate: true };
}
