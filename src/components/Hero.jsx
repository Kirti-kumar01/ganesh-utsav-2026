const rays = Array.from({ length: 36 }, (_, i) => {
  const a = (i * 10 * Math.PI) / 180;
  const x1 = 100 + Math.cos(a) * 70;
  const y1 = 100 + Math.sin(a) * 70;
  const outer = i % 2 ? 90 : 84;
  const x2 = 100 + Math.cos(a) * outer;
  const y2 = 100 + Math.sin(a) * outer;
  return { x1, y1, x2, y2, key: i };
});

export default function Hero({ counts }) {
  const pct = counts.total ? Math.round((counts.done / counts.total) * 100) : 0;
  const C = 2 * Math.PI * 50;
  const offset = C * (1 - pct / 100);

  return (
    <header className="hero">
      <div className="mandala" aria-hidden="true">
        <svg viewBox="0 0 200 200">
          <defs>
            <radialGradient id="aura" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffb62e" stopOpacity=".55" />
              <stop offset="70%" stopColor="#e23c2e" stopOpacity=".05" />
              <stop offset="100%" stopColor="#e23c2e" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="100" cy="100" r="95" fill="url(#aura)" />
          <g className="rays" stroke="#f4cd6a" strokeWidth="1.4" opacity=".65">
            {rays.map((r) => (
              <line key={r.key} x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2} />
            ))}
          </g>
          <circle
            cx="100"
            cy="100"
            r="60"
            fill="none"
            stroke="#c9932f"
            strokeWidth="1.2"
            opacity=".7"
          />
          <circle
            cx="100"
            cy="100"
            r="66"
            fill="none"
            stroke="#c9932f"
            strokeWidth=".6"
            opacity=".5"
            strokeDasharray="2 4"
          />
          <text className="om" x="100" y="126" textAnchor="middle">
            ॐ
          </text>
          <g transform="translate(44,150)">
            <ellipse cx="0" cy="6" rx="13" ry="5" fill="#7a2418" />
            <path d="M-13 6 Q0 15 13 6 Z" fill="#a8341f" />
            <path
              className="flame"
              d="M0 -12 C4 -6 4 -1 0 2 C-4 -1 -4 -6 0 -12Z"
              fill="#ffb62e"
            />
          </g>
          <g transform="translate(156,150)">
            <ellipse cx="0" cy="6" rx="13" ry="5" fill="#7a2418" />
            <path d="M-13 6 Q0 15 13 6 Z" fill="#a8341f" />
            <path
              className="flame b"
              d="M0 -12 C4 -6 4 -1 0 2 C-4 -1 -4 -6 0 -12Z"
              fill="#ffb62e"
            />
          </g>
        </svg>
      </div>

      <div className="brand">
        <img src="/cft logo.png" alt="Codes for Tomorrow" />
      </div>
      <h1>
        Shree <span className="glow">Ganesh</span> Utsav
      </h1>
      <div className="dates">
        <span className="date-pill">
          <b>Sthapana</b> · 14th Sept
        </span>
        <span className="date-pill">
          <b>Sundar Kaand</b> · 18th Sept
        </span>
        <span className="date-pill">
          <b>Visarjan</b> · 25th Sept
        </span>
        <span className="date-pill">10 Days of Seva</span>
      </div>

      <div className="progress-band">
        <div className="ring">
          <svg width="118" height="118" viewBox="0 0 118 118">
            <defs>
              <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#ffb62e" />
                <stop offset="100%" stopColor="#39a06b" />
              </linearGradient>
            </defs>
            <circle className="ring-track" cx="59" cy="59" r="50" />
            <circle
              className="ring-fill"
              cx="59"
              cy="59"
              r="50"
              style={{ strokeDasharray: C, strokeDashoffset: offset }}
            />
          </svg>
          <div className="ring-num">
            <span className="pct">{pct}%</span>
            <span className="lbl">COMPLETE</span>
          </div>
        </div>
        <div className="stats">
          <div className="stat total">
            <div className="n">{counts.total}</div>
            <div className="t">Total tasks</div>
          </div>
          <div className="stat done">
            <div className="n">{counts.done}</div>
            <div className="t">Completed</div>
          </div>
          <div className="stat prog">
            <div className="n">{counts.progress}</div>
            <div className="t">In progress</div>
          </div>
          <div className="stat todo">
            <div className="n">{counts.todo}</div>
            <div className="t">Not started</div>
          </div>
        </div>
      </div>
    </header>
  );
}
