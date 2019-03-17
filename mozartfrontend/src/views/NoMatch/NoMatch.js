import React from 'react';
import { object } from 'prop-types';
import MozartSpinner from '../../components/MozartSpinner';

import './NoMatch.scss';

class NoMatch extends React.Component {
  componentDidMount() {
    const { history } = this.props;
    return setTimeout(() => history.push('/'), 2000);
  }

  render() {
    return (
      <div
        style={{ height: '100vh' }}
        className="NoMatch d-flex flex-column justify-content-center align-items-center"
      >
        <h3>404 Unknown Route</h3>
        <div className="m-3">
          <MozartSpinner withoutBox size="3x" />
        </div>
      </div>
    );
  }
}

NoMatch.propTypes = {
  history: object,
};

export default NoMatch;
