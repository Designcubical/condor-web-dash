import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { get } from 'lodash'
import Layout from '../components/Layout'
import { HTMLContent } from '../components/Content'
import LineGraph from '../components/graphs/Line'
import HistoryGraph from '../components/graphs/HistoryGraph'
import LineGraphAll from '../components/graphs/LineAll'

export const DashboardPageTemplate = ({ title, graphData }) => {
const [hotelId, setHotelId] = useState('5e75344b1c9d440000effd9b');
const [tab, setTab] = useState(1);

  return (
    <section className="section">
      <div className="container">
        <div className="columns">
          <div className="column">
            <div className="section">
            <div className="tabs">
          <div className="tabs is-boxed">
  <ul>
    <li className={hotelId === '5e75344b1c9d440000effd9b' ? "is-active" : ""}><a onClick={() => setHotelId('5e75344b1c9d440000effd9b')}>Hotell Charlottenberg</a></li>
    <li className={hotelId === '5e7537a31c9d440000effd9e' ? "is-active" : ""}><a onClick={() => setHotelId('5e7537a31c9d440000effd9e')}>Statt Kristinehamn</a></li>
    <li className={hotelId === '5e7536991c9d440000effd9c' ? "is-active" : ""}><a onClick={() => setHotelId('5e7536991c9d440000effd9c')}>Hotell Årjäng</a></li>
    <li className={hotelId === '5e7537171c9d440000effd9d' ? "is-active" : ""}><a onClick={() => setHotelId('5e7537171c9d440000effd9d')}>Hotell Nobel</a></li>
    <li className={hotelId === '0' ? "is-active" : ""}><a onClick={() => setHotelId('0')}>Totalt</a></li>
  </ul>
</div>
</div>
            <div className="field has-addons">
  <p className="control">
    <button 
      className="button"
      className={tab === 1 ? "button is-info is-selected" : "button"}
      onClick={() => setTab(1)}
    >
      <span>Översikt</span>
    </button>
  </p>
  <p className="control">
    <button className={tab === 2 ? "button is-info is-selected" : "button"}
    onClick={() => setTab(2)}>
      <span>14 dagar</span>
    </button>
  </p>
</div>
              <div className="columns" style={{display: (tab === 1) ? 'block' : 'none' }}>
                <div className="column" style={{height: '400px'}}>
                <h3 className="title is-size-3 has-text-weight-bold is-bold-light">
                Översikt omsättning per månad
              </h3>
                {
                  hotelId !== '0' && <HistoryGraph hotelId={hotelId} />
                }
                {
                  hotelId === '0' && <div>Inte tillgänglig, endast 14 dagar.</div>
                }
                </div>
              </div>

              <div className="columns" style={{display: tab === 2 ? 'block' : 'none' }}>
                <div className="column" style={{height: '400px'}}>
                <h3 className="title is-size-3 has-text-weight-bold is-bold-light">
                Översikt inkomst/utgift 14 dagar
              </h3>
                  {
                    hotelId !== '0' && <LineGraph hotelId={hotelId} />
                  }
                  {
                    hotelId === '0' && <LineGraphAll hotelId={hotelId} />
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

DashboardPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

const DashboardPage = ({ data }) => {
  const { markdownRemark: post } = data
  
  return (
    <Layout>
      <DashboardPageTemplate
        contentComponent={HTMLContent}
        title="Översikt inkomst/utgift 14 dagar"
        graphData={get(data, 'condor.transactions', [])}
        // content={post.html}
      />
    </Layout>
  )
}

DashboardPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default DashboardPage

export const dashboardPageQuery = graphql`
query {
    condor {
      transactions(
        hotel: "5c99e138293f69177d22257d",
        startdate:"2019-12-1",
        enddate:"2019-12-1"
      )
      {
        staffSystem {
          name
          groups {
            name
            incl
          }
        }
      }
    }
  }
`
