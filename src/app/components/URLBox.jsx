import React from 'react';

class URLBox extends React.Component {
  render () {
    return (
      <div style={{ textAlign: 'center '}}>
        <h2 style={{ color: 'black' }}>Add song by URL</h2>
        <input onPaste={this.readURL} onKeyPress={this.readURL}className='input' type='text' name='url' id='urlBox' />
      </div>
    );
  }
}

export default URLBox;