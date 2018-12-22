const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.createPages = ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions

  createRedirect({ fromPath: '/', redirectInBrowser: true, toPath: '/home' });
  console.log(`Redirecting: "/" To "/home"`);

  return new Promise((resolve, reject) => {
    const home = path.resolve('./src/templates/home.js');
    const blogPost = path.resolve('./src/templates/blog-post.js');
    const blogCategory = path.resolve('./src/templates/blog-category.js');
    resolve(
      graphql(
        `
          {
            allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, limit: 1000) {
              edges {
                node {
                  fields {
                    slug
                  }
                  frontmatter {
                    title
                  }
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
            },
            site {
              siteMetadata {
                title
                author
                description
                blogConfig {
                  order
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        const siteMetadata = result.data.site.siteMetadata;
        const orders = result.data.site.siteMetadata.blogConfig.order;
        const posts = result.data.allMarkdownRemark.edges;
        const categorys = []

        result.data.allDirectory.edges.forEach(({node}) => {
          if (node.dir.substr(-4) === 'blog') {
            categorys.push({
              name: node.name,
              slug: '/' + node.name,
              order: orders.findIndex(el => {
                return el === node.name
              })
            });
          }
        });
        categorys.sort((a, b) => {
          return a.order - b.order;
        });

        // Common requiredProps
        const requiredProps = {
          siteMetadata,
          categorys
        };
        
        // Categorys
        categorys.forEach((cate) => {
          createPage({
            path: cate.slug,
            component: blogCategory,
            context: {
              categoryName: cate.name,
              ...requiredProps
            }
          })
        });

        // Home
        createPage({
          path: '/home',
          component: home,
          context: {
            slug: '/home',
            ...requiredProps
          }
        });


        // Create blog posts pages.
        posts.forEach((post, index) => {
          const previous = index === posts.length - 1 ? null : posts[index + 1].node;
          const next = index === 0 ? null : posts[index - 1].node;
          createPage({
            path: post.node.fields.slug,
            component: blogPost,
            context: {
              slug: post.node.fields.slug,
              previous,
              next,
              ...requiredProps
            },
          })
        })
      })
    )
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode }) //createFilePath({ node, getNode, basePath: `pages` })
    // const fileNode = getNode(node.parent)
    // console.log(`\n`, fileNode.relativePath)   
    //#: This function allows you to create additional fields on nodes created by other plugins.
    createNodeField({
      name: `slug`,
      node,
      value,
    });
    createNodeField({
      name: `category`,
      node,
      value: node.fields.slug.replace(/^\/(.*?)\/.*/,'$1')
    });
  }
}
