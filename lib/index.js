'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
function delayedRender(components) {
  var lookup = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : global;

  components.forEach(function (_ref) {
    var name = _ref.name,
        props = _ref.props,
        element = _ref.element;

    // Split name at dots, to select the correct value from the lookup
    if (!name) {
      throw new Error('Cant render Component, since required named is missing');
    }
    var component = name.split('.').reduce(function (o, i) {
      return o[i];
    }, lookup);
    var el = document.getElementById(element);

    if (component && el) {
      _reactDom2.default.render(_react2.default.createElement(component, props), el);
    } else if (!el) {
      throw new Error('[delayedRender] Could not find element with id: \'' + element + '\'', { name: name, props: props, element: element });
    } else {
      throw new Error('[delayedRender] Component not found: ' + name, { name: name, props: props, element: element });
    }
  });
}

exports.default = delayedRender;