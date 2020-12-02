const path = require('path')


module.exports = {
  siteMetadata: {
    title: `Merit Network, Inc. Open Source and Technology`,
    author: {
      company: `Merit Network, Inc.`,
      name: `Merit Open Source and Technology`,
      summary: `A nonprofit member-governed organization providing high-performance computer networking and related services to educational, government, health care, and nonprofit organizations, primarily in Michigan.`,
      website: `https://www.merit.edu`
    },
    description: `Open source and technology from Merit Network, Inc.`,
    siteUrl: `https://merit-network.github.io/`,
    siteRepo: `https://github.com/merit-network/merit-network.github.io`,
    social: {
      facebook: `meritnetwork`,
      github: `merit-network`,
      linkedin: `merit-network`,
      twitter: `meritnetwork`,
    },
    googleSiteVerification: `84vgr6j3VOMblKtNsVIIh0i6uPo1GQPuD0h4VZ362NU`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-gtag`,
      options: {
        anonymize: true,
        head: false,
        trackingId: `G-ZF9QCNFCVG`,
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ "content:encoded": edge.node.html }],
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields { slug }
                      frontmatter {
                        title
                        date
                      }
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "Merit Network, Inc. Open Source and Technology RSS Feed",
            match: "^/blog/",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Merit Network, Inc. Open Source and Technology`,
        short_name: `Merit Open Source and Technology`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#00babc`,
        display: `minimal-ui`,
        icon: `content/assets/merit-icon.png`,
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        implementation: require('sass'),
        rule: {
          include: /assets/
        }
      }
    },
    `gatsby-plugin-fontawesome-css`,
    {
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias: {
          'Components': path.resolve(__dirname, 'src/components'),
          'Pages': path.resolve(__dirname, 'src/pages'),
          'Templates': path.resolve(__dirname, 'src/templates'),
        },
        extensions: ['js']
      }
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
