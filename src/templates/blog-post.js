import Img from 'gatsby-image'
import React from 'react'
import { Link, graphql } from 'gatsby'

import About from 'Components/About'
import Layout from 'Components/Layout'
import SEO from 'Components/SEO'



const PostHeader = ({ author, post }) => {
  return (
    <div className="columns is-centered">
      <div className="column is-7">
        <header className="block mb-5">
          <h1 className="title is-1 mb-4 has-text-black" itemProp="headline">
            {post.frontmatter.title}
          </h1>
          <h2 className="subtitle is-4 mb-4 mt-1 has-text-dark" itemProp="description">
            {post.frontmatter.description || post.excerpt}
          </h2>
          <p className="is-size-6"><em>
            {author &&
              <>
                By <Link to="/">{author}</Link> on {` `}
              </>
            }
            {post.frontmatter.date}
          </em></p>
        </header>
      </div>
    </div>
  )
}

const PostFeaturedImage = ({ post }) => {
  const featuredImgFluid = post.frontmatter?.featuredImage?.childImageSharp?.fluid

  if (!featuredImgFluid) return (null);

  return (
    <div className="columns is-centered mb-5">
      <div className="column is-10">
        <figure className="image block">
          <Img fluid={featuredImgFluid} />
        </figure>
      </div>
    </div>
  )
}


const PostBody = ({ post }) => {
  return (
    <div className="columns is-centered">
      <div className="column is-7">
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />
      </div>
    </div>
  )
}


const PostFooter = () => {
  return (
    <div className="columns is-centered">
      <div className="column is-10">
        <div className="mt-6 mb-0">
          <hr />
        </div>
      </div>
    </div>
  )
}


const PostsNav = ({ next, previous }) => {
  if (!next && !previous) return (null)

  return (
    <>
      <div className="columns is-centered">
        <div className="column is-10">

          <div className="level">
            <div className="level-left">
              {previous && (
                <div className="level-item has-text-left">
                  <div>
                    <p className="has-text-dark">Previous:</p>
                    <p><strong>
                      <Link to={previous.fields.slug} rel="prev">
                        {previous.frontmatter.title}
                      </Link>
                    </strong></p>
                  </div>
                </div>
              )}
            </div>
            <div className="level-right">
              {next && (
                <div className="level-item has-text-right">
                  <div>
                    <p className="has-text-dark">Next:</p>
                    <p><strong>
                      <Link to={next.fields.slug} rel="next">
                        {next.frontmatter.title}
                      </Link>
                    </strong></p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="columns is-centered">
        <div className="column is-10">
          <hr className="mt-3" />
        </div>
      </div>
    </>
  )
}


const BlogPostTemplate = ({ data, pageContext, location }) => {
  const author = data.site.siteMetadata?.author?.name
  const post = data.markdownRemark
  const { previous, next } = pageContext

  const siteTitle = data.site.siteMetadata?.title || `Title`

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        description={post.frontmatter.description || post.excerpt}
        title={post.frontmatter.title}
      />
      <section className="section">
        <div className="container">
          <article
            className="blog-post"
            itemScope
            itemType="http://schema.org/Article"
          >
            <PostHeader author={author} post={post} />
            <PostFeaturedImage post={post} />
            <PostBody post={post} />
            <PostFooter />
          </article>
          <PostsNav next={next} previous={previous} />
        </div>
      </section>
      <About />
    </Layout>
  )
}


export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        author {
          name
        }
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        description
        title
        tags
        featuredImage {
          childImageSharp {
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
