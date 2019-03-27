import React from 'react';
import { string, bool } from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './MozartWidgetHeader.scss';

class MozartWidgetHeader extends React.Component {
  state = {
    isDropDownVisible: false,
  };

  onMouseOver = () => {
    this.setState({
      isDropDownVisible: true,
    });
  };

  onMouseLeave = () => {
    this.setState({
      isDropDownVisible: false,
    });
  };

  renderDropDownButton = () => (
    <span className="caret-down">
      <FontAwesomeIcon className="ml-2" icon="caret-down" />
    </span>
  );

  render() {
    const { title, isChartHovered } = this.props;
    const { isDropDownVisible } = this.state;
    return (
      <div
        className="MozartWidgetHeader d-flex justify-content-center align-items-center"
        onFocus={() => {}}
        onMouseLeave={this.onMouseLeave}
        onMouseOver={this.onMouseOver}
      >
        <span>
          {title}
          {isDropDownVisible || isChartHovered
            ? this.renderDropDownButton()
            : null}
        </span>
      </div>
    );
  }
}

MozartWidgetHeader.propTypes = {
  title: string,
  isChartHovered: bool,
};

export default MozartWidgetHeader;
