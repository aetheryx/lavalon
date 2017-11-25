'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _URLBox = require('./URLBox');

var _URLBox2 = _interopRequireDefault(_URLBox);

var _Song = require('./Song');

var _Song2 = _interopRequireDefault(_Song);

var _SongList = require('./SongList');

var _SongList2 = _interopRequireDefault(_SongList);

var _PlayPause = require('./PlayPause');

var _PlayPause2 = _interopRequireDefault(_PlayPause);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var currentlyPlaying = void 0;
var volume = void 0;

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App() {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this));

    _this.state = {
      songs: _fs2.default.readdirSync('.').filter(function (filename) {
        return filename.endsWith('.opus');
      }),
      currentlyPlaying: null
    };
    return _this;
  }

  _createClass(App, [{
    key: 'setPlayingSong',
    value: function setPlayingSong(index) {
      console.log(index);
      this.setState({
        currentlyPlaying: index
      });
    }
  }, {
    key: 'downloadSong',
    value: function downloadSong(url) {}
  }, {
    key: 'playSong',
    value: function playSong(index) {
      var _this2 = this;

      var songs = this.state.songs;
      if (currentlyPlaying) {
        currentlyPlaying.pause();
      }
      currentlyPlaying = new Audio('../' + songs[index]);
      currentlyPlaying.volume = volume || 1;
      currentlyPlaying.onended = function () {
        var playIndex = index >= songs.length - 1 ? 0 : index + 1;
        _this2.playSong(playIndex);
      };
      currentlyPlaying.play();
    }
  }, {
    key: 'renderSongs',
    value: function renderSongs() {
      var _this3 = this;

      return this.state.songs.map(function (song) {
        return _react2.default.createElement(_Song2.default, {
          key: _this3.state.songs.indexOf(song),
          index: _this3.state.songs.indexOf(song),
          songName: song,
          playing: _this3.state.currentlyPlaying === _this3.state.songs.indexOf(song),
          playSong: _this3.playSong.bind(_this3, _this3.state.songs.indexOf(song)),
          setPlayingSong: _this3.setPlayingSong.bind(_this3)
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_URLBox2.default, { onRead: this.downloadSong.bind(this) }),
        _react2.default.createElement('div', { style: { textAlign: 'center' } }),
        _react2.default.createElement(_SongList2.default, { songs: this.renderSongs(this.state.songs) }),
        _react2.default.createElement(_PlayPause2.default, null)
      );
    }
  }]);

  return App;
}(_react2.default.Component);

exports.default = App;