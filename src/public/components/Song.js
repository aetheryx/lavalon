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

  function Song() {
    _classCallCheck(this, Song);

    return _possibleConstructorReturn(this, (Song.__proto__ || Object.getPrototypeOf(Song)).apply(this, arguments));
  }

  _createClass(Song, [{
    key: 'handleClick',
    value: function handleClick() {
      this.props.playSong();
      this.animate();
    }
  }, {
    key: 'animate',
    value: function animate() {
      this.props.setPlayingSong(this.props.index);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'song ' + (this.props.playing ? 'playing' : 'fadein') + ' container level' },
        _react2.default.createElement(
          'div',
          { className: 'songName level-left' },
          this.props.songName.split('/').pop().slice(0, -5)
        ),
        _react2.default.createElement(
          'div',
          { className: 'level-right' },
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
        )
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