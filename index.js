// @flow
import React from 'react';
import ReactDOM from 'react-dom';

type ComponentDefinition = {name: string; props: Object; element: string};

/**
 * Initialize server side rendered components when the app is ready.
 * This requires the server to output a custom script tag, that contains the components and data to render
 *
 * @example
 * import delayedRender from './utils/delayed-render';
 *
 * if (global._components && Array.isArray(global._components)) {
 *   delayedRender(global._components);
 *   global._components = null;
 * }
 * @example
 *
 * @param components {Array} List of components to render.
 * @param lookup {Object=global} Object used to lookup the component definitions.
 */
function delayedRender(components: Array<ComponentDefinition>, lookup: Object = global) {
  components.forEach(({name, props, element}) => {
    // Split name at dots, to select the correct value from the lookup
    if (!name) {
      throw new Error('Cant render Component, since required named is missing');
    }
    const component = name.split('.').reduce((o, i) => o[i], lookup);
    const el = document.getElementById(element);

    if (component && el) {
      ReactDOM.render(React.createElement(component, props), el);
    } else if (!el) {
      throw new Error(`[delayedRender] Could not find element with id: '${element}'`, {name, props, element});
    } else {
      throw new Error(`[delayedRender] Component not found: ${name}`, {name, props, element});
    }
  });
}

export default delayedRender;