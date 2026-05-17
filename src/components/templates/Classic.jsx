/* eslint-disable react-refresh/only-export-components */
import './shared.css';
import './Classic.css';

function ClassicHeader({ personalInfo }) {
  return (
    <header className="classic-header">
      <h1>{personalInfo.fullName || 'Your Name'}</h1>
      <div className="classic-contact">
        {[personalInfo.email, personalInfo.phone, personalInfo.location, personalInfo.linkedin, personalInfo.website]
          .filter(Boolean)
          .map((item, i) => (
            <span key={i}>{item}</span>
          ))}
      </div>
    </header>
  );
}

function SectionHeading({ children }) {
  return (
    <div className="classic-section-heading">
      <h2>{children}</h2>
    </div>
  );
}

function ExperienceSection({ entries }) {
  if (!entries.length) return null;
  return (
    <div className="classic-section">
      <SectionHeading>Work Experience</SectionHeading>
      {entries.map((entry) => (
        <div key={entry.id} className="classic-entry">
          <div className="classic-entry__row">
            <h3>{entry.title}{entry.company && `, ${entry.company}`}</h3>
            <span className="classic-entry__dates">
              {entry.startDate}{entry.startDate && ' — '}{entry.current ? 'Present' : entry.endDate}
            </span>
          </div>
          {entry.bullets.length > 0 && entry.bullets.some((b) => b) && (
            <ul>
              {entry.bullets.map((bullet, i) =>
                bullet ? <li key={i}>{bullet}</li> : null,
              )}
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
    <div className="classic-section">
      <SectionHeading>Education</SectionHeading>
      {entries.map((entry) => (
        <div key={entry.id} className="classic-entry">
          <div className="classic-entry__row">
            <h3>
              {entry.degree}{entry.field && ` in ${entry.field}`}
              {entry.school && `, ${entry.school}`}
            </h3>
            <span className="classic-entry__dates">
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
    <div className="classic-section">
      <SectionHeading>Skills</SectionHeading>
      <div className="classic-skills">
        {entries.map((entry) => (
          <div key={entry.id} className="classic-skill-row">
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
    <div className="classic-section">
      <SectionHeading>Projects</SectionHeading>
      {entries.map((entry) => (
        <div key={entry.id} className="classic-entry">
          <div className="classic-entry__row">
            <h3>
              {entry.name}
              {entry.link && (
                <> — <span className="classic-link">{entry.link}</span></>
              )}
            </h3>
          </div>
          {entry.description && <p>{entry.description}</p>}
          {entry.technologies && (
            <p className="classic-tech">{entry.technologies}</p>
          )}
        </div>
      ))}
    </div>
  );
}

function CertificationsSection({ entries }) {
  if (!entries.length) return null;
  return (
    <div className="classic-section">
      <SectionHeading>Certifications</SectionHeading>
      {entries.map((entry) => (
        <div key={entry.id} className="classic-entry">
          <div className="classic-entry__row">
            <h3>{entry.name}{entry.issuer && `, ${entry.issuer}`}</h3>
            <span className="classic-entry__dates">{entry.date}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function SummarySection({ text }) {
  if (!text) return null;
  return (
    <div className="classic-section">
      <SectionHeading>Summary</SectionHeading>
      <p>{text}</p>
    </div>
  );
}

const sectionRenderers = {
  summary: (resume) => <SummarySection text={resume.summary.text} />,
  experience: (resume) => <ExperienceSection entries={resume.experience} />,
  education: (resume) => <EducationSection entries={resume.education} />,
  skills: (resume) => <SkillsSection entries={resume.skills} />,
  projects: (resume) => <ProjectsSection entries={resume.projects} />,
  certifications: (resume) => <CertificationsSection entries={resume.certifications} />,
};

export function getClassicBlocks({ resume, settings }) {
  const style = {
    '--accent': settings.accentColor,
    '--font-family': settings.fontFamily,
    '--font-size': `${settings.fontSize}pt`,
    '--line-height': settings.lineHeight,
    '--section-spacing': `${settings.sectionSpacing}px`,
    '--page-margin': `${settings.pageMargin}px`,
  };

  const blocks = [
    { key: 'personalInfo', node: <ClassicHeader personalInfo={resume.personalInfo} /> },
    ...resume.sectionOrder
      .filter((key) => key !== 'personalInfo' && sectionRenderers[key])
      .map((key) => ({ key, node: sectionRenderers[key](resume) })),
  ].filter((b) => b.node !== null);

  return { rootClass: 'classic', style, blocks, paginate: true };
}
