import { useState } from 'react';

function Slot({ dayId, slot, icon, label, names, isAdmin, onSave }) {
  const [val, setVal] = useState('');

  const add = () => {
    const parts = val.split(',').map((s) => s.trim()).filter(Boolean);
    if (parts.length === 0) return;
    onSave(dayId, slot, [...names, ...parts]);
    setVal('');
  };
  const remove = (i) => onSave(dayId, slot, names.filter((_, x) => x !== i));

  return (
    <div className="pslot">
      <div className="pslot-head"><span className="pslot-icon">{icon}</span>{label}</div>
      <div className="pnames">
        {names.length === 0 && !isAdmin && <span className="pnone">—</span>}
        {names.map((n, i) => (
          <span key={i} className="pchip">
            {n}
            {isAdmin && (
              <button className="pchip-x" onClick={() => remove(i)} aria-label={`Remove ${n}`}>×</button>
            )}
          </span>
        ))}
      </div>
      {isAdmin && (
        <div className="padd">
          <input
            type="text"
            placeholder="Add name(s), comma-separated…"
            value={val}
            onChange={(e) => setVal(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') add(); }}
          />
          <button onClick={add} disabled={!val.trim()}>Add</button>
        </div>
      )}
    </div>
  );
}

export default function PrasadBoard({ days, prasad, isAdmin, onSave }) {
  if (!days || days.length === 0) return null;
  return (
    <section className="prasad">
      <div className="prasad-title">
        <span className="prasad-om">ॐ</span>
        <h2>Daily Prasad Seva</h2>
        <p>Who is offering prasad each morning &amp; evening{isAdmin ? ' — add one or more names per slot' : ''}</p>
      </div>
      <div className="prasad-grid">
        {days.map((d) => {
          const p = prasad[d.id] || { morning: [], evening: [] };
          return (
            <div className="pday" key={d.id}>
              <div className="pday-head">
                <span className="pday-date">{d.date}</span>
                <span className="pday-dow">{d.dow}</span>
              </div>
              <Slot dayId={d.id} slot="morning" icon="🌅" label="Morning" names={p.morning || []} isAdmin={isAdmin} onSave={onSave} />
              <Slot dayId={d.id} slot="evening" icon="🌇" label="Evening" names={p.evening || []} isAdmin={isAdmin} onSave={onSave} />
            </div>
          );
        })}
      </div>
    </section>
  );
}
