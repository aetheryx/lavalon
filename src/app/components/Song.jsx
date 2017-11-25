import React from 'react';

class Song extends React.Component {
  handleClick () {
    this.props.playSong();
    this.animate();
  }

  animate () {
    this.props.setPlayingSong(this.props.index);
  }

  render () {
    return (
      <div className={`song ${this.props.playing ? 'playing' : 'fadein'} container level`}>
        <div className='songName level-left'>
          {this.props.songName.split('/').pop().slice(0, -5)}
        </div>
        <div className='level-right'>
          <button className='button is-danger is-small'>
            Delete
          </button>
          <button className='button is-primary is-small' onClick={this.handleClick.bind(this)}>
          Play
          </button>
        </div>
      </div>
    );
  }
}

export default Song;

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