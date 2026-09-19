const KEY = 'u26:progress';

export function createProgress(storage = globalThis.localStorage) {
  let done = new Set();

  try {
    const raw = storage?.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) done = new Set(parsed);
    }
  } catch {
    done = new Set();
  }

  const save = () => {
    try {
      storage?.setItem(KEY, JSON.stringify([...done]));
    } catch {
      // Storage unavailable — in-memory state remains correct.
    }
  };

  return {
    isDone: id => done.has(id),
    toggle(id) {
      if (done.has(id)) done.delete(id); else done.add(id);
      save();
      return done.has(id);
    },
    doneCount: ids => ids.filter(id => done.has(id)).length,
    reset() {
      done = new Set();
      try { storage?.removeItem(KEY); } catch { /* ignore */ }
    },
  };
}
