import render from 'https://keshavsoft.github.io/json-to-dom/dist/v42/min.js';

const CHANNEL_NAME = 'declarative-spec-v7';
const STORAGE_KEY = 'declarative-spec:v7:payload';
const container = document.getElementById('dom-render-container');

function renderPayload(payload) {
  if (!container || !payload) return;

  if (!payload.json) {
    container.innerHTML = `<div class="alert alert-warning mb-0">Invalid JSON payload from <code>${payload.source || 'Tab 1'}</code>.</div>`;
    return;
  }

  try {
    container.innerHTML = '';
    render({
      jsonSpec: payload.json,
      targetHtmlId: container.id,
      appendPosition: 'append',
      showLog: true
    });
  } catch (error) {
    container.innerHTML = `<div class="alert alert-danger mb-0"><strong>json-to-dom error:</strong> ${error?.message || error}</div>`;
  }
}

try {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) renderPayload(JSON.parse(stored));
} catch (_) {}

if (typeof BroadcastChannel === 'function') {
  const channel = new BroadcastChannel(CHANNEL_NAME);
  channel.addEventListener('message', (event) => {
    renderPayload(event.data);
  });
}
