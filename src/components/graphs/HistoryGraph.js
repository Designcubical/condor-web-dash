import React, { useEffect, useState } from 'react'
import { floor } from 'lodash'
import {
  AreaChart, Area, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import moment from 'moment-with-locales-es6';
import regression from 'regression';

import History from '../graphs/data/historyOverview.json'

function groupBy(list, keyGetter) {
  const map = new Map();
  list.forEach((item) => {
       const key = keyGetter(item);
       const collection = map.get(key);
       if (!collection) {
           map.set(key, [item]);
       } else {
           collection.push(item);
       }
  });
  return map;
}

const HistoryGraph = ({ hotelId, data /* see data tab */ }) => {
    // Client-side Runtime Data Fetching
    const startDate = moment('2020-01-01').format("MM/DD/YYYY"); // moment().subtract(14, 'days').calendar(); // '2020-02-01';
    const endDate = moment('2020-12-31').format("MM/DD/YYYY"); // '2020-02-29';
    // const hotelId = '5e75344b1c9d440000effd9b';
    const [periodData, setPeriodData] = useState([]);

  useEffect(() => {
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
              hotelSystem12 {
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

        let r = resultData && resultData.data.transactions.map(d => { 
          let t = moment(parseInt(d.createdAt));
            return({
              x: t.format('DD'),
              m: t.format('MM'),
              Hotell: d.hotelSystem12[0] && d.hotelSystem12[0].income ? floor(d.hotelSystem12[0].income.totals) : 0,
              Trivec: d.posSystem[0] && d.posSystem[0].income ? floor(d.posSystem[0].income.incl) : 0,
              Caspeco: d.staffSystem[0] && d.staffSystem[0].expense ? floor(d.staffSystem[0].expense.incl) : 0
            })
        });

        const grouped = groupBy(r, pet => pet.m);
        const p = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"].map(m => 
        {
          if(!grouped.has(m)) 
            return;
          
          return grouped.get(m).reduce((acc, {Hotell, Trivec}) => ({
            x: m,
            Tot_2020: (acc.Tot_2020 + Hotell + Trivec)
          }),
          {
            x: "",
            Tot_2020: 0
          });
        });
        
        const lts = p.filter(pp => pp);
        const rr = History
          .filter(h => h.hotelId === hotelId)[0]
          .data.map((t, i) => {
            return({
              x: t.month,
              Tot_2018: (t.values.tot_2018 ? floor(t.values.tot_2018) : 0),
              Tot_2019: (t.values.tot_2019 ? floor(t.values.tot_2019) : 0),
              Tot_2020: (lts[i] ? floor(lts[i].Tot_2020) : 0)
            });
        });

        setPeriodData(rr);
      });
  }, [hotelId]);

    return(
    <React.Fragment>
    <h3>{`${startDate} - ${endDate}`}</h3>

    <ResponsiveContainer width="100%" height="100%">
    <AreaChart
        data={periodData}
        width={600} height={600}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="x" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area type="monotone" dataKey="Tot_2018" stroke="#3e5388" fill="#3e5388" />
        <Area type="monotone" dataKey="Tot_2019" stroke="#cab64e" fill="#cab64e" />
        <Area type="monotone" dataKey="Tot_2020" stroke="#ca884e" fill="#ca884e" />
      </AreaChart>
      </ResponsiveContainer>
    </React.Fragment>
)}
export default HistoryGraph;