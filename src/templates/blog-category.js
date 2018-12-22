import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

import style from './page.module.scss'

class BlogCategoryTemplate extends React.Component {
    render() {
        const posts = this.props.data.allMarkdownRemark.edges
        const {siteMetadata, categorys} = this.props.pageContext;

        return (
            <Layout location={this.props.location} categorys={categorys} siteMetadata={siteMetadata}>
                <ul className={style.categoryList}>
                {
                    posts.map(({node}) => (
                        <li className={style.categoryItem} key={node.fields.slug}><Link to={node.fields.slug}>{node.frontmatter.title} ---------- <small className={style.categoryDate}>{node.frontmatter.date}</small></Link></li>
                    ))
                }
                </ul>
            </Layout>
        )
    }
}

export default BlogCategoryTemplate

export const pageQuery = graphql`
  query BlogCategoryBySlug($categoryName: String!) {
    allMarkdownRemark(
        filter: { fields: { category: {eq: $categoryName } } },
        sort: { fields: [frontmatter___date], order: DESC }, limit: 1000
    ) {
        edges {
          node {
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