import { useReactToPrint } from 'react-to-print';
import { useResume } from '../../hooks/useResume';
import { TemplatePicker } from './TemplatePicker';
import { StyleControls } from './StyleControls';
import './Toolbar.css';

export function Toolbar() {
  const { actions, printRef } = useResume();

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    pageStyle: `
      @page { size: letter; margin: 0; }
      body { margin: 0; padding: 0; }
      .preview-pages { gap: 0 !important; }
      .preview-page {
        box-shadow: none !important;
        break-after: page;
        page-break-after: always;
      }
      .preview-page:last-child {
        break-after: auto;
        page-break-after: auto;
      }
    `,
  });

  return (
    <div className="toolbar">
      <TemplatePicker />
      <div className="toolbar__divider" />
      <StyleControls />
      <div className="toolbar__spacer" />
      <div className="toolbar__actions">
        <button
          type="button"
          className="toolbar__btn toolbar__btn--secondary"
          onClick={actions.resetResume}
          title="Clear all data and start fresh"
        >
          Clear
        </button>
        <button
          type="button"
          className="toolbar__btn toolbar__btn--secondary"
          onClick={actions.loadSample}
          title="Load sample resume data"
        >
          Sample
        </button>
        <button
          type="button"
          className="toolbar__btn toolbar__btn--primary"
          onClick={handlePrint}
          title="Print or save as PDF"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 6V1h8v5" />
            <path d="M4 12H2V7h12v5h-2" />
            <rect x="4" y="10" width="8" height="5" />
          </svg>
          Print / PDF
        </button>
      </div>
    </div>
  );
}
