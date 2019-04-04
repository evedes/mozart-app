import React from 'react';
import { string, func } from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { changeChartingTime } from '../../actions/chartingTime.actions';
import './MozartChartPeriodDropdown.scss';

class MozartChartPeriodDropdown extends React.Component {
  static defaultProps = {
    chartingPeriod: '10',
  };

  state = {
    isDropdownOpen: false,
  };

  toggle = () =>
    this.setState(state => ({
      isDropdownOpen: !state.isDropdownOpen,
    }));

  setChartingPeriod = e => {
    const { dispatch } = this.props;
    const { value: chartingPeriod } = e.target;
    return dispatch(changeChartingTime(chartingPeriod));
  };

  renderChartingPeriodText = () => {
    const { chartingPeriod, currentBreakpoint } = this.props;
    if (currentBreakpoint === 'sm') return null;

    switch (chartingPeriod) {
      case '10':
        return 'Last 10m';
      case '60':
        return 'Last 01h';
      case '720':
        return 'Last 12h';
      case '1440':
        return 'Last 24h';
      default:
        return null;
    }
  };

  render() {
    const { isDropdownOpen } = this.state;
    return (
      <div className="MozartChartPeriodDropdown">
        <ButtonDropdown isOpen={isDropdownOpen} toggle={this.toggle}>
          <DropdownToggle caret size="md" color="dark">
            <FontAwesomeIcon icon="clock" />
            <span className="mx-2">{this.renderChartingPeriodText()}</span>
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem value={10} onClick={this.setChartingPeriod}>
              Last 10 minutes
            </DropdownItem>
            <DropdownItem value={60} onClick={this.setChartingPeriod}>
              Last 01 hour
            </DropdownItem>
            <DropdownItem value={720} onClick={this.setChartingPeriod}>
              Last 12 hours
            </DropdownItem>
            <DropdownItem value={1440} onClick={this.setChartingPeriod}>
              Last 24 hours
            </DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>
      </div>
    );
  }
}

MozartChartPeriodDropdown.propTypes = {
  chartingPeriod: string,
  currentBreakpoint: string,
  dispatch: func,
};

const mapStateToProps = ({ global = {} }) => ({
  chartingPeriod: global.chartingPeriod,
});

export default connect(mapStateToProps)(MozartChartPeriodDropdown);
