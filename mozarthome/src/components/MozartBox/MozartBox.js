import React from 'react';

class MozartBox extends React.Component {
  render() {
    return (
      <div className="m-3 p-2 shadow border">
        { this.props.children }
      </div>
    )
  }
}

export default MozartBox;