import { use } from 'react';
import { ResumeContext } from '../context/ResumeContext';

export function useResume() {
  const ctx = use(ResumeContext);
  if (!ctx) throw new Error('useResume must be used within ResumeProvider');
  return ctx;
}
