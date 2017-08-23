'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _setImmediate2 = require('babel-runtime/core-js/set-immediate');

var _setImmediate3 = _interopRequireDefault(_setImmediate2);

require('babel-polyfill');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _createStore = require('./store/createStore');

var _createStore2 = _interopRequireDefault(_createStore);

require('./styles/main.scss');

var _createHashHistory = require('history/lib/createHashHistory');

var _createHashHistory2 = _interopRequireDefault(_createHashHistory);

var _reactRouter = require('react-router');

var _reactRouterRedux = require('react-router-redux');

var _StartupConfig = require('configuration/StartupConfig');

var _StartupConfig2 = _interopRequireDefault(_StartupConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var startup = function startup(_ref) {
  var _ref$htmlroot = _ref.htmlroot,
      htmlroot = _ref$htmlroot === undefined ? 'root' : _ref$htmlroot,
      _ref$App = _ref.App,
      App = _ref$App === undefined ? null : _ref$App,
      _ref$Routes = _ref.Routes,
      Routes = _ref$Routes === undefined ? [] : _ref$Routes;


  // Store Initialization
  // ------------------------------------

  var hashHistory = (0, _reactRouter.useRouterHistory)(_createHashHistory2.default)({
    basename: ''
  });

  var store = (0, _createStore2.default)(window.__INITIAL_STATE__, hashHistory);

  // Render Setup
  // ------------------------------------
  var MOUNT_NODE = document.getElementById(htmlroot);

  var render = function render() {

    var App = require('./components/root/App').default;
    var routes = require('./routes/index').default(store);

    var history = (0, _reactRouterRedux.syncHistoryWithStore)(hashHistory, store, {
      selectLocationState: function selectLocationState(state) {
        return state.router;
      }
    });
    //UpfCore.register()
    _StartupConfig2.default.register(store);
    _reactDom2.default.render(_react2.default.createElement(App, { store: store,
      routes: routes,
      history: history }), MOUNT_NODE);
  };

  // Development Tools
  // ------------------------------------
  if (__DEV__) {
    if (module.hot) {
      var renderApp = render;
      var renderError = function renderError(error) {
        var RedBox = require('redbox-react').default;

        _reactDom2.default.render(_react2.default.createElement(RedBox, { error: error }), MOUNT_NODE);
      };

      render = function render() {
        try {
          renderApp();
        } catch (e) {
          console.error(e);
          renderError(e);
        }
      };

      // Setup hot module replacement
      module.hot.accept(['./components/root/App', './routes/index'], function () {
        return (0, _setImmediate3.default)(function () {
          _reactDom2.default.unmountComponentAtNode(MOUNT_NODE);
          render();
        });
      });
    }
  }

  // Let's Go!
  // ------------------------------------
  if (!__TEST__) render();
};

exports.default = {
  startup: startup
};