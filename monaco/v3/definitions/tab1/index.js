import { initRightEditor } from './components/right/js/index.js';
import { initLeftWorkspace } from './components/left/js/index.js';

const DEFINITIONS_URL = 'https://keshavsoft.github.io/declarative-definitions/json/v4/definitions.json';

async function loadDefinitions(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status} loading ${url}`);
  return response.json();
}

async function boot() {
  const urlEl = document.getElementById('editorUrl');
  if (urlEl) {
    urlEl.textContent = DEFINITIONS_URL;
    urlEl.title = DEFINITIONS_URL;
  }

  try {
    const definitions = await loadDefinitions(DEFINITIONS_URL);
    const editor = await initRightEditor({ initialValue: definitions, sourceUrl: DEFINITIONS_URL });
    await initLeftWorkspace({ definitions, editor });
  } catch (error) {
    console.error('[Definitions Studio V2]', error);
    if (urlEl) urlEl.textContent = `Failed: ${DEFINITIONS_URL}`;
  }
}

boot();
