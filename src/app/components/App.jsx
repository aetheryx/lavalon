import React from 'react';
import URLBox from './URLBox';
import Song from './Song';
import SongList from './SongList';
import PlayPause from './PlayPause';
import ytdl from 'ytdl-core';
import fs from 'fs';

let currentlyPlaying;
let volume;

class App extends React.Component {
  constructor () {
    super();

    const songs = {};
    for (const song of fs.readdirSync('.').filter(filename => filename.endsWith('.opus'))) {
      songs[song] = false;
    }

    this.state = {
      songs,
      currentlyPlaying
    };
  }

  setPlayingSong (index) {
    this.setState({
      currentlyPlaying: index
    });
  }

  async downloadSong (url) {
    const info = await ytdl.getInfo(url);

    const filename = `${info.title}.opus`;
    const stream = fs.createWriteStream(filename);

    const song = ytdl(url, { filter: 'audioonly' });

    song.once('response', () => {
      this.setState(prev => {
        prev.songs[filename] = 0;
        return prev;
      });
    });

    song.on('progress', (_, current, total) => {
      this.setState(prev => {
        prev.songs[filename] = (current / total * 100).toFixed();
        return prev;
      });
    });

    const pipe = song.pipe(stream);

    pipe.on('finish', () => {
      this.setState(prev => {
        prev.songs[filename] = false;
        return prev;
      });
    });
  }

  playSong (index) {
    const songs = Object.keys(this.state.songs);
    if (currentlyPlaying) {
      currentlyPlaying.pause();
    }
    currentlyPlaying = new Audio(`../${songs[index]}`);
    this.setPlayingSong(index);
    currentlyPlaying.volume = volume || 1;
    currentlyPlaying.onended = () => {
      const playIndex = index >= songs.length - 1 ? 0 : index + 1;
      this.playSong(playIndex);
    };
    currentlyPlaying.play();
  }

  renderSongs () {
    const songList = Object.keys(this.state.songs);

    return songList.map(song =>
      <Song
        downloading={this.state.songs[song]}
        key={songList.indexOf(song)}
        index={songList.indexOf(song)}
        songName={song}
        playing={this.state.currentlyPlaying === songList.indexOf(song)}
        playSong={this.playSong.bind(this, songList.indexOf(song))}
        setPlayingSong={this.setPlayingSong.bind(this)}
      />
    );
  }

  render () {
    return (
      <div>
        <URLBox downloadSong={this.downloadSong.bind(this)} />
        <div style={{ textAlign: 'center' }} />
        <SongList songs={this.renderSongs(this.state.songs)} />
        <PlayPause />
      </div>
    );
  }
}

export default App;