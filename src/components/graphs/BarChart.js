import * as React from "react";
import { Chart } from "react-google-charts";

export default class BarChart extends React.Component {
  render() {
    return (
      <div className={"my-pretty-chart-container"}>
        <Chart
        width={'500px'}
        height={'300px'}
        chartType="Bar"
        loader={<div>Loading Chart</div>}
        data={[
            ['Year', 'Sales', 'Expenses', 'Profit'],
            ['2014', 1000, 400, 200],
            ['2015', 1170, 460, 250],
            ['2016', 660, 1120, 300],
            ['2017', 1030, 540, 350],
        ]}
        options={{
          animation: {
            startup: true,
            easing: 'linear',
            duration: 1500,
          },
          enableInteractivity: false,
        }}
        // For tests
        rootProps={{ 'data-testid': '2' }}
        />
      </div>
    );
  }
}