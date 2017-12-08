'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ytrx = new RegExp('(?:youtube\\.com.*(?:\\?|&)(?:v|list)=|youtube\\.com.*embed\\/|youtube\\.com.*v\\/|youtu\\.be\\/)((?!videoseries)[a-zA-Z0-9_-]*)');

var URLBox = function (_React$Component) {
  _inherits(URLBox, _React$Component);

  function URLBox() {
    _classCallCheck(this, URLBox);

    return _possibleConstructorReturn(this, (URLBox.__proto__ || Object.getPrototypeOf(URLBox)).apply(this, arguments));
  }

  _createClass(URLBox, [{
    key: 'onChange',
    value: function onChange(event) {
      var _this2 = this;

      event.persist();
      setTimeout(function () {
        if (ytrx.test(event.target.value)) {
          _this2.props.downloadSong(event.target.value);
          var interval = setInterval(function () {
            _this2.input.value = _this2.input.value.slice(0, -1);
            if (_this2.input.value.length === 0) {
              clearInterval(interval);
            }
          }, 15);
        }
      }, 100);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement(
        'div',
        { style: { textAlign: 'center ' } },
        _react2.default.createElement(
          'h2',
          { style: { color: 'black' } },
          'Add song by URL'
        ),
        _react2.default.createElement('input', {
          onPaste: this.onChange.bind(this),
          onKeyPress: this.onChange.bind(this),
          className: 'input',
          type: 'text',
          name: 'url',
          id: 'urlBox',
          ref: function ref(comp) {
            _this3.input = comp;
          }
        })
      );
    }
  }]);

  return URLBox;
}(_react2.default.Component);

exports.default = URLBox;