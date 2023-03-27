"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._getDefaultErrorComponent = _getDefaultErrorComponent;
exports._getDefaultLoadingComponent = _getDefaultLoadingComponent;
exports.composeWithTracker = exports.composeWithPromise = exports.composeWithObservable = exports.composeWithMobx = exports.composeAll = exports.compose = void 0;
exports.disable = disable;
exports.getDisableMode = getDisableMode;
exports.getStubbingMode = getStubbingMode;
exports.setComposerStub = setComposerStub;
exports.setDefaultErrorComponent = setDefaultErrorComponent;
exports.setDefaultLoadingComponent = setDefaultLoadingComponent;
exports.setStubbingMode = setStubbingMode;
var _compose2 = _interopRequireDefault(require("./compose"));
var _compose_all = _interopRequireDefault(require("./compose_all"));
var _with_tracker = _interopRequireDefault(require("./composers/with_tracker"));
var _with_promise = _interopRequireDefault(require("./composers/with_promise"));
var _with_observable = _interopRequireDefault(require("./composers/with_observable"));
var _with_mobx = _interopRequireDefault(require("./composers/with_mobx"));
var _common_components = require("./common_components");
var compose = _compose2["default"];
exports.compose = compose;
var composeAll = _compose_all["default"];
exports.composeAll = composeAll;
var composeWithTracker = _with_tracker["default"];
exports.composeWithTracker = composeWithTracker;
var composeWithPromise = _with_promise["default"];
exports.composeWithPromise = composeWithPromise;
var composeWithObservable = _with_observable["default"];
exports.composeWithObservable = composeWithObservable;
var composeWithMobx = _with_mobx["default"];
exports.composeWithMobx = composeWithMobx;
var disableMode = false;
var stubbingMode = false;
var defaultErrorComponent = null;
var defaultLoadingComponent = null;

// A way to disable the functionality of react-komposer and always show the
// loading component.
// This is very useful in testing where we can ignore React kompser's behaviour.
function disable() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  disableMode = value;
}
function getDisableMode() {
  return disableMode;
}

// stubbing

function setStubbingMode() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  stubbingMode = value;
}
function getStubbingMode() {
  return stubbingMode;
}
function setComposerStub(Container, composerStub) {
  Container.__composerStub = composerStub;
}

// default components
function setDefaultLoadingComponent(comp) {
  defaultLoadingComponent = comp;
}
function setDefaultErrorComponent(comp) {
  defaultErrorComponent = comp;
}
function _getDefaultLoadingComponent() {
  return defaultLoadingComponent || _common_components.DefaultLoadingComponent;
}
function _getDefaultErrorComponent() {
  return defaultErrorComponent || _common_components.DefaultErrorComponent;
}