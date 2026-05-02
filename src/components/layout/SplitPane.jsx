import { useState, useRef } from 'react';
import './SplitPane.css';

export function SplitPane({ left, right }) {
  const [editorWidth, setEditorWidth] = useState(480);
  const dragging = useRef(false);

  function handlePointerDown(e) {
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function handlePointerMove(e) {
    if (!dragging.current) return;
    const newWidth = Math.min(Math.max(320, e.clientX), window.innerWidth - 400);
    setEditorWidth(newWidth);
  }

  function handlePointerUp() {
    dragging.current = false;
  }

  return (
    <div
      className="split-pane"
      style={{ '--editor-width': `${editorWidth}px` }}
    >
      <div className="split-pane__left">{left}</div>
      <div
        className="split-pane__divider"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <div className="split-pane__divider-handle" />
      </div>
      <div className="split-pane__right">{right}</div>
    </div>
  );
}
