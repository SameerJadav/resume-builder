import { useState, forwardRef } from 'react';
import { useResume } from '../../hooks/useResume';
import { sectionMeta } from '../../data/sectionMeta';
import { PersonalInfoEditor } from './sections/PersonalInfoEditor';
import { SummaryEditor } from './sections/SummaryEditor';
import { ExperienceEditor } from './sections/ExperienceEditor';
import { EducationEditor } from './sections/EducationEditor';
import { SkillsEditor } from './sections/SkillsEditor';
import { ProjectsEditor } from './sections/ProjectsEditor';
import { CertificationsEditor } from './sections/CertificationsEditor';
import './SectionEditor.css';

const editorComponents = {
  personalInfo: PersonalInfoEditor,
  summary: SummaryEditor,
  experience: ExperienceEditor,
  education: EducationEditor,
  skills: SkillsEditor,
  projects: ProjectsEditor,
  certifications: CertificationsEditor,
};

export const SectionEditor = forwardRef(function SectionEditor(
  { sectionKey, dragHandleProps, isDragging, ...rest },
  ref,
) {
  const [collapsed, setCollapsed] = useState(false);
  const { resume, actions } = useResume();
  const meta = sectionMeta[sectionKey];
  const EditorComponent = editorComponents[sectionKey];
  const pageBreakActive = !!resume.pageBreaks?.[sectionKey];

  return (
    <div
      ref={ref}
      className={`section-editor ${isDragging ? 'section-editor--dragging' : ''}`}
      {...rest}
    >
      <div className="section-editor__header">
        <div className="section-editor__drag" {...dragHandleProps}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
            <circle cx="3" cy="2" r="1.2" />
            <circle cx="9" cy="2" r="1.2" />
            <circle cx="3" cy="6" r="1.2" />
            <circle cx="9" cy="6" r="1.2" />
            <circle cx="3" cy="10" r="1.2" />
            <circle cx="9" cy="10" r="1.2" />
          </svg>
        </div>
        <button
          className="section-editor__toggle"
          onClick={() => setCollapsed(!collapsed)}
          type="button"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className={`section-editor__chevron ${collapsed ? '' : 'section-editor__chevron--open'}`}
          >
            <polyline points="4,5 7,8 10,5" />
          </svg>
          <span>{meta.label}</span>
        </button>
        {sectionKey !== 'personalInfo' && (
          <button
            className={`section-editor__page-break ${pageBreakActive ? 'section-editor__page-break--active' : ''}`}
            onClick={() => actions.toggleSectionPageBreak(sectionKey)}
            type="button"
            title="Force this section to start on a new page"
            aria-pressed={pageBreakActive}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="2" y1="4" x2="12" y2="4" />
              <line x1="2" y1="7" x2="4" y2="7" />
              <line x1="6" y1="7" x2="8" y2="7" />
              <line x1="10" y1="7" x2="12" y2="7" />
              <line x1="2" y1="10" x2="12" y2="10" />
              <polyline points="5,12 7,14 9,12" />
            </svg>
          </button>
        )}
        {meta.isList && (
          <button
            className="section-editor__add"
            onClick={() => actions.addEntry(sectionKey)}
            type="button"
            title={`Add ${meta.entryLabel}`}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="7" y1="2" x2="7" y2="12" />
              <line x1="2" y1="7" x2="12" y2="7" />
            </svg>
          </button>
        )}
      </div>
      {!collapsed && (
        <div className="section-editor__body">
          <EditorComponent />
        </div>
      )}
    </div>
  );
});
