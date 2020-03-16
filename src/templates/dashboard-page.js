import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { get } from 'lodash'
import Layout from '../components/Layout'
import { HTMLContent } from '../components/Content'
import LineGraph from '../components/graphs/Line'
import Bookings from '../components/graphs/data/LineGraphData_bok'

export const DashboardPageTemplate = ({ title, graphData }) => {
//   const PageContent = contentComponent || Content
  return (
    <section className="section section--gradient">
      <div className="container">
        <div className="columns">
          <div className="column">
            <div className="section">
              <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
                {title}
              </h2>
              <div className="columns">
                <div className="column" style={{height: '300px'}}>
                <LineGraph data={Bookings} title={'Charlottenberg'} />
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
