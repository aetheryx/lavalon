import React from 'react';


class PlayPause extends React.Component {
  render () {
    return (
      <div id="playpause" className="columns is-mobile">
        <div className="column is-1" style={{ background: '#ffffff' }}></div>
          
        <div className="column"></div>

        <button className="column is-1" /*onclick="playPrev()"  */>Prev</button>
        <button className="column is-1" /*onclick="PlayPause()" */>Play</button>
        <button className="column is-1" /*onclick="playNext()"  */>Next</button>
              
        <div className="column"></div>
        <div className="column is-1" style={{ background: '#ffffff' }}></div>
        
      </div>
    )
    
  }
}

export default PlayPause;