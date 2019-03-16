import React from 'react';
import { object, string, array, func, oneOfType } from 'prop-types';
import './MozartBox.scss';

class MozartBox extends React.Component {
  render() {
    const { children, style } = this.props;
    return (
      <div
        props={this.props}
        style={style}
        className="MozartBox m-2 p-2 shadow"
      >
        {children}
      </div>
    );
  }
}

MozartBox.propTypes = {
  children: oneOfType([object, array, func]),
  style: oneOfType([string, array, object]),
};

export default MozartBox;
