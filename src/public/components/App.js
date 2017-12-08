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

var _ytdlCore = require('ytdl-core');

var _ytdlCore2 = _interopRequireDefault(_ytdlCore);

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

    var filenames = _fs2.default.readdirSync('.').filter(function (filename) {
      return filename.endsWith('.opus');
    });
    var songs = filenames.map(function (song) {
      return {
        name: song,
        downloading: false,
        index: filenames.indexOf(song)
      };
    });

    _this.state = {
      songs: songs,
      currentlyPlaying: currentlyPlaying
    };
    return _this;
  }

  _createClass(App, [{
    key: 'playPause',
    value: function playPause() {
      if (!currentlyPlaying) {
        return this.playSong(0);
      }

      if (currentlyPlaying.paused) {
        currentlyPlaying.play();
      } else {
        currentlyPlaying.pause();
      }
    }
  }, {
    key: 'prevNext',
    value: function prevNext(next) {
      var currIndex = Number(currentlyPlaying.getAttribute('index'));
      var playIndex = void 0;

      if (next) {
        playIndex = currIndex >= this.state.songs.length - 1 ? 0 : currIndex + 1;
      } else {
        playIndex = currIndex <= 0 ? 1 : currIndex - 1;
      }

      this.playSong(playIndex);
    }
  }, {
    key: 'setPlayingSong',
    value: function setPlayingSong(index) {
      this.setState({
        currentlyPlaying: index
      });
    }
  }, {
    key: 'downloadSong',
    value: async function downloadSong(url) {
      var _this2 = this;

      var index = this.state.songs.length;
      this.setState(function (prev) {
        prev.songs.push({
          index: index,
          name: 'Downloading...    ',
          downloading: 1
        });
        return prev;
      });
      var info = await _ytdlCore2.default.getInfo(url);

      var filename = info.title + '.opus';
      var stream = _fs2.default.createWriteStream(filename);

      var song = (0, _ytdlCore2.default)(url, { filter: 'audioonly' });

      song.once('response', function () {
        _this2.setState(function (prev) {
          prev.songs.find(function (song) {
            return song.index === index;
          }).name = filename;
          return prev;
        });
      });

      song.on('progress', function (_, current, total) {
        _this2.setState(function (prev) {
          prev.songs.find(function (song) {
            return song.name === filename;
          }).downloading = (current / total * 100).toFixed();
          return prev;
        });
      });

      var pipe = song.pipe(stream);

      pipe.on('finish', function () {
        _this2.setState(function (prev) {
          prev.songs.find(function (song) {
            return song.name === filename;
          }).downloading = false;
          return prev;
        });
      });
    }
  }, {
    key: 'playSong',
    value: function playSong(index) {
      var _this3 = this;

      var songs = this.state.songs;
      if (currentlyPlaying) {
        currentlyPlaying.pause();
      }
      currentlyPlaying = new Audio('../' + songs[index].name);
      currentlyPlaying.setAttribute('index', index);
      this.setPlayingSong(index);
      currentlyPlaying.volume = volume || 1;
      currentlyPlaying.onended = function () {
        var playIndex = index >= songs.length - 1 ? 0 : index + 1;
        _this3.playSong(playIndex);
      };
      currentlyPlaying.play();
    }
  }, {
    key: 'renderSongs',
    value: function renderSongs() {
      var _this4 = this;

      var songList = this.state.songs;

      return songList.map(function (song) {
        var index = songList.indexOf(song);

        return _react2.default.createElement(_Song2.default, {
          downloading: song.downloading,
          key: index,
          index: index,
          songName: song.name,
          playing: _this4.state.currentlyPlaying === index,
          playSong: _this4.playSong.bind(_this4, index),
          setPlayingSong: _this4.setPlayingSong.bind(_this4)
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_URLBox2.default, { downloadSong: this.downloadSong.bind(this) }),
        _react2.default.createElement('div', { style: { textAlign: 'center' } }),
        _react2.default.createElement(_SongList2.default, { songs: this.renderSongs(this.state.songs) }),
        _react2.default.createElement(_PlayPause2.default, {
          currentlyPlaying: this.state.currentlyPlaying !== undefined && !currentlyPlaying.paused,
          playPause: this.playPause.bind(this),
          prevNext: this.prevNext.bind(this)
        })
      );
    }
  }]);

  return App;
}(_react2.default.Component);

exports.default = App;