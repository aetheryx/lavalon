import React from 'react';

class SongList extends React.Component {
  constructor () {
    super();
    this.state = {
      currentlyPlaying: null
    }
  }

  render () {
    return (
      <div style={{ textAlign: 'center' }} id='songlist'>
        {this.props.songs}
      </div>
    )
  }
}

export default SongList;

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