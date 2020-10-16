import Img from 'gatsby-image'
import React from 'react'
import { Link } from 'gatsby'


const PostsEmpty = () => {
  return (
    <p>
      No blog posts found. Add markdown posts to "content/blog" (or the
      directory you specified for the "gatsby-source-filesystem" plugin in
      gatsby-config.js).
    </p>
  )
}


const PostsList = ({ author, posts }) => {
  return (
    <>
      {posts.map(post => {
        const featuredImgFixed = post.frontmatter?.featuredImage?.childImageSharp?.fixed

        return (
          <article
            itemScope
            itemType="http://schema.org/Article"
            key={post.fields.slug}
          >
            <div className="columns">
              <div className="column">
                <h1 className="title is-2 mb-4 has-text-black" itemProp="headline">
                  <Link to={post.fields.slug} itemProp="url">
                    {post.frontmatter.title}
                  </Link>
                </h1>
                <h2 className="subtitle is-5 mb-4 mt-1 has-text-dark" itemProp="description">
                  {post.frontmatter.description || post.excerpt}
                </h2>
                <p className="is-size-6">
                  <em>
                    {author &&
                      <>
                        By <Link to="/">{author}</Link> on {` `}
                      </>
                    }
                    {post.frontmatter.date}
                  </em>
                </p>
              </div>
              {featuredImgFixed && (
                <div className="column is-narrow">
                  <Link to={post.fields.slug} itemProp="url">
                    <figure className="image block">
                      <Img fixed={featuredImgFixed} />
                    </figure>
                  </Link>
                </div>
              )}
            </div>
            <div className="mt-6 mb-6">
              <hr />
            </div>
          </article>
        )
      })}
    </>
  )
}


const BlogPosts = ({ author, posts }) => {
  let content;

  if (posts.length === 0) {
    content = <PostsEmpty />
  } else {
    content = <PostsList author={author} posts={posts} />
  }

  return (
    <section className="section">
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-8 mt-6">
            {content}
          </div>
        </div>
      </div>
    </section>
  )
}


export default BlogPosts;
