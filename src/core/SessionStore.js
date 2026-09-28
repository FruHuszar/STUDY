const key = "study-notes.session";

export default class SessionStore {
  read() {
    try {
      const session = JSON.parse(localStorage.getItem(key));
      if (session && session.token && session.email && session.expiresAt > Date.now()) {
        return session;
      }
    } catch {
      return null;
    }
    return null;
  }

  write(session) {
    try {
      localStorage.setItem(key, JSON.stringify(session));
    } catch {
      // Storage can be unavailable in private browsing; the session then lasts for this tab only.
    }
  }

  clear() {
    try {
      localStorage.removeItem(key);
    } catch {
      // Nothing to clear.
    }
  }
}
