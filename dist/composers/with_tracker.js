"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = composeWithTracker;
var _compose = _interopRequireDefault(require("../compose"));
function composeWithTracker(reactiveFn, L, E, options) {
  var onPropsChange = function onPropsChange(props, onData, context) {
    var trackerCleanup;
    var handler = Tracker.nonreactive(function () {
      return Tracker.autorun(function () {
        trackerCleanup = reactiveFn(props, onData, context);
      });
    });
    return function () {
      if (typeof trackerCleanup === 'function') {
        trackerCleanup();
      }
      return handler.stop();
    };
  };
  return (0, _compose["default"])(onPropsChange, L, E, options);
}