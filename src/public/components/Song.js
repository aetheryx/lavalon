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

var Song = function (_React$Component) {
  _inherits(Song, _React$Component);

  function Song(state) {
    _classCallCheck(this, Song);

    var _this = _possibleConstructorReturn(this, (Song.__proto__ || Object.getPrototypeOf(Song)).call(this, state));

    _this.state = {
      rendered: false
    };
    return _this;
  }

  _createClass(Song, [{
    key: 'handleClick',
    value: function handleClick() {
      this.props.playSong();
      this.animate();
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      setTimeout(function () {
        _this2.setState({
          rendered: true
        });
      }, 1500); // amount of time for the animation to finish
    }
  }, {
    key: 'animate',
    value: function animate() {
      this.props.setPlayingSong(this.props.index);
    }
  }, {
    key: 'render',
    value: function render() {
      var outerClassName = 'song';
      if (!this.state.rendered) {
        outerClassName += ' fadein';
      }
      if (this.props.playing) {
        outerClassName += ' playing';
      }

      return _react2.default.createElement(
        'div',
        { className: outerClassName },
        _react2.default.createElement(
          'div',
          { className: 'container level' },
          _react2.default.createElement(
            'div',
            { className: 'songName level-left' },
            this.props.songName.split('/').pop().slice(0, -5)
          ),
          !this.props.downloading ? _react2.default.createElement(
            'div',
            { className: 'level fadeinImmediate' },
            _react2.default.createElement(
              'button',
              { className: 'button is-danger is-small' },
              'Delete'
            ),
            _react2.default.createElement(
              'button',
              { className: 'button is-primary is-small', onClick: this.handleClick.bind(this) },
              'Play'
            )
          ) : null
        ),
        this.props.downloading ? _react2.default.createElement(
          'div',
          { className: 'level' },
          _react2.default.createElement(
            'div',
            { className: 'progress-outer' },
            _react2.default.createElement('div', { className: 'progress-inner', style: { width: this.props.downloading + '%' } })
          )
        ) : null
      );
    }
  }]);

  return Song;
}(_react2.default.Component);

exports.default = Song;

/*
    let parent = document.querySelector(`.song[index="${index}"]`);
    if (parent.className.includes('fadein')) {
      parent.className = parent.className.replace('fadein ', '');
    }
    const playing = document.querySelector('.playing');
    if (playing) {
      playing.className = playing.className.replace('playing', 'playing-end');
      setTimeout(() => {
        playing.className = playing.className.replace('playing-end', '');
      }, 750);
    }
    document.querySelector(`.song[index="${index}"]`).className += ' playing';*/