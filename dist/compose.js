"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = compose;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _react = _interopRequireDefault(require("react"));
var _invariant = _interopRequireDefault(require("invariant"));
var _shallowequal = _interopRequireDefault(require("shallowequal"));
var _utils = require("./utils");
var _common_components = require("./common_components");
var _ = require("./");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function compose(fn, L1, E1) {
  var _ref = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
    contextTypes = _ref.contextTypes,
    _ref$pure = _ref.pure,
    pure = _ref$pure === void 0 ? true : _ref$pure,
    _ref$withRef = _ref.withRef,
    withRef = _ref$withRef === void 0 ? false : _ref$withRef;
  return function (ChildComponent, L2, E2) {
    (0, _invariant["default"])(Boolean(ChildComponent), 'Should provide a child component to build the higher order container.');
    if ((0, _utils.isReactNative)()) {
      (0, _invariant["default"])(L1 || L2, 'Should provide a loading component in ReactNative.');
      (0, _invariant["default"])(E1 || E2, 'Should provide a error handling component in ReactNative.');
    }

    // eslint-disable-next-line no-unused-vars
    var LoadingComponent = L1 || L2 || (0, _._getDefaultLoadingComponent)();
    // eslint-disable-next-line no-unused-vars
    var ErrorComponent = E1 || E2 || (0, _._getDefaultErrorComponent)();

    // If this is disabled, we simply need to return the DummyComponent
    if ((0, _.getDisableMode)()) {
      return (0, _utils.inheritStatics)(_common_components.DummyComponent, ChildComponent);
    }
    var Container = /*#__PURE__*/function (_React$Component) {
      (0, _inherits2["default"])(Container, _React$Component);
      var _super = _createSuper(Container);
      function Container(props, context) {
        var _this;
        (0, _classCallCheck2["default"])(this, Container);
        _this = _super.call(this, props, context);
        _this.getWrappedInstance = _this.getWrappedInstance.bind((0, _assertThisInitialized2["default"])(_this));
        _this.state = {};

        // XXX: In the server side environment, we need to
        // stop the subscription right away. Otherwise, it's a starting
        // point to huge subscription leak.
        _this._subscribe(props, context);
        return _this;
      }
      (0, _createClass2["default"])(Container, [{
        key: "componentDidMount",
        value: function componentDidMount() {
          this._mounted = true;
        }

        // eslint-disable-next-line camelcase
      }, {
        key: "UNSAFE_componentWillReceiveProps",
        value: function UNSAFE_componentWillReceiveProps(props, context) {
          this._subscribe(props, context);
        }
      }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
          this._mounted = false;
          this._unsubscribe();
        }
      }, {
        key: "shouldComponentUpdate",
        value: function shouldComponentUpdate(nextProps, nextState) {
          if (!pure) {
            return true;
          }
          return !(0, _shallowequal["default"])(this.props, nextProps) || this.state.error !== nextState.error || !(0, _shallowequal["default"])(this.state.payload, nextState.payload);
        }
      }, {
        key: "getWrappedInstance",
        value: function getWrappedInstance() {
          (0, _invariant["default"])(withRef, 'To access the wrapped instance, you need to specify ' + '{ withRef: true } as the fourth argument of the compose() call.');
          return this.refs.wrappedInstance;
        }
      }, {
        key: "render",
        value: function render() {
          var error = this._getError();
          var loading = this._isLoading();
          if (error) {
            return /*#__PURE__*/_react["default"].createElement(ErrorComponent, {
              error: error
            });
          }
          if (loading) {
            return /*#__PURE__*/_react["default"].createElement(LoadingComponent, this._getProps());
          }
          return /*#__PURE__*/_react["default"].createElement(ChildComponent, this._getProps());
        }
      }, {
        key: "_subscribe",
        value: function _subscribe(props, context) {
          var _this2 = this;
          this._unsubscribe();
          var onData = function onData(error, payload) {
            if (error) {
              (0, _invariant["default"])(error.message && error.stack, 'Passed error should be an instance of an Error.');
            }
            var state = {
              error: error,
              payload: payload
            };
            if (_this2._mounted) {
              _this2.setState(state);
            } else {
              _this2.state = state;
            }
          };
          this._stop = fn(props, onData, context);
        }
      }, {
        key: "_unsubscribe",
        value: function _unsubscribe() {
          if (this._stop) {
            this._stop();
          }
        }
      }, {
        key: "_getProps",
        value: function _getProps() {
          var _this$state$payload = this.state.payload,
            payload = _this$state$payload === void 0 ? {} : _this$state$payload;
          var props = _objectSpread(_objectSpread({}, this.props), payload);
          if (withRef) {
            props.ref = 'wrappedInstance';
          }
          return props;
        }
      }, {
        key: "_getError",
        value: function _getError() {
          var error = this.state.error;
          return error;
        }
      }, {
        key: "_isLoading",
        value: function _isLoading() {
          var payload = this.state.payload;
          // eslint-disable-next-line no-extra-boolean-cast
          return !Boolean(payload);
        }
      }]);
      return Container;
    }(_react["default"].Component);
    Container.contextTypes = contextTypes;
    return (0, _utils.inheritStatics)(Container, ChildComponent);
  };
}