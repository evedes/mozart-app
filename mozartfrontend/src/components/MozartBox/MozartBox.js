import React from 'react';
import './MozartBox.scss';

class MozartBox extends React.Component {
  render() {
    return (
      <div props={this.props} className="MozartBox m-2 p-2 shadow">
        { this.props.children }
      </div>
    )
  }
}

export default MozartBox;