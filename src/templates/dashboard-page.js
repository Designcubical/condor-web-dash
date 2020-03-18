import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { get } from 'lodash'
import Layout from '../components/Layout'
import { HTMLContent } from '../components/Content'
import LineGraph from '../components/graphs/Line'
import HistoryGraph from '../components/graphs/HistoryGraph'

export const DashboardPageTemplate = ({ title, graphData }) => {
//   const PageContent = contentComponent || Content
const [tab, setTab] = useState(1);
  return (
    <section className="section section--gradient">
      <div className="container">
        <div className="columns">
          <div className="column">
            <div className="section">
            <div
            id="navMenu"
            //className={`navbar-menu ${this.state.navBarActiveClass}`}
          >
            <div className="navbar-start has-text-centered">
            <div className="navbar-item" onClick={() => setTab(1)}> 
                Översikt
              </div>
              <div className="navbar-item" onClick={() => setTab(2)}>
                14 dagar
              </div>
            </div>
            <div className="navbar-end has-text-centered">
            </div>
          </div>
              <div className="columns" style={{display: (tab === 1) ? 'block' : 'none' }}>
                <div className="column" style={{height: '400px'}}>
                <h3 className="title is-size-3 has-text-weight-bold is-bold-light">
                Översikt omsättning per månad
              </h3>
                  <HistoryGraph title={'Charlottenberg'} />
                </div>
              </div>

              <div className="columns" style={{display: tab === 2 ? 'block' : 'none' }}>
                <div className="column" style={{height: '400px'}}>
                <h3 className="title is-size-3 has-text-weight-bold is-bold-light">
                Översikt inkomst/utgift 14 dagar
              </h3>
                  <LineGraph title={'Charlottenberg'} />
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
