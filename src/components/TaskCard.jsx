import { useRef, useState, useEffect } from 'react';

const STATUS_LABEL = { todo: 'Not started', progress: 'In progress', done: 'Completed ✓' };
const initials = (n) => n.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase();

function celebrate(el) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !el) return;
  const rect = el.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + 40;
  const colors = ['#ffb62e', '#ff8a1e', '#f4cd6a', '#e23c2e', '#39a06b'];
  for (let i = 0; i < 18; i++) {
    const p = document.createElement('div');
    const size = 6 + Math.random() * 7;
    p.style.cssText = `position:fixed;left:${cx}px;top:${cy}px;width:${size}px;height:${size}px;` +
      `background:${colors[i % colors.length]};border-radius:50% 0 50% 50%;z-index:50;pointer-events:none;` +
      `transform:rotate(${Math.random() * 360}deg)`;
    document.body.appendChild(p);
    const ang = Math.random() * Math.PI * 2;
    const dist = 60 + Math.random() * 90;
    const dx = Math.cos(ang) * dist;
    const dy = Math.sin(ang) * dist - 40;
    p.animate(
      [
        { transform: 'translate(0,0) rotate(0deg)', opacity: 1 },
        { transform: `translate(${dx}px,${dy + 120}px) rotate(${Math.random() * 540}deg)`, opacity: 0 },
      ],
      { duration: 1100 + Math.random() * 500, easing: 'cubic-bezier(.2,.7,.3,1)' }
    ).onfinish = () => p.remove();
  }
}

export default function TaskCard({ task, status, comment, isAdmin, onSetStatus, onSaveComment }) {
  const ref = useRef(null);
  const [draft, setDraft] = useState(comment || '');
  const [saved, setSaved] = useState(false);

  useEffect(() => { setDraft(comment || ''); }, [comment]);

  const handleSet = (val) => {
    if (val === 'done' && status !== 'done') celebrate(ref.current);
    onSetStatus(task.id, val);
  };

  const dirty = draft.trim() !== (comment || '').trim();
  const saveNote = () => {
    onSaveComment(task.id, draft.trim());
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  return (
    <article className="card" data-status={status} ref={ref}>
      <div className="card-top">
        <span className="cat">{task.cat}</span>
        <span className="num">#{task.num}</span>
      </div>
      <h3>{task.title}</h3>
      <div className="daytags">
        {task.days.map((d) => <span key={d} className="daytag">{d}</span>)}
      </div>
      <div className="people">
        {task.people.length ? (
          task.people.map((p) => (
            <span key={p} className="who"><span className="av">{initials(p)}</span>{p}</span>
          ))
        ) : (
          <span className="who empty">⚠ Owner needed</span>
        )}
      </div>

      {isAdmin ? (
        <>
          <div className="statusbar" role="group" aria-label="Set status">
            <button className={'sbtn' + (status === 'todo' ? ' on-todo' : '')} onClick={() => handleSet('todo')}>To do</button>
            <button className={'sbtn' + (status === 'progress' ? ' on-progress' : '')} onClick={() => handleSet('progress')}>Doing</button>
            <button className={'sbtn' + (status === 'done' ? ' on-done' : '')} onClick={() => handleSet('done')}>Done ✓</button>
          </div>
          <div className="note-edit">
            <textarea
              className="note-input"
              placeholder="Add a note for this task…"
              value={draft}
              rows={2}
              maxLength={500}
              onChange={(e) => setDraft(e.target.value)}
            />
            <button className="note-save" onClick={saveNote} disabled={!dirty}>
              {saved ? 'Saved ✓' : 'Save note'}
            </button>
          </div>
        </>
      ) : (
        <>
          <div className={'badge ' + status}>{STATUS_LABEL[status]}</div>
          {comment ? (
            <div className="note-view"><span className="note-icon">📝</span><span>{comment}</span></div>
          ) : null}
        </>
      )}
    </article>
  );
}
