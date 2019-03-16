import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import MozartBox from '../MozartBox';

class MozartSpinner extends React.Component {
  render() {
    return (
      <MozartBox style={{ color: 'red' }}>
        <FontAwesomeIcon icon="spinner" spin />
      </MozartBox>
    );
  }
}

export default MozartSpinner;
