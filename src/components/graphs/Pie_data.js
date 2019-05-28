import * as React from "react";
import { Chart } from "react-google-charts";

export default class Pie extends React.Component {
  constructor(props) {
    super(props)
    this.state = { dataLoadingStatus: false, chartData: [] }
}
async componentDidMount() {
    const response = await fetch(
        this.props.url,
    )
    const json = await response.json()
    const rateCurrencyNames = Object.keys(json.rates)
    const rateCurrencyValues = Object.values(json.rates)
    const chartData = [['Currency Name', 'Currency Rate']]
    for (let i = 0; i < rateCurrencyNames.length; i += 1) {
      chartData.push([rateCurrencyNames[i], rateCurrencyValues[i]])
    }
    this.setState({
      dataLoadingStatus: true,
      chartData: chartData,
    })
}

  render() {
    return (
      <React.Fragment>
        {this.state.dataLoadingStatus &&
      <Chart
        width={"100%"}
        height={'300px'}
        chartType="PieChart"
        loader={<div>Loading Chart</div>}
        data={this.state.chartData}
        options={{
            title: 'My Daily Activities',
            animation: {
            startup: true,
            easing: 'linear',
            duration: 500,
          },
          enableInteractivity: true,
        }}
        rootProps={{ 'data-testid': '1' }}
        />}
      </React.Fragment>
    );
  }
}