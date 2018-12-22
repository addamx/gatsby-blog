import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

class Home extends React.Component {
  render() {
    const { siteMetadata, categorys } = this.props.pageContext;
    const posts = this.props.data.allMarkdownRemark.edges

    return (
      <Layout location={this.props.location} categorys={categorys} siteMetadata={siteMetadata}>
        <SEO title="All posts" keywords={['blog', 'gatsby', 'javascript', 'react']} />
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <div key={node.fields.slug} style={{
              marginBottom: 40,
              paddingBottom: 10,
              borderBottom: '1px solid #ddd'
            }}>
              <h3
                style={{
                }}
              >
                <Link to={node.fields.slug}>
                  {title}
                </Link>
              </h3>
              <small>{node.frontmatter.date}</small>
              <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
            </div>
          )
        })}
      </Layout>
    )
  }
}

export default Home


export const PageQuery = graphql`
query PageQuery {
  allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }, limit: 10
  ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
}
`