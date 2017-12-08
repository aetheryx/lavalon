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

    const filenames = fs.readdirSync('.').filter(filename => filename.endsWith('.opus'));
    const songs = filenames.map(song => ({
      name: song,
      downloading: false,
      index: filenames.indexOf(song)
    }));

    this.state = {
      songs,
      currentlyPlaying
    };
  }

  playPause () {
    if (!currentlyPlaying) {
      return this.playSong(0);
    }

    if (currentlyPlaying.paused) {
      currentlyPlaying.play();
    } else {
      currentlyPlaying.pause();
    }
  }

  prevNext (next) {
    const currIndex = Number(currentlyPlaying.getAttribute('index'));
    let playIndex;

    if (next) {
      playIndex = currIndex >= this.state.songs.length - 1 ? 0 : currIndex + 1;
    } else {
      playIndex = currIndex <= 0 ? 1 : currIndex - 1;
    }

    this.playSong(playIndex);
  }

  setPlayingSong (index) {
    this.setState({
      currentlyPlaying: index
    });
  }

  async downloadSong (url) {
    const index = this.state.songs.length;
    this.setState(prev => {
      prev.songs.push({
        index,
        name: 'Downloading...    ',
        downloading: 1
      });
      return prev;
    });
    const info = await ytdl.getInfo(url);

    const filename = `${info.title}.opus`;
    const stream = fs.createWriteStream(filename);

    const song = ytdl(url, { filter: 'audioonly' });

    song.once('response', () => {
      this.setState(prev => {
        prev.songs.find(song => song.index === index).name = filename;
        return prev;
      });
    });

    song.on('progress', (_, current, total) => {
      this.setState(prev => {
        prev.songs.find(song => song.name === filename).downloading = (current / total * 100).toFixed();
        return prev;
      });
    });

    const pipe = song.pipe(stream);

    pipe.on('finish', () => {
      this.setState(prev => {
        prev.songs.find(song => song.name === filename).downloading = false;
        return prev;
      });
    });
  }

  playSong (index) {
    const songs = this.state.songs;
    if (currentlyPlaying) {
      currentlyPlaying.pause();
    }
    currentlyPlaying = new Audio(`../${songs[index].name}`);
    currentlyPlaying.setAttribute('index', index);
    this.setPlayingSong(index);
    currentlyPlaying.volume = volume || 1;
    currentlyPlaying.onended = () => {
      const playIndex = index >= songs.length - 1 ? 0 : index + 1;
      this.playSong(playIndex);
    };
    currentlyPlaying.play();
  }

  renderSongs () {
    const songList = this.state.songs;

    return songList.map(song => {
      const index = songList.indexOf(song);

      return <Song
        downloading={song.downloading}
        key={index}
        index={index}
        songName={song.name}
        playing={this.state.currentlyPlaying === index}
        playSong={this.playSong.bind(this, index)}
        setPlayingSong={this.setPlayingSong.bind(this)}
      />;
    });
  }

  render () {
    return (
      <div>
        <URLBox downloadSong={this.downloadSong.bind(this)} />
        <div style={{ textAlign: 'center' }} />
        <SongList songs={this.renderSongs(this.state.songs)} />
        <PlayPause
          currentlyPlaying={this.state.currentlyPlaying !== undefined && !currentlyPlaying.paused}
          playPause={this.playPause.bind(this)}
          prevNext={this.prevNext.bind(this)}
        />
      </div>
    );
  }
}

export default App;