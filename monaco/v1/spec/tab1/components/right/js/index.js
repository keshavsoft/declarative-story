import bindings from './bindings.json' with { type: 'json' };
import actions from './actions.js';

const getBindEvents = () =>
  window.ks?.domPrimitive?.bindings?.bindEvents ||
  window.ks?.domPrimitiveBindings?.bindEvents ||
  window.ks?.bindEvents;

export async function initRightEditor({ initialValue, sourceUrl }) {
  await new Promise((resolve, reject) => {
    if (!window.require) {
      reject(new Error('Monaco loader is unavailable.'));
      return;
    }

    window.require.config({
      paths: { vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.52.2/min/vs' }
    });
    window.require(['vs/editor/editor.main'], resolve, reject);
  });

  const container = document.getElementById('monacoEditor');
  if (!container) throw new Error('Monaco editor container was not found.');

  const editor = actions.createEditor(window.monaco, container, initialValue);
  const renderActions = actions.createRenderActions({ editor, sourceUrl });

  let bindEvents = getBindEvents();
  if (typeof bindEvents !== 'function') {
    try {
      const mod = await import('https://keshavsoft.github.io/dom-primitive-bindings/dist/v8/min.js');
      bindEvents = mod.bindEvents || mod.default || getBindEvents();
    } catch (_) {}
  }

  if (typeof bindEvents === 'function') {
    bindEvents('rightWorkspace', bindings, renderActions);
  }

  return editor;
}

export default initRightEditor;
