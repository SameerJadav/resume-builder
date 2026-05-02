import { useResume } from '../../../hooks/useResume';
import { TextArea } from '../fields/TextArea';
import './sections.css';

export function SummaryEditor() {
  const { resume, actions } = useResume();

  return (
    <div className="section-form">
      <TextArea
        label="Professional Summary"
        value={resume.summary.text}
        onChange={(v) => actions.updateSummary(v)}
        placeholder="Write a brief professional summary..."
        rows={4}
      />
    </div>
  );
}
