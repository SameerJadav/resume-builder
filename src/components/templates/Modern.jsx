/* eslint-disable react-refresh/only-export-components */
import './shared.css';
import './Modern.css';

const sidebarSections = ['personalInfo', 'skills', 'certifications'];

function ContactInfo({ info }) {
  const items = [
    { label: 'Email', value: info.email },
    { label: 'Phone', value: info.phone },
    { label: 'Location', value: info.location },
    { label: 'LinkedIn', value: info.linkedin },
    { label: 'Website', value: info.website },
  ].filter((i) => i.value);

  if (!items.length) return null;
  return (
    <div className="modern-sidebar-section">
      <h2>Contact</h2>
      <div className="modern-contact-list">
        {items.map((item) => (
          <div key={item.label} className="modern-contact-item">
            <span className="modern-contact-label">{item.label}</span>
            <span>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SidebarSkills({ entries }) {
  if (!entries.length) return null;
  return (
    <div className="modern-sidebar-section">
      <h2>Skills</h2>
      {entries.map((entry) => (
        <div key={entry.id} className="modern-skill-group">
          {entry.category && <h3>{entry.category}</h3>}
          <p>{entry.items}</p>
        </div>
      ))}
    </div>
  );
}

function SidebarCertifications({ entries }) {
  if (!entries.length) return null;
  return (
    <div className="modern-sidebar-section">
      <h2>Certifications</h2>
      {entries.map((entry) => (
        <div key={entry.id} className="modern-cert">
          <strong>{entry.name}</strong>
          {entry.issuer && <p>{entry.issuer}</p>}
          {entry.date && <p className="modern-date">{entry.date}</p>}
        </div>
      ))}
    </div>
  );
}

function MainSummary({ text }) {
  if (!text) return null;
  return (
    <div className="modern-main-section">
      <h2>Summary</h2>
      <p>{text}</p>
    </div>
  );
}

function MainExperience({ entries }) {
  if (!entries.length) return null;
  return (
    <div className="modern-main-section">
      <h2>Experience</h2>
      {entries.map((entry) => (
        <div key={entry.id} className="modern-entry">
          <div className="modern-entry__row">
            <h3>{entry.title}</h3>
            <span className="modern-date">
              {entry.startDate}{entry.startDate && ' — '}{entry.current ? 'Present' : entry.endDate}
            </span>
          </div>
          {entry.company && <p className="modern-company">{entry.company}</p>}
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

function MainEducation({ entries }) {
  if (!entries.length) return null;
  return (
    <div className="modern-main-section">
      <h2>Education</h2>
      {entries.map((entry) => (
        <div key={entry.id} className="modern-entry">
          <div className="modern-entry__row">
            <h3>
              {entry.degree}{entry.field && ` in ${entry.field}`}
            </h3>
            <span className="modern-date">
              {entry.startDate}{entry.startDate && ' — '}{entry.endDate}
            </span>
          </div>
          {entry.school && <p className="modern-company">{entry.school}</p>}
          {entry.gpa && <p>GPA: {entry.gpa}</p>}
        </div>
      ))}
    </div>
  );
}

function MainProjects({ entries }) {
  if (!entries.length) return null;
  return (
    <div className="modern-main-section">
      <h2>Projects</h2>
      {entries.map((entry) => (
        <div key={entry.id} className="modern-entry">
          <h3>{entry.name}</h3>
          {entry.description && <p>{entry.description}</p>}
          {entry.technologies && <p className="modern-tech">{entry.technologies}</p>}
          {entry.link && <p className="modern-link">{entry.link}</p>}
        </div>
      ))}
    </div>
  );
}

const mainRenderers = {
  summary: (resume) => <MainSummary text={resume.summary.text} />,
  experience: (resume) => <MainExperience entries={resume.experience} />,
  education: (resume) => <MainEducation entries={resume.education} />,
  projects: (resume) => <MainProjects entries={resume.projects} />,
};

function ModernLayout({ resume }) {
  const { personalInfo } = resume;
  return (
    <div className="modern-layout">
      <div className="modern-sidebar">
        <div className="modern-sidebar__name">
          <h1>{personalInfo.fullName || 'Your Name'}</h1>
        </div>
        <ContactInfo info={personalInfo} />
        <SidebarSkills entries={resume.skills} />
        <SidebarCertifications entries={resume.certifications} />
      </div>
      <div className="modern-main">
        {resume.sectionOrder
          .filter((key) => !sidebarSections.includes(key) && mainRenderers[key])
          .map((key) => (
            <div key={key}>{mainRenderers[key](resume)}</div>
          ))}
      </div>
    </div>
  );
}

export function getModernBlocks({ resume, settings }) {
  const style = {
    '--accent': settings.accentColor,
    '--font-family': settings.fontFamily,
    '--font-size': `${settings.fontSize}pt`,
    '--line-height': settings.lineHeight,
    '--section-spacing': `${settings.sectionSpacing}px`,
    '--page-margin': `${settings.pageMargin}px`,
  };

  const blocks = [
    { key: 'modern-layout', node: <ModernLayout resume={resume} /> },
  ];

  return { rootClass: 'modern', style, blocks, paginate: false };
}
