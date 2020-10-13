module.exports = {
  siteMetadata: {
    title: `Merit Network, Inc. Open Source and Technology Blog`,
    author: {
      name: `Merit Network, Inc.`,
      summary: `A nonprofit member-governed organization providing high-performance computer networking and related services to educational, government, health care, and nonprofit organizations, primarily in Michigan.`,
    },
    description: `Open source and technology blog from Merit Network, Inc.`,
    siteUrl: `https://merit-network.github.io/`,
    social: {
      facebook: `meritnetwork`,
      github: `merit-network`,
      linkedin: `merit-network`,
      twitter: `meritnetwork`,
    },
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
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        //trackingId: `ADD YOUR TRACKING ID HERE`,
      },
    },
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Merit Network, Inc. Open Source and Technology Blog`,
        short_name: `TechBlog`,
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
        rule: {
          include: /assets/
        }
      }
    },
    /*
    {
      // https://www.gatsbyjs.com/plugins/gatsby-source-graphql/
      resolve: "gatsby-source-graphql",
      options: {
        typeName: "GitHub",
        fieldName: "github",
        url: "https://api.github.com/graphql",
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        },
      },
    },
    */
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
