import { useEffect, useState, useCallback, useRef } from 'react';
import * as api from './api.js';
import Petals from './components/Petals.jsx';
import Hero from './components/Hero.jsx';
import Toolbar from './components/Toolbar.jsx';
import TaskCard from './components/TaskCard.jsx';
import LoginModal from './components/LoginModal.jsx';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState({});
  const [comments, setComments] = useState({});
  const [isAdmin, setIsAdmin] = useState(!!api.getToken());
  const [filters, setFilters] = useState({ status: 'all', day: 'all', q: '' });
  const [showLogin, setShowLogin] = useState(false);
  const [error, setError] = useState('');
  const pollRef = useRef(null);

  // Initial load
  useEffect(() => {
    api
      .fetchTasks()
      .then(({ tasks, status, comments }) => {
        setTasks(tasks); setStatus(status); setComments(comments || {});
      })
      .catch(() => setError('Could not reach the server. Is the backend running?'));
  }, []);

  // Viewers poll for live updates every 15s (admins edit directly, so no poll)
  useEffect(() => {
    if (isAdmin) { clearInterval(pollRef.current); return; }
    pollRef.current = setInterval(async () => {
      try {
        const { status, comments } = await api.fetchState();
        setStatus((prev) =>
          JSON.stringify(prev) === JSON.stringify(status) ? prev : status
        );
        setComments((prev) =>
          JSON.stringify(prev) === JSON.stringify(comments || {}) ? prev : (comments || {})
        );
      } catch { /* ignore transient errors */ }
    }, 15000);
    return () => clearInterval(pollRef.current);
  }, [isAdmin]);

  const handleLogin = async (password) => {
    await api.login(password);
    setIsAdmin(true);
    setShowLogin(false);
  };

  const handleLogout = () => {
    api.clearToken();
    setIsAdmin(false);
  };

  const setTaskStatus = useCallback(async (id, newStatus) => {
    if (!isAdmin) return;
    const prev = status[id];
    setStatus((s) => ({ ...s, [id]: newStatus })); // optimistic
    try {
      await api.updateTask(id, { status: newStatus });
    } catch (e) {
      setStatus((s) => ({ ...s, [id]: prev })); // rollback
      if (e.message === 'Session expired') { setIsAdmin(false); setShowLogin(true); }
    }
  }, [isAdmin, status]);

  const saveComment = useCallback(async (id, comment) => {
    if (!isAdmin) return;
    const prev = comments[id] || '';
    setComments((c) => ({ ...c, [id]: comment })); // optimistic
    try {
      await api.updateTask(id, { comment });
    } catch (e) {
      setComments((c) => ({ ...c, [id]: prev })); // rollback
      if (e.message === 'Session expired') { setIsAdmin(false); setShowLogin(true); }
    }
  }, [isAdmin, comments]);

  // Derived counts
  const counts = tasks.reduce(
    (acc, t) => { acc[status[t.id] || 'todo']++; acc.total++; return acc; },
    { todo: 0, progress: 0, done: 0, total: 0 }
  );

  // Filtering
  const q = filters.q.trim().toLowerCase();
  const visible = tasks.filter((t) => {
    const st = status[t.id] || 'todo';
    if (filters.status !== 'all' && st !== filters.status) return false;
    if (filters.day !== 'all' && !t.days.includes(filters.day)) return false;
    if (q) {
      const hay = (t.title + ' ' + t.cat + ' ' + t.people.join(' ')).toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  return (
    <>
      <Petals />

      <div className="adminbar">
        <button
          className={'admin-btn' + (isAdmin ? ' live' : '')}
          onClick={() => (isAdmin ? handleLogout() : setShowLogin(true))}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="4" y="10" width="16" height="10" rx="2" />
            <path d="M8 10V7a4 4 0 0 1 8 0v3" />
          </svg>
          {isAdmin ? 'Admin — Log out' : 'Admin login'}
        </button>
      </div>

      <div className="wrap">
        <Hero counts={counts} />

        <div className={'mode-banner' + (isAdmin ? ' editing' : '')}>
          {isAdmin ? (
            <span><b>Admin mode</b> — tap To do / Doing / Done on any card. Changes save for the whole team.</span>
          ) : (
            <span>You're <b>viewing</b> the board. Log in as admin to update status.</span>
          )}
        </div>

        {error && <div className="mode-banner" style={{ color: 'var(--vermillion)' }}>{error}</div>}

        <Toolbar filters={filters} setFilters={setFilters} />

        <main className="grid">
          {visible.length === 0 ? (
            <div className="empty-state">No tasks match this filter. Try clearing the search or day.</div>
          ) : (
            visible.map((t) => (
              <TaskCard
                key={t.id}
                task={t}
                status={status[t.id] || 'todo'}
                comment={comments[t.id] || ''}
                isAdmin={isAdmin}
                onSetStatus={setTaskStatus}
                onSaveComment={saveComment}
              />
            ))
          )}
        </main>

        <footer>
          <div className="sync">
            <span className="dot" /> {isAdmin ? 'Admin — changes save for everyone' : 'Team board — auto-refreshing every 15s'}
          </div>
          <div style={{ marginTop: 8 }}>Ganpati Bappa Morya 🙏 &nbsp;·&nbsp; Mangalmurti Morya</div>
        </footer>
      </div>

      {showLogin && (
        <LoginModal onLogin={handleLogin} onClose={() => setShowLogin(false)} />
      )}
    </>
  );
}
