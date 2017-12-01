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
    this.state = {
      songs: fs.readdirSync('.').filter(filename => filename.endsWith('.opus')),
      currentlyPlaying: null
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
    const pipe = ytdl(url, { filter: 'audioonly' })
      .pipe(stream);

    pipe.on('finish', () => {
      this.setState(prev => ({
        songs: prev.songs.concat([filename])
      }));
    });
  }

  playSong (index) {
    const songs = this.state.songs;
    if (currentlyPlaying) {
      currentlyPlaying.pause();
    }
    currentlyPlaying = new Audio(`../${songs[index]}`);
    currentlyPlaying.volume = volume || 1;
    currentlyPlaying.onended = () => {
      const playIndex = index >= songs.length - 1 ? 0 : index + 1;
      this.playSong(playIndex);
    };
    currentlyPlaying.play();
  }

  renderSongs () {
    return this.state.songs.map(song =>
      <Song
        key={this.state.songs.indexOf(song)}
        index={this.state.songs.indexOf(song)}
        songName={song}
        playing={this.state.currentlyPlaying === this.state.songs.indexOf(song)}
        playSong={this.playSong.bind(this, this.state.songs.indexOf(song))}
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