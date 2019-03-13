import React from 'react';

class MozartBox extends React.Component {
  render() {
    return (
      <div props={this.props} className="m-2 p-2" style={{ border: '1px dashed gray' }}>
        { this.props.children }
      </div>
    )
  }
}

export default MozartBox;