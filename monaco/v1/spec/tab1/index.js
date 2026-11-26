import { initRightEditor } from './components/right/js/index.js';
import { initLeftWorkspace } from './components/left/js/index.js';

const SPEC_URL = 'https://keshavsoft.github.io/declarative-spec/json/v3/spec.json';

async function loadSpec(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status} loading ${url}`);
  return response.json();
}

async function boot() {
  const urlEl = document.getElementById('editorUrl');
  if (urlEl) {
    urlEl.textContent = SPEC_URL;
    urlEl.title = SPEC_URL;
  }

  try {
    const spec = await loadSpec(SPEC_URL);
    const editor = await initRightEditor({ initialValue: spec, sourceUrl: SPEC_URL });
    await initLeftWorkspace({ spec, editor });
  } catch (error) {
    console.error('[Spec Explorer V7]', error);
    if (urlEl) urlEl.textContent = `Failed: ${SPEC_URL}`;
  }
}

boot();
