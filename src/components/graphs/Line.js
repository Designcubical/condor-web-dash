import React, { useEffect, useState } from 'react'
import { floor } from 'lodash'
import {
  BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import moment from 'moment-with-locales-es6';
import regression from 'regression';

import config from '../../config.json';

const LineGraph = ({ hotelId /* see data tab */ }) => {
    const startDate = moment().subtract(14, 'days').calendar(); // '2020-02-01';
    const endDate = moment().format("MM/DD/YYYY"); // '2020-02-29';
    // const hotelId = '5c99e138293f69177d22257d';
    const [periodData, setPeriodData] = useState([]);
    // const [hotelId, sethotelId] = useState('5e75344b1c9d440000effd9b');

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
        const res = [];

        let r = resultData
          && resultData.data
          && resultData.data.transactions
          && resultData.data.transactions.map(d => { 
          let t = moment(parseInt(d.createdAt));
            return({
              x: t.format('DD'),
              m: t.format('MM'),
              y: t.format('YYYY'),
              Hotell: d.hotelSystem[0] && d.hotelSystem[0].income ? floor(d.hotelSystem[0].income.totals) : 0,
              Trivec: d.posSystem[0] && d.posSystem[0].income ? floor(d.posSystem[0].income.incl) : 0,
              Caspeco: d.staffSystem[0] && d.staffSystem[0].expense ? floor(d.staffSystem[0].expense.incl) : 0
            })
        });

        setPeriodData(r);
      })
  }, [hotelId]);

    return(
    <React.Fragment>
    <h3>{`${startDate} - ${endDate}`}</h3>

    <ResponsiveContainer width="100%" height="100%">
    <BarChart
        width={600} height={600}
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