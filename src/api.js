// Small wrapper around the backend API. Token is kept in localStorage.
const TOKEN_KEY = 'ganesh-admin-token';

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (t) => localStorage.setItem(TOKEN_KEY, t);
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

export async function fetchTasks() {
  const res = await fetch('/api/tasks');
  if (!res.ok) throw new Error('Could not load tasks');
  return res.json(); // { tasks, status }
}

export async function fetchState() {
  const res = await fetch('/api/state');
  if (!res.ok) throw new Error('Could not load state');
  return res.json(); // { status }
}

export async function login(password) {
  const res = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  });
  if (!res.ok) throw new Error('Wrong password');
  const data = await res.json();
  setToken(data.token);
  return data.token;
}

export async function updateTask(id, patch) {
  const res = await fetch(`/api/tasks/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(patch), // { status? , comment? }
  });
  if (res.status === 401) {
    clearToken();
    throw new Error('Session expired');
  }
  if (!res.ok) throw new Error('Update failed');
  return res.json();
}
