import React from 'react';
import {Link, graphql} from 'gatsby';
import Layout from '../../components/layout'

import style from './categorys.module.scss'

class Categorys extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categorys: []
        }
    }

    componentWillMount() {
        const categorys = this.props.data.allDirectory.edges;
        const orders = this.props.data.site.siteMetadata.blogConfig.order;
        const _temp = []
        categorys.forEach(({node}) => {
            if (node.dir.substr(-4) === 'blog') {
                _temp.push({
                    name: node.name,
                    slug: '/' + node.name,
                    order: orders.findIndex(el => {
                        return el === node.name
                    })
                });
            }
        })
        _temp.sort((a, b) => {
            return a.order < b.order
        });
        this.setState(state => ({
            categorys: [...state.categorys, ..._temp]
        }))
    }

    render() {
        return (
            <Layout>
                <ul className={style.list}>
                    {
                        this.state.categorys.map(el => (
                            <li key={el.slug}><Link to={el.slug}>{el.name}</Link></li>
                        ))
                    }
                </ul>
            </Layout>
        )
    }
}

export default Categorys


export const pageQuery = graphql`
  query BlogCategoryList {
    site {
      siteMetadata {
        blogConfig {
          order
        }
      }
    },
    allDirectory {
      edges {
        node {
          name
          dir
        }
      }
    }
  }
`;