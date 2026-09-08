import { useState, useRef, useEffect } from 'react';

export default function LoginModal({ onLogin, onClose }) {
  const [pass, setPass] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const submit = async () => {
    setErr(''); setBusy(true);
    try {
      await onLogin(pass);
    } catch {
      setErr('Wrong password — try again.');
      setPass('');
      inputRef.current?.focus();
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="overlay open" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="loginTitle">
        <div className="om-sm">ॐ</div>
        <h2 id="loginTitle">Admin login</h2>
        <p>Enter the password to update task status for the whole team.</p>
        <input
          ref={inputRef}
          type="password"
          placeholder="Password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') submit(); }}
        />
        <div className="err">{err}</div>
        <div className="modal-actions">
          <button className="btn ghost" onClick={onClose}>Cancel</button>
          <button className="btn primary" onClick={submit} disabled={busy}>
            {busy ? 'Checking…' : 'Unlock'}
          </button>
        </div>
      </div>
    </div>
  );
}
