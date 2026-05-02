import { useRef, useState, useEffect } from 'react';
import { useResume } from '../../hooks/useResume';
import { templates } from '../templates/index';
import './PreviewPanel.css';

const PAGE_WIDTH = 816;

export function PreviewPanel() {
  const { settings, printRef } = useResume();
  const containerRef = useRef(null);
  const [scale, setScale] = useState(0.6);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      const available = entry.contentRect.width - 48;
      setScale(Math.min(1, available / PAGE_WIDTH));
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const template = templates.find((t) => t.id === settings.templateId) || templates[0];
  const TemplateComponent = template.component;

  return (
    <div className="preview-panel" ref={containerRef}>
      <div className="preview-page-scaler" style={{ zoom: scale }}>
        <div className="preview-page" ref={printRef}>
          <TemplateComponent />
        </div>
      </div>
    </div>
  );
}
