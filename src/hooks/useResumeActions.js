import { defaultResume } from '../data/defaultResume';
import { sampleResume } from '../data/sampleResume';

export function useResumeActions(resume, setResume) {
  function reorderSections(newOrder) {
    setResume({ ...resume, sectionOrder: newOrder });
  }

  function updatePersonalInfo(field, value) {
    setResume({
      ...resume,
      personalInfo: { ...resume.personalInfo, [field]: value },
    });
  }

  function updateSummary(text) {
    setResume({
      ...resume,
      summary: { text },
    });
  }

  function addEntry(sectionKey) {
    const templates = {
      experience: {
        id: crypto.randomUUID(),
        company: '',
        title: '',
        startDate: '',
        endDate: '',
        current: false,
        bullets: [''],
      },
      education: {
        id: crypto.randomUUID(),
        school: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
        gpa: '',
      },
      skills: {
        id: crypto.randomUUID(),
        category: '',
        items: '',
      },
      projects: {
        id: crypto.randomUUID(),
        name: '',
        description: '',
        technologies: '',
        link: '',
      },
      certifications: {
        id: crypto.randomUUID(),
        name: '',
        issuer: '',
        date: '',
      },
    };
    setResume({
      ...resume,
      [sectionKey]: [...resume[sectionKey], templates[sectionKey]],
    });
  }

  function removeEntry(sectionKey, entryId) {
    setResume({
      ...resume,
      [sectionKey]: resume[sectionKey].filter((e) => e.id !== entryId),
    });
  }

  function updateEntry(sectionKey, entryId, field, value) {
    setResume({
      ...resume,
      [sectionKey]: resume[sectionKey].map((e) =>
        e.id === entryId ? { ...e, [field]: value } : e,
      ),
    });
  }

  function addBullet(sectionKey, entryId) {
    setResume({
      ...resume,
      [sectionKey]: resume[sectionKey].map((e) =>
        e.id === entryId ? { ...e, bullets: [...e.bullets, ''] } : e,
      ),
    });
  }

  function removeBullet(sectionKey, entryId, bulletIndex) {
    setResume({
      ...resume,
      [sectionKey]: resume[sectionKey].map((e) =>
        e.id === entryId
          ? { ...e, bullets: e.bullets.filter((_, i) => i !== bulletIndex) }
          : e,
      ),
    });
  }

  function updateBullet(sectionKey, entryId, bulletIndex, value) {
    setResume({
      ...resume,
      [sectionKey]: resume[sectionKey].map((e) =>
        e.id === entryId
          ? {
              ...e,
              bullets: e.bullets.map((b, i) =>
                i === bulletIndex ? value : b,
              ),
            }
          : e,
      ),
    });
  }

  function toggleSectionPageBreak(sectionKey) {
    const current = resume.pageBreaks || {};
    setResume({
      ...resume,
      pageBreaks: { ...current, [sectionKey]: !current[sectionKey] },
    });
  }

  function resetResume() {
    setResume(defaultResume);
  }

  function loadSample() {
    setResume(sampleResume);
  }

  return {
    reorderSections,
    updatePersonalInfo,
    updateSummary,
    addEntry,
    removeEntry,
    updateEntry,
    addBullet,
    removeBullet,
    updateBullet,
    toggleSectionPageBreak,
    resetResume,
    loadSample,
  };
}
