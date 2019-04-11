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
import { changePollingPeriod } from '../../actions/pollingPeriod.actions';
import './MozartPollingPeriodDropdown.scss';

class MozartPollingPeriodDropdown extends React.Component {
  static defaultProps = {
    pollingPeriod: '10',
  };

  state = {
    isDropdownOpen: false,
  };

  toggle = () =>
    this.setState(state => ({
      isDropdownOpen: !state.isDropdownOpen,
    }));

  setPollingPeriod = e => {
    // eslint-disable-next-line no-shadow
    const { changePollingPeriod } = this.props;
    const { value: pollingPeriod } = e.target;
    return changePollingPeriod(pollingPeriod);
  };

  renderPollingPeriodText = () => {
    const { pollingPeriod } = this.props;

    switch (pollingPeriod) {
      case '2':
        return '02s';
      case '5':
        return '05s';
      case '10':
        return '10s';
      case '30':
        return '30s';
      default:
        return null;
    }
  };

  render() {
    const { isDropdownOpen } = this.state;
    return (
      <div className="MozartPollingPeriodDropdown">
        <ButtonDropdown isOpen={isDropdownOpen} toggle={this.toggle}>
          <DropdownToggle caret size="md" color="dark">
            <FontAwesomeIcon icon="sync-alt" />
            <span className="mx-2">{this.renderPollingPeriodText()}</span>
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem value={2} onClick={this.setPollingPeriod}>
              2s
            </DropdownItem>
            <DropdownItem value={5} onClick={this.setPollingPeriod}>
              5s
            </DropdownItem>
            <DropdownItem value={10} onClick={this.setPollingPeriod}>
              10s
            </DropdownItem>
            <DropdownItem value={30} onClick={this.setPollingPeriod}>
              30s
            </DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>
      </div>
    );
  }
}

MozartPollingPeriodDropdown.propTypes = {
  pollingPeriod: string,
  changePollingPeriod: func,
};

const mapStateToProps = ({ global = {} }) => ({
  pollingPeriod: global.pollingPeriod,
});

export default connect(
  mapStateToProps,
  { changePollingPeriod }
)(MozartPollingPeriodDropdown);
