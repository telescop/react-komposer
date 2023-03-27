"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = composeAll;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _react = _interopRequireDefault(require("react"));
var _ = require("./");
var _common_components = require("./common_components");
var _utils = require("./utils");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
// utility function to compose multiple composers at once.
function composeAll() {
  for (var _len = arguments.length, composers = new Array(_len), _key = 0; _key < _len; _key++) {
    composers[_key] = arguments[_key];
  }
  return function (BaseComponent) {
    if ((0, _.getDisableMode)()) {
      return _common_components.DummyComponent;
    }
    if (BaseComponent === null || BaseComponent === undefined) {
      throw new Error('Curry function of composeAll needs an input.');
    }
    var FinalComponent = BaseComponent;
    composers.forEach(function (composer) {
      if (typeof composer !== 'function') {
        throw new Error('Composer should be a function.');
      }
      FinalComponent = composer(FinalComponent);
      if (FinalComponent === null || FinalComponent === undefined) {
        throw new Error('Composer function should return a value.');
      }
    });
    FinalComponent.__OriginalBaseComponent = BaseComponent.__OriginalBaseComponent || BaseComponent;
    var stubbingMode = (0, _.getStubbingMode)();
    if (!stubbingMode) {
      return FinalComponent;
    }

    // return the stubbing mode.
    var ResultContainer = function ResultContainer(props) {
      // If there's an stub use it.
      if (ResultContainer.__composerStub) {
        var data = ResultContainer.__composerStub(props);
        var finalProps = _objectSpread(_objectSpread({}, props), data);
        return /*#__PURE__*/_react["default"].createElement(FinalComponent.__OriginalBaseComponent, finalProps);
      }

      // if there's no stub, just use the FinalComponent.
      var displayName = FinalComponent.displayName || FinalComponent.name;
      return /*#__PURE__*/_react["default"].createElement("span", null, "<".concat(displayName, " />"));
    };
    (0, _utils.inheritStatics)(ResultContainer, FinalComponent);
    return ResultContainer;
  };
}