import React, { useEffect, useState } from 'react'
import { floor } from 'lodash'
import {
  BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import moment from 'moment-with-locales-es6';
import regression from 'regression';

import config from '../../config.json';

function groupBy(objectArray, property) {
  return objectArray.reduce(function (acc, obj) {
    let key = obj[property]
    if (!acc[key]) {
      acc[key] = []
    }
    acc[key].push(obj)
    return acc
  }, {})
}

const LineGraphAll = ({ hotelId /* see data tab */ }) => {
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
            transactionsAll(
              hotels:
                ["5e7536991c9d440000effd9c",
                "5e7537171c9d440000effd9d",
                "5e75344b1c9d440000effd9b",
                "5e7537a31c9d440000effd9e"]
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
        let groupedPeople = groupBy(resultData.data.transactionsAll, 'createdAt');
        let tot =
          Object.entries(groupedPeople).map(([key, value]) => {

          return value.reduce((acc, {hotelSystem, staffSystem, posSystem}) => ({
            createdAt: key,
            Tot_hotelSystem: (acc.Tot_hotelSystem + hotelSystem[0].income.totals),
            Tot_staffSystem: (acc.Tot_staffSystem + (staffSystem[0] ? staffSystem[0].expense.incl : 0)),
            Tot_posSystem: (acc.Tot_posSystem + (posSystem[0] ? posSystem[0].income.incl : 0))
          }),
          {
            x: "",
            Tot_hotelSystem: 0,
            Tot_staffSystem: 0,
            Tot_posSystem: 0,
          });
        });

        const res = [];

        let r = resultData
          && resultData.data
          && resultData.data.transactionsAll
          && tot.map(d => { 
          let t = moment(parseInt(d.createdAt));
            return({
              x: t.format('DD'),
              m: t.format('MM'),
              y: t.format('YYYY'),
              Hotell: d.Tot_hotelSystem ? floor(d.Tot_hotelSystem) : 0,
              Trivec: d.Tot_posSystem ? floor(d.Tot_posSystem) : 0,
              Caspeco: d.Tot_staffSystem ? floor(d.Tot_staffSystem) : 0
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
export default LineGraphAll;