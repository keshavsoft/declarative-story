import { initRightEditor } from './components/right/js/index.js';
import { initLeftWorkspace } from './components/left/js/index.js';

const INSTRUCTIONS_URL = 'https://keshavsoft.github.io/declarative-instructions/json/v4/instructions.json';

async function loadInstructions(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status} loading ${url}`);
  return response.json();
}

async function boot() {
  const urlEl = document.getElementById('editorUrl');
  if (urlEl) {
    urlEl.textContent = INSTRUCTIONS_URL;
    urlEl.title = INSTRUCTIONS_URL;
  }

  try {
    const instructions = await loadInstructions(INSTRUCTIONS_URL);
    const editor = await initRightEditor(instructions);
    await initLeftWorkspace({ instructions, editor });
  } catch (error) {
    console.error('[Instructions Studio V2]', error);
    if (urlEl) urlEl.textContent = `Failed: ${INSTRUCTIONS_URL}`;
  }
}

boot();
