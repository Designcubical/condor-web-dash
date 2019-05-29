import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import { HTMLContent } from '../components/Content'
// import Scatter from '../components/graphs/Scatter'
// import Gauge from '../components/graphs/Gauge'
import Pie from '../components/graphs/Pie'
import BarGraph from '../components/graphs/BarGraph'
import LineGraph from '../components/graphs/Line'
import CalendarGraph from '../components/graphs/CalendarGraph';
import PieGraphData from '../components/graphs/data/PieGraphData'
import BarGraphData from '../components/graphs/data/BarGraphData'
import LineGraphData from '../components/graphs/data/LineGraphData'
import CalendarGraphData from '../components/graphs/data/CalendarGraphData'

export const DashboardPageTemplate = ({ title }) => {
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
              <div className="columns" style={{height: '300px'}}>
                    <CalendarGraph data={CalendarGraphData}/>
                </div>
              <div className="columns" style={{height: '300px'}}>
                <div className="column" style={{height: '300px'}}>
                <BarGraph data={BarGraphData} />
                </div>
                <div className="column" style={{height: '300px'}}>
                <Pie
                url='https://api.exchangeratesapi.io/latest?symbols=USD,GBP'
                data={PieGraphData}
                />
                </div>
                </div>
                <div className="columns">
                <div className="column" style={{height: '300px'}}>
                <Pie
                url='https://api.exchangeratesapi.io/latest?symbols=USD,GBP,CAD'
                data={PieGraphData}
                />
                </div>
                <div className="column" style={{height: '300px'}}>
                <LineGraph data={LineGraphData} />
                </div>
                </div>
              {/* <PageContent className="content" content={content} /> */}
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
        title={post.frontmatter.title}
        content={post.html}
      />
    </Layout>
  )
}

DashboardPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default DashboardPage

export const dashboardPageQuery = graphql`
  query DashboardPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
    }
  }
`
