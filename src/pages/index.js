import React from 'react'
import { graphql } from 'gatsby'

import About from 'Components/About'
import BlogPosts from 'Components/BlogPosts'
import HeroIntro from 'Components/HeroIntro'
import HeroProjects from 'Components/HeroProjects'
import Layout from 'Components/Layout'
import SEO from 'Components/SEO'


const IndexPage = ({ data, location }) => {
  const author = data.site.siteMetadata?.author?.name
  const posts = data.allMarkdownRemark.nodes
  const siteTitle = data.site.siteMetadata?.title || `Title`

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Home" />
      <HeroIntro />
      <HeroProjects />
      <BlogPosts author={author} posts={posts} />
      <About />
    </Layout>
  )
}


export default IndexPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        author {
          name
        }
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          description
          featuredImage {
            childImageSharp {
              fluid(maxWidth: 400) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          tags
          title
          postAuthor
        }
      }
    }
  }
`
