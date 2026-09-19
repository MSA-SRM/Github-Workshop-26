export function createFollow({ transport, onChange }) {
  const api = { state: 'following', slide: 0, navigate, rejoin, destroy };
  let presenterSlide = 0;
  let unsubscribe = null;

  const emit = () => onChange({ state: api.state, slide: api.slide });

  const degrade = () => {
    api.state = 'degraded';
    unsubscribe = null;
    emit();
  };

  if (!transport) {
    degrade();
  } else {
    try {
      unsubscribe = transport.subscribe(i => {
        presenterSlide = i;
        if (api.state === 'following') { api.slide = i; emit(); }
      });
    } catch {
      degrade();
    }
  }

  function navigate(i) {
    api.slide = i;
    if (api.state === 'following') api.state = 'free';
    emit();
  }

  function rejoin() {
    if (api.state !== 'free') return;
    api.state = 'following';
    api.slide = presenterSlide;
    emit();
  }

  function destroy() {
    try { unsubscribe?.(); } catch { /* ignore */ }
    unsubscribe = null;
  }

  return api;
}
