import React from 'react';

class PlayPause extends React.Component {
  constructor (state) {
    super(state);

    this.state = {
      playing: false
    };
  }

  render () {
    return (
      <div id="playpause" className="columns is-mobile">
        <div className="column is-1" style={{ background: '#ffffff' }}></div>

        <div className="column"></div>

        <i
          className='column is-1 fas fa-2x fa-backward'
          onClick={this.props.prevNext.bind(null, false)}
        />

        <div className="column is-1" onClick={this.props.playPause} >
          <i
            className="fas fa-2x fa-pause-circle"
            style={ { opacity: this.props.currentlyPlaying ? 1 : 0, position: 'absolute' }}
          />
          <i
            className="fas fa-2x fa-play-circle"
            style={ { opacity: this.props.currentlyPlaying ? 0 : 1, position: 'absolute' }}
          />
        </div>

        <i
          className='column is-1 fas fa-2x fa-forward'
          onClick={this.props.prevNext.bind(null, true)}
        />

        <div className="column"></div>
        <div className="column is-1" style={{ background: '#ffffff' }}></div>

      </div>
    );
  }
}

export default PlayPause;