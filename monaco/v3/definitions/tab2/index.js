import runInstructions from 'https://keshavsoft.github.io/json-renderers-run-instructions/dist/v20/min.js';
import render from 'https://keshavsoft.github.io/json-to-dom/dist/v42/min.js';

const CHANNEL_NAME = 'declarative-definitions-v3';
const STORAGE_KEY = 'declarative-definitions:v3:payload';
const container = document.getElementById('dom-render-container');

const SAMPLE_DATA = {
  table: {
    columns: [
      { columnName: 'itemName', width: '240px' },
      { columnName: 'category', width: '160px' },
      { columnName: 'baseUnit', width: '120px' }
    ],
    data: [
      { itemName: '0.09/30mm High Tensile Bolt', category: 'Fasteners', baseUnit: 'kgs' },
      { itemName: '0.11-25 Galvanized Wire Coil', category: 'Raw Materials', baseUnit: 'pcs' },
      { itemName: 'M8 Flanged Hex Nut', category: 'Fasteners', baseUnit: 'boxes' }
    ]
  },
  form: {
    columns: [
      { columnName: 'itemName' },
      { columnName: 'category' },
      { columnName: 'baseUnit' }
    ]
  },
  select: {
    columns: [
      { columnName: 'Department', options: ['Engineering', 'Design', 'Operations'] },
      { columnName: 'Priority', options: ['Low', 'Medium', 'High'] }
    ]
  },
  dataList: {
    columns: [
      { columnName: 'Framework', options: ['React', 'Vue', 'Svelte', 'Lit'] }
    ]
  },
  selectOptionsOnly: {
    data: [
      { rowValue: 'Option 1' },
      { rowValue: 'Option 2' }
    ]
  },
  searchInput: {
    id: 'preview-search',
    label: 'Search',
    placeholder: 'Type to filter...'
  },
  accordion: {
    items: [
      { id: '1', title: 'Base Blueprint', content: 'Resolved from declarative-spec using baseFromSpec.' },
      { id: '2', title: 'Mutated Spec', content: 'Assembled by json-renderers-run-instructions before json-to-dom.' }
    ]
  },
  card: {
    headerTitle: 'Quarterly Overview',
    title: 'Pipeline Summary',
    text: 'Mutated by json-renderers-run-instructions and rendered via json-to-dom.',
    footerText: 'Live preview'
  },
  list: {
    items: [
      { text: 'Definition loaded', badge: 'OK' },
      { text: 'Instructions executed', badge: 'Mutated' },
      { text: 'Mounted via json-to-dom', badge: 'DOM' }
    ]
  },
  menu: {
    items: [
      { text: 'Dashboard', title: 'Dashboard', description: 'Overview metrics', href: '#dashboard', actionText: 'Open' },
      { text: 'Inventory', title: 'Inventory', description: 'Material stock', href: '#inventory', actionText: 'Open' }
    ]
  }
};

function showNotice(alertClass, title, detail) {
  if (!container) return;
  container.innerHTML = '';

  const box = document.createElement('div');
  box.className = `alert ${alertClass} mb-0`;

  const strong = document.createElement('strong');
  strong.textContent = title;
  box.appendChild(strong);

  if (detail) {
    box.appendChild(document.createTextNode(` ${detail}`));
  }

  container.appendChild(box);
}

function renderPayload(payload) {
  if (!container || !payload) return;

  if (!payload.json) {
    showNotice('alert-warning', 'Invalid JSON:', `Could not parse JSON payload from ${payload.source || 'Tab 1'}.`);
    return;
  }

  const keyParts = (payload.key || '').split('.').filter(Boolean);
  if (keyParts.length !== 2) {
    showNotice('alert-info', 'Select a variation:', 'Pick a Control Type and Variation (for example, table -> simple) in Tab 1 before clicking Render.');
    return;
  }

  const [instructionMainKey, instructionSubKey] = keyParts;

  try {
    const domSpec = runInstructions({
      instructionMainKey,
      instructionSubKey,
      data: SAMPLE_DATA[instructionMainKey] ?? SAMPLE_DATA.table,
      showLog: true
    });

    container.innerHTML = '';
    render({
      jsonSpec: domSpec,
      targetHtmlId: container.id,
      appendPosition: 'append',
      showLog: true
    });
  } catch (error) {
    showNotice('alert-danger', 'Render error:', error?.message || String(error));
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
