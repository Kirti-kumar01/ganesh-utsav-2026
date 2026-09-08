const STATUS_CHIPS = [
  ['all', 'All'], ['todo', 'Not started'], ['progress', 'In progress'], ['done', 'Done'],
];
const DAY_CHIPS = [
  ['all', 'All days'], ['14th', '14th'], ['18th', '18th'], ['25th', '25th'], ['10 days', '10 days'],
];

export default function Toolbar({ filters, setFilters }) {
  return (
    <section className="toolbar">
      <div className="chips">
        <span className="grouplbl">Status</span>
        {STATUS_CHIPS.map(([val, label]) => (
          <button
            key={val}
            className={'chip' + (filters.status === val ? ' active' : '')}
            onClick={() => setFilters((f) => ({ ...f, status: val }))}
          >{label}</button>
        ))}
      </div>
      <div className="chips">
        <span className="grouplbl">Day</span>
        {DAY_CHIPS.map(([val, label]) => (
          <button
            key={val}
            className={'chip' + (filters.day === val ? ' active' : '')}
            onClick={() => setFilters((f) => ({ ...f, day: val }))}
          >{label}</button>
        ))}
      </div>
      <div className="searchrow">
        <div className="search">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--cream-dim)" strokeWidth="2">
            <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" />
          </svg>
          <input
            type="text"
            placeholder="Search a task or a name…"
            value={filters.q}
            onChange={(e) => setFilters((f) => ({ ...f, q: e.target.value }))}
          />
        </div>
      </div>
    </section>
  );
}
