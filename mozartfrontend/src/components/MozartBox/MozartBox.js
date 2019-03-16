import React from 'react';
import { object, array, func, oneOfType } from 'prop-types';
import './MozartBox.scss';

class MozartBox extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <div props={this.props} className="MozartBox m-2 p-2 shadow">
        {children}
      </div>
    );
  }
}

MozartBox.propTypes = {
  children: oneOfType([object, array, func]),
};

export default MozartBox;
