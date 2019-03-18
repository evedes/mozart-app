import React from 'react';
import { func, string } from 'prop-types';

class MozartChartContainer extends React.Component {
  calcChartHeight = () => {
    const { headerHeight } = this.props;
    return `calc(100% - ${headerHeight})`;
  };

  render() {
    const { Chart, Header } = this.props;
    return (
      <>
        <Header />
        <div style={{ height: this.calcChartHeight() }}>
          <Chart />
        </div>
      </>
    );
  }
}

MozartChartContainer.propTypes = {
  Chart: func,
  Header: func,
  headerHeight: string,
};

export default MozartChartContainer;
