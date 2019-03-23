import React from 'react';
import { object, array, oneOfType } from 'prop-types';
import './MozartBox.scss';

class MozartBox extends React.Component {
  render() {
    const { children } = this.props;
    return <div className="MozartBox p-2 shadow">{children}</div>;
  }
}

MozartBox.propTypes = {
  children: oneOfType([object, array]),
};

export default MozartBox;
