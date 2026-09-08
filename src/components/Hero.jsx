const rays = Array.from({ length: 36 }, (_, i) => {
  const a = (i * 10 * Math.PI) / 180;
  const x1 = 100 + Math.cos(a) * 88;
  const y1 = 100 + Math.sin(a) * 88;
  const outer = i % 2 ? 96 : 92;
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
          <circle cx="100" cy="100" r="82" fill="none" stroke="#c9932f" strokeWidth="1" opacity=".6" />
          <circle cx="100" cy="100" r="86" fill="none" stroke="#c9932f" strokeWidth=".5" opacity=".45" strokeDasharray="2 4" />

          <g className="ganesha" fill="none" stroke="#f4cd6a" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M100 26 C103 31 103 35 100 39 C97 35 97 31 100 26 Z" fill="#ffb62e" stroke="none" />
            <circle cx="100" cy="42" r="2.4" fill="#f4cd6a" stroke="none" />
            <path d="M79 62 C79 44 88 34 100 34 C112 34 121 44 121 62" fill="#5a1122" />
            <path d="M74 62 L126 62" strokeWidth="3.2" />
            <path d="M86 52 L100 44 L114 52" strokeWidth="1.6" opacity=".85" />
            <path d="M72 68 C44 62 32 86 44 106 C50 118 66 120 76 110" fill="#5a1122" />
            <path d="M128 68 C156 62 168 86 156 106 C150 118 134 120 124 110" fill="#5a1122" />
            <path d="M66 78 C56 82 54 96 62 104" strokeWidth="1.6" opacity=".8" />
            <path d="M134 78 C144 82 146 96 138 104" strokeWidth="1.6" opacity=".8" />
            <path d="M74 64 C70 92 78 116 100 120 C122 116 130 92 126 64" fill="#5a1122" />
            <path d="M80 88 C84 84 92 84 96 89" strokeWidth="2.2" />
            <path d="M104 89 C108 84 116 84 120 88" strokeWidth="2.2" />
            <path d="M94 64 C94 74 100 80 100 80 C100 80 106 74 106 64" stroke="#e23c2e" strokeWidth="2.2" />
            <path d="M100 64 L100 79" stroke="#ffb62e" strokeWidth="1.8" />
            <path d="M100 90 C100 104 101 116 99 126 C97 137 88 140 83 133 C80 129 82 123 88 123" strokeWidth="4.2" />
            <path d="M90 116 C88 123 88 128 91 132" strokeWidth="2.6" />
            <path d="M110 116 C111 121 111 124 110 127" strokeWidth="2.6" />
            <path d="M83 133 C80 138 82 143 88 143 C93 143 95 138 92 134" fill="#ffb62e" strokeWidth="1.6" />
            <path d="M70 118 C74 128 84 134 100 135 C116 134 126 128 130 118" strokeWidth="2.2" opacity=".9" />
          </g>
          <g transform="translate(40,158)">
            <ellipse cx="0" cy="6" rx="12" ry="4.5" fill="#7a2418" />
            <path d="M-12 6 Q0 14 12 6 Z" fill="#a8341f" />
            <path className="flame" d="M0 -11 C4 -6 4 -1 0 2 C-4 -1 -4 -6 0 -11Z" fill="#ffb62e" />
          </g>
          <g transform="translate(160,158)">
            <ellipse cx="0" cy="6" rx="12" ry="4.5" fill="#7a2418" />
            <path d="M-12 6 Q0 14 12 6 Z" fill="#a8341f" />
            <path className="flame b" d="M0 -11 C4 -6 4 -1 0 2 C-4 -1 -4 -6 0 -11Z" fill="#ffb62e" />
          </g>
        </svg>
      </div>

      <div className="brand">
        <img src="/codes-for-tomorrow-logo.png" alt="Codes for Tomorrow" />
      </div>
      <h1>Shree <span className="glow">Ganesh</span> Utsav</h1>
      <div className="dates">
        <span className="date-pill"><b>Sthapana</b> · 14th Sept</span>
        <span className="date-pill"><b>Sundar Kaand</b> · 18th Sept</span>
        <span className="date-pill"><b>Visarjan</b> · 25th Sept</span>
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
              cx="59" cy="59" r="50"
              style={{ strokeDasharray: C, strokeDashoffset: offset }}
            />
          </svg>
          <div className="ring-num">
            <span className="pct">{pct}%</span>
            <span className="lbl">COMPLETE</span>
          </div>
        </div>
        <div className="stats">
          <div className="stat total"><div className="n">{counts.total}</div><div className="t">Total tasks</div></div>
          <div className="stat done"><div className="n">{counts.done}</div><div className="t">Completed</div></div>
          <div className="stat prog"><div className="n">{counts.progress}</div><div className="t">In progress</div></div>
          <div className="stat todo"><div className="n">{counts.todo}</div><div className="t">Not started</div></div>
        </div>
      </div>
    </header>
  );
}
