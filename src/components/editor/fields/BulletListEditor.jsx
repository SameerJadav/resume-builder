import './fields.css';

export function BulletListEditor({ bullets, onUpdate, onAdd, onRemove }) {
  return (
    <div className="bullet-list">
      <span className="field__label">Bullet Points</span>
      {bullets.map((bullet, i) => (
        <div key={i} className="bullet-list__item">
          <span className="bullet-list__marker">-</span>
          <input
            type="text"
            className="field__input"
            value={bullet}
            onChange={(e) => onUpdate(i, e.target.value)}
            placeholder="Describe an achievement or responsibility..."
          />
          <button
            type="button"
            className="bullet-list__remove"
            onClick={() => onRemove(i)}
            title="Remove bullet"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="3" x2="9" y2="9" />
              <line x1="9" y1="3" x2="3" y2="9" />
            </svg>
          </button>
        </div>
      ))}
      <button type="button" className="bullet-list__add" onClick={onAdd}>
        + Add bullet point
      </button>
    </div>
  );
}
