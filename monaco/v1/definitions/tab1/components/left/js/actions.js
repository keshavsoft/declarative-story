const isPlainObject = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);

function setOptions(select, values, placeholder) {
  if (!select) return;
  select.length = 0;
  select.add(new Option(placeholder, ''));
  values.forEach((value) => select.add(new Option(value, value)));
  select.disabled = values.length === 0;
}

export function createActions({ spec, editor, elements }) {
  const showSource = (value, title, path) => {
    editor.setValue(JSON.stringify(value, null, 2));
    if (elements.editorTitle) elements.editorTitle.textContent = title;
    if (elements.editorPath) elements.editorPath.textContent = path;
  };

  const clearVariant = () => {
    setOptions(elements.variantSelect, [], 'Select Variation');
  };

  const actions = {
    initialize: () => {
      setOptions(elements.rootSelect, Object.keys(spec), 'Select Control');
      clearVariant();
      showSource(spec, 'definitions.json', 'Complete library');
    },

    selectRoot: (event, targetElement) => {
      const rootKey = targetElement?.value ?? '';
      clearVariant();
      if (!rootKey) {
        actions.showAll();
        return;
      }

      const elementSpec = spec[rootKey];
      const variantKeys = isPlainObject(elementSpec) ? Object.keys(elementSpec) : [];
      setOptions(elements.variantSelect, variantKeys, 'Select Variation');
      showSource(elementSpec, rootKey, `definitions.${rootKey}`);
    },

    selectVariant: (event, targetElement) => {
      const rootKey = elements.rootSelect?.value ?? '';
      const variantKey = targetElement?.value ?? '';

      if (!rootKey || !variantKey) {
        actions.selectRoot(null, elements.rootSelect);
        return;
      }

      const variantSpec = spec[rootKey]?.[variantKey];
      showSource(variantSpec, `${rootKey}.${variantKey}`, `definitions.${rootKey}.${variantKey}`);
    },

    showAll: () => {
      if (elements.rootSelect) elements.rootSelect.value = '';
      clearVariant();
      showSource(spec, 'definitions.json', 'Complete library');
    }
  };

  return actions;
}

export default createActions;
