import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import { HTMLContent } from '../components/Content'
import Scatter from '../components/graphs/Scatter'
import Gauge from '../components/graphs/Gauge'
import Pie from '../components/graphs/Pie'
import BarChart from '../components/graphs/BarChart'
import Line from '../components/graphs/Line'

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
              <div className="columns">
                <div className="column">
                <BarChart />
                </div>
                <div className="column">
                <Pie />
                </div>
                </div>
                <div className="columns">
                <div className="column">
                <Pie />
                </div>
                <div className="column">
                <Line />
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
