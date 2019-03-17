import React from 'react';
import { string, bool } from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import MozartBox from '../MozartBox';

class MozartSpinner extends React.Component {
  static defaultProps = {
    size: 'sm',
    withoutBox: false,
  };

  render() {
    const { size, withoutBox } = this.props;

    if (withoutBox) {
      return (
        <FontAwesomeIcon
          style={{ color: 'red' }}
          icon="spinner"
          size={size}
          spin
        />
      );
    }

    return (
      <MozartBox style={{ color: 'red' }}>
        <FontAwesomeIcon icon="spinner" size={size} spin />
      </MozartBox>
    );
  }
}

MozartSpinner.propTypes = {
  size: string,
  withoutBox: bool,
};

export default MozartSpinner;
