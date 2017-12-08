import React from 'react';

class Song extends React.Component {
  constructor (state) {
    super(state);

    this.state = {
      rendered: false
    };
  }

  handleClick () {
    this.props.playSong();
    this.animate();
  }

  componentDidMount () {
    setTimeout(() => {
      this.setState({
        rendered: true
      });
    }, 1500); // amount of time for the animation to finish
  }

  animate () {
    this.props.setPlayingSong(this.props.index);
  }

  render () {
    let outerClassName = 'song';
    if (!this.state.rendered) {
      outerClassName += ' fadein';
    }
    if (this.props.playing) {
      outerClassName += ' playing';
    }


    return (
      <div className={outerClassName}>
        <div className='container level'>
          <div className='songName level-left'>
            {this.props.songName.split('/').pop().slice(0, -5)}
          </div>
          {!this.props.downloading ? (
            <div className='level fadeinImmediate'>
              <button className='button is-danger is-small'>
                Delete
              </button>
              <button className='button is-primary is-small' onClick={this.handleClick.bind(this)}>
                Play
              </button>
            </div>
          ) : null}
        </div>
        {this.props.downloading ? (
          <div className='level'>
            <div className='progress-outer'>
              <div className='progress-inner' style={{ width: `${this.props.downloading}%` }} />
            </div>
          </div>
        ) : null}
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