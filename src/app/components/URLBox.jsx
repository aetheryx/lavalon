import React from 'react';

const ytrx = new RegExp('(?:youtube\\.com.*(?:\\?|&)(?:v|list)=|youtube\\.com.*embed\\/|youtube\\.com.*v\\/|youtu\\.be\\/)((?!videoseries)[a-zA-Z0-9_-]*)');

class URLBox extends React.Component {
  onChange (event) {
    event.persist();
    setTimeout(() => {
      if (ytrx.test(event.target.value)) {
        this.props.downloadSong(event.target.value);
      }
    }, 100);
  }

  render () {
    return (
      <div style={{ textAlign: 'center '}}>
        <h2 style={{ color: 'black' }}>Add song by URL</h2>
        <input onPaste={this.onChange.bind(this)} onKeyPress={this.onChange.bind(this)}className='input' type='text' name='url' id='urlBox' />
      </div>
    );
  }
}

export default URLBox;