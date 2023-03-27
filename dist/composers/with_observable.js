"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = composeWithObservable;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
var _compose = _interopRequireDefault(require("../compose"));
var _invariant = _interopRequireDefault(require("invariant"));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function composeWithObservable(fn, L, E, options) {
  var onPropsChange = function onPropsChange(props, sendData, context) {
    var observable = fn(props, context);
    (0, _invariant["default"])(typeof observable.subscribe === 'function', 'Should return an observable from the callback of `composeWithObservable`');
    sendData();
    var onData = function onData(data) {
      (0, _invariant["default"])((0, _typeof2["default"])(data) === 'object', 'Should return a plain object from the promise');
      var clonedData = _objectSpread({}, data);
      sendData(null, clonedData);
    };
    var onError = function onError(err) {
      sendData(err);
    };
    var sub = observable.subscribe(onData, onError);
    return sub.completed.bind(sub);
  };
  return (0, _compose["default"])(onPropsChange, L, E, options);
}