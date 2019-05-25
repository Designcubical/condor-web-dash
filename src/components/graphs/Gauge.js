import * as React from "react";
import { Chart } from "react-google-charts";

export default class Gauge extends React.Component {
  render() {
    return (
      <div className={"my-pretty-chart-container"}>
      <Chart
        width={400}
        height={120}
        chartType="Gauge"
        loader={<div>Loading Chart</div>}
        data={[
          ['Label', 'Value'],
          ['Städ', 12],
          ['Bokningar', 89],
          ['Restaurang', 45],
        ]}
        options={{
          redFrom: 90,
          redTo: 100,
          yellowFrom: 75,
          yellowTo: 90,
          minorTicks: 5,
        }}
        rootProps={{ 'data-testid': '1' }}
      />
      </div>
    );
  }
}