import React, { useEffect, useState } from 'react'
import { floor } from 'lodash'
import {
  BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import moment from 'moment-with-locales-es6';

const LineGraph = ({ title, data /* see data tab */ }) => {
    // Client-side Runtime Data Fetching
    const startDate = moment().subtract(14, 'days').calendar(); // '2020-02-01';
    const endDate = moment().format("MM/DD/YYYY"); // '2020-02-29';
    const hotelId = '5c99e138293f69177d22257d';
    const [periodData, setPeriodData] = useState([]);

  useEffect(() => {
    // get data from GitHub api
    fetch('https://condor-api.herokuapp.com/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `query {
            transactions(
              hotel: "${hotelId}"
              startdate: "${startDate}"
              enddate: "${endDate}"
            ) {
              createdAt
              hotelSystem {
                name
                income {
                  totals
                }
              }
              staffSystem {
                name
                expense {
                  incl
                  no
                }
              }
              posSystem {
                name
                income {
                  incl
                  no
                }
              }
            }
          }
          `}),
      })
      .then(response => response.json())
      .then(resultData => {
        let r = resultData && resultData.data.transactions.map(d => { 
          let t = moment(parseInt(d.createdAt));
            
            return({
              x: t.format('DD'),
              Hotell: d.hotelSystem[0] && d.hotelSystem[0].income ? floor(d.hotelSystem[0].income.totals) : 0,
              Trivec: d.posSystem[0] && d.posSystem[0].income ? floor(d.posSystem[0].income.incl) : 0,
              Caspeco: d.staffSystem[0] && d.staffSystem[0].expense ? floor(d.staffSystem[0].expense.incl) : 0
            })
        });

        setPeriodData(r);
      })
  }, []);

    return(
    <React.Fragment>
    <h3>{`${title} ${startDate} - ${endDate}`}</h3>

    <ResponsiveContainer width="100%" height="100%">
    <BarChart
        data={periodData}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="x" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Hotell" stackId="a" fill="#3e5388" />
        <Bar dataKey="Trivec" stackId="a" fill="#cab64e" />
        <Bar dataKey="Caspeco" fill="#ca884e" />
      </BarChart>
      </ResponsiveContainer>
    </React.Fragment>
)}
export default LineGraph;