import { Fragment, useEffect, useRef, useState } from 'react';
import { useResume } from '../../hooks/useResume';
import { templates } from '../templates/index';
import { usePaginatedContent } from '../../hooks/usePaginatedContent';
import './PreviewPanel.css';

const PAGE_WIDTH = 816;
const PAGE_HEIGHT = 1056;

function Pages({ pages, rootClass, style, pageMargin, paginate }) {
  return (
    <>
      {pages.map((pageBlocks, i) => (
        <div
          key={i}
          className={`preview-page ${paginate ? '' : 'preview-page--no-paginate'}`}
          style={paginate ? { padding: `${pageMargin}px` } : undefined}
        >
          <div className={`template-root ${rootClass}`} style={style}>
            {pageBlocks.map((b) => (
              <Fragment key={b.key}>{b.node}</Fragment>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}

export function PreviewPanel() {
  const { resume, settings, printRef } = useResume();
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
  const { rootClass, style, blocks, paginate } = template.getBlocks({ resume, settings });
  const forcedBreaks = resume.pageBreaks || {};

  const { pages, measureRef } = usePaginatedContent({
    blocks,
    pageHeight: PAGE_HEIGHT,
    pageMargin: settings.pageMargin,
    forcedBreaks,
  });

  const renderedPages = paginate ? pages : [blocks];

  return (
    <div className="preview-panel" ref={containerRef}>
      {paginate && (
        <div
          ref={measureRef}
          className={`preview-measurer template-root ${rootClass}`}
          style={{ ...style, width: PAGE_WIDTH - 2 * settings.pageMargin }}
          aria-hidden="true"
        >
          {blocks.map((b) => (
            <Fragment key={b.key}>{b.node}</Fragment>
          ))}
        </div>
      )}
      <div className="preview-page-scaler" style={{ zoom: scale }}>
        <div className="preview-pages" ref={printRef}>
          <Pages
            pages={renderedPages}
            rootClass={rootClass}
            style={style}
            pageMargin={settings.pageMargin}
            paginate={paginate}
          />
        </div>
      </div>
    </div>
  );
}
