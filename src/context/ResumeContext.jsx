import { createContext, useRef } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useResumeActions } from '../hooks/useResumeActions';
import { sampleResume } from '../data/sampleResume';
import { defaultSettings } from '../data/defaultSettings';

// eslint-disable-next-line react-refresh/only-export-components
export const ResumeContext = createContext(null);

export function ResumeProvider({ children }) {
  const [resume, setResume] = useLocalStorage('resume-data', sampleResume);
  const [settings, setSettings] = useLocalStorage('resume-settings', defaultSettings);
  const actions = useResumeActions(resume, setResume);

  const printRef = useRef(null);

  return (
    <ResumeContext value={{ resume, settings, setSettings, actions, printRef }}>
      {children}
    </ResumeContext>
  );
}
