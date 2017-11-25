import React from 'react';

class Song extends React.Component {
  constructor () {
    super();

    this.state = {
      playing: false
    }
  }

  animate () {
    if ()
  }

  render () {
    return (
      <div className='song fadein container level'>
      <div className='songName level-left'>
        {this.props.songName.split('/').pop().slice(0, -5)}
      </div>
      <div className='level-right'>
        <button className='button is-danger is-small'>
          Delete
        </button>
        <button className='button is-primary is-small' onClick={() => { this.props.playSong(); this.animate.bind(this)(); }}>
          Play
        </button>
      </div>
    </div>
    )
  }
}

export default Song;