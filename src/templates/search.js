import React from 'react'
import { Link, graphql } from 'gatsby'

import style from './page.module.scss'

import Layout from '../components/layout'
import SEO from '../components/seo'

const HighLightedHtml = ({keyword, html}) => {
  const newHtml = html.replace(keyword, `<span class="highlight-word">${keyword}</span>`)
  return (
    <blockquote style={{
      background: '#f5f5f5',
      padding: 10,
      fontSize: 12
    }} dangerouslySetInnerHTML={{ __html: newHtml}} />
  )
}

class Search extends React.Component {
    constructor(props) {
      super(props);
        this.state = {
            keyword: '',
            searchAll: false
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;

      this.setState({
        [name]: value
      });
    }

    render() {
        const { siteMetadata, categorys } = this.props.pageContext;
        const {keyword, searchAll} = this.state;
        let posts = this.props.data.allMarkdownRemark.edges

        if (keyword.length > 1) {
          // TODO: lowerCase search
          // const word = keyword.toLocaleLowerCase();
            posts = posts.filter(({node}) => {
              if (node.frontmatter.title.indexOf(keyword) !== -1) {
                // node.frontmatter.title = node.frontmatter.title.replace(keyword, `<span class="highlight-word">${keyword}</span>`)
                return true;
              };

              if (searchAll) {
                const indexInBody = node.rawMarkdownBody.indexOf(keyword);
                if (indexInBody !== -1) {
                  const max = node.rawMarkdownBody.length - 1;
                  const index = indexInBody;
                  const start = Math.max(0, index - 100);
                  const end = Math.min(max, index + 100);
                  node.heightLighted = node.rawMarkdownBody.slice(start, end);
                  return true;
                }
              }
              node.frontmatter.title = node.frontmatter.title
              return false;
            }, this)
        }

        return (
            <Layout location={this.props.location} categorys={categorys} siteMetadata={siteMetadata}>
                <SEO title="Search" keywords={['blog', 'gatsby', 'javascript', 'react']} />
                <input name="keyword" onChange={this.handleChange} value={keyword} />
            <label style={{marginLeft:10}}><input name="searchAll" onChange={this.handleChange} value={searchAll} type="checkbox" /> 搜索全文</label>
                <ul className={style.pageList}>
                    {
                        posts.map(({ node }) => (
                            <li key={node.fields.slug}>
                              <Link className={style.pageLink} to={node.fields.slug}>{node.frontmatter.title}
                                  <small className={style.pageDate}> ---------- {node.frontmatter.date}</small>
                              </Link>
                              {
                              keyword.length > 1 &&
                              searchAll &&
                              node.heightLighted &&
                               (<HighLightedHtml
                                  keyword={keyword}
                                  html={node.heightLighted}
                                />)
                              }
                              
                            </li>
                        ), this)
                    }
                </ul>
            </Layout>
        )
    }
}

export default Search


export const PageQuery = graphql`
query PostAllQuery {
  allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }, limit: 1000
  ) {
      edges {
        node {
          rawMarkdownBody
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