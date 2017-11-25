import React from 'react';
import URLBox from './URLBox';
import Song from './Song';
import SongList from './SongList';
import PlayPause from './PlayPause';
import fs from 'fs';

currentlyPlaying = null;
let volume;

class App extends React.Component {
  constructor () {
    super();
    this.state = {
      songs: fs.readdirSync('.').filter(filename => filename.endsWith('.opus'))
    }
  }

  downloadSong (url) {
    
  }

  playSong (index) {
    const songs = this.state.songs;
    if (currentlyPlaying) {
      currentlyPlaying.pause();
    }
    currentlyPlaying = new Audio('../' + songs[index]);
    currentlyPlaying.volume = volume || 1;
    currentlyPlaying.onended = () => {
      const playIndex = index >= songs.length - 1 ? 0 : index + 1;
      this.playSong(playIndex);
    };
    currentlyPlaying.play();



    return;

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
    document.querySelector(`.song[index="${index}"]`).className += ' playing';
  }

  renderSongs () {
    return this.state.songs.map(song => 
      <Song
        key={this.state.songs.indexOf(song)}
        songName={song}
        playSong={this.playSong.bind(this, this.state.songs.indexOf(song))}
      />
    )
  }

  render () {
    return (
      <div>
        <URLBox onRead={this.downloadSong.bind(this)} />
        <div style={{ textAlign: 'center' }}></div>
        <SongList songs={this.renderSongs(this.state.songs)} />
        <PlayPause />
      </div>
    )
  }
}

export default App;