const CHANNEL_NAME = 'declarative-definitions-v2';
const STORAGE_KEY = 'declarative-definitions:v2:payload';

export const actions = {
  createEditor: (monaco, container, initialValue) => monaco.editor.create(container, {
    value: JSON.stringify(initialValue, null, 2),
    language: 'json',
    theme: 'vs-dark',
    readOnly: false,
    automaticLayout: true,
    minimap: { enabled: false },
    fontSize: 14,
    lineNumbers: 'on',
    scrollBeyondLastLine: false,
    folding: true,
    wordWrap: 'on',
    padding: { top: 18, bottom: 18 }
  }),

  createRenderActions: ({ editor, sourceUrl }) => ({
    renderOutput: () => {
      if (!editor) return;
      const text = editor.getValue();
      let json = null;
      try {
        json = JSON.parse(text);
      } catch {
        json = null;
      }

      const payload = {
        text,
        json,
        source: sourceUrl,
        timestamp: Date.now()
      };

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      } catch (_) {}

      if (typeof BroadcastChannel === 'function') {
        const channel = new BroadcastChannel(CHANNEL_NAME);
        channel.postMessage(payload);
        channel.close();
      }

      window.open('../tab2/', '_blank', 'noopener');
    }
  })
};

export default actions;
