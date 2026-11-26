import { initRightEditor } from './components/right/js/index.js';
import { initLeftWorkspace } from './components/left/js/index.js';

const INSTRUCTIONS_URL = 'https://keshavsoft.github.io/declarative-instructions/json/v2/instructions.json';

async function loadInstructions(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status} loading ${url}`);
  return response.json();
}

async function boot() {
  try {
    const instructions = await loadInstructions(INSTRUCTIONS_URL);
    const editor = await initRightEditor(instructions);
    await initLeftWorkspace({ instructions, editor });
  } catch (error) {
    console.error('[Instructions Explorer V2]', error);
  }
}

boot();
