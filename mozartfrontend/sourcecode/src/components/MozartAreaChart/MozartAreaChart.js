import React from 'react';
import _ from 'lodash';
import moment from 'moment';
import { array, string } from 'prop-types';
import tinycolor from 'tinycolor2';

import {
  AreaChart,
  Area,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import MozartChartHeader from '../MozartChartHeader';
import MozartChartContainer from '../MozartChartContainer';

import { defaultColors } from './constants';

import './MozartAreaChart.scss';

class MozartAreaChart extends React.Component {
  static defaultProps = {
    colors: defaultColors,
  };

  state = {
    isChartHovered: false,
  };

  onMouseHover = () =>
    this.setState({
      isChartHovered: true,
    });

  onMouseLeave = () =>
    this.setState({
      isChartHovered: false,
    });

  getLineKeys = () => {
    const { data, xKey } = this.props;
    return _.keysIn(_.first(data)).filter(key => key !== xKey);
  };

  getStrokeColor = color => _.toString(tinycolor(color).setAlpha(0.8));

  getFillColor = color => _.toString(tinycolor(color).setAlpha(0.2));

  getAxisColor = () => _.toString(tinycolor('white').setAlpha(0.65));

  getGridColor = () => _.toString(tinycolor('white').setAlpha(0.15));

  tickFormat = tick => moment(tick).format('HH:mm:ss');

  Header = () => {
    const { title } = this.props;
    const { isChartHovered } = this.state;
    return <MozartChartHeader title={title} isChartHovered={isChartHovered} />;
  };

  Chart = () => {
    const { data, colors, xKey } = this.props;
    const yKeys = this.getLineKeys();
    return (
      <>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            style={{ cursor: 'crosshair' }}
            data={data}
            className="MozartAreaChart"
            margin={{ top: 10, right: 5, left: -25, bottom: -10 }}
            onMouseOver={this.onMouseHover}
            onMouseLeave={this.onMouseLeave}
            onFocus={() => {}}
          >
            {_(yKeys)
              .map((lineKey, i) => (
                <Area
                  key={lineKey}
                  stroke={this.getStrokeColor(colors[i])}
                  activeDot={{
                    stroke: this.getStrokeColor(colors[i]),
                    strokeWidth: 2,
                    opacity: 0.5,
                  }}
                  strokeWidth={1.6}
                  fill={this.getFillColor(colors[i])}
                  dataKey={lineKey}
                />
              ))
              .value()}
            ) .value()}
            <XAxis dataKey={xKey} stroke={this.getAxisColor()} tickSize={3} />
            <YAxis type="number" stroke={this.getAxisColor()} />
            <CartesianGrid stroke={this.getGridColor()} />
            <Tooltip
              cursor={{ stroke: 'red' }}
              contentStyle={{
                backgroundColor: '#161719',
                border: this.getGridColor(),
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </>
    );
  };

  render() {
    return (
      <MozartChartContainer
        headerHeight="30px"
        Chart={this.Chart}
        Header={this.Header}
      />
    );
  }
}

MozartAreaChart.propTypes = {
  data: array,
  colors: array,
  title: string,
  xKey: string,
};

export default MozartAreaChart;
