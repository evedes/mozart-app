import React from 'react';
import { string } from 'prop-types';
import _ from 'lodash';
import tinycolor from 'tinycolor2';

import './MozartChartHeader.scss';

class MozartChartHeader extends React.Component {
  getTitleColor = color => _.toString(tinycolor(color).setAlpha(0.5));

  render() {
    const { title } = this.props;
    return (
      <div
        className="MozartChartHeader d-flex justify-content-center"
        style={{ color: this.getTitleColor('white') }}
      >
        {title}
      </div>
    );
  }
}

MozartChartHeader.propTypes = {
  title: string,
};

export default MozartChartHeader;
