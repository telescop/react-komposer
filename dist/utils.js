"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.inheritStatics = inheritStatics;
exports.isReactNative = isReactNative;
var _hoistNonReactStatics = _interopRequireDefault(require("hoist-non-react-statics"));
function inheritStatics(Container, ChildComponent) {
  var childDisplayName =
  // Get the display name if it's set.
  ChildComponent.displayName ||
  // Get the display name from the function name.
  ChildComponent.name ||
  // If not, just add a default one.
  'ChildComponent';
  Container.displayName = "Container(".concat(childDisplayName, ")");
  return (0, _hoistNonReactStatics["default"])(Container, ChildComponent);
}
function isReactNative() {
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    return true;
  }
  return false;
}