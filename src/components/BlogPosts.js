import Img from 'gatsby-image'
import React from 'react'
import { Link } from 'gatsby'


const PostsEmpty = () => {
  return (
    <p>
      No blog posts found.
    </p>
  )
}


const PostsList = ({ author, posts }) => {
  return (
    <div className="posts-list">
        {posts.map((post, index) => {
          const featuredImgFluid= post.frontmatter?.featuredImage?.childImageSharp?.fluid
          // Use individual author if available, fallback to generic site author
          const displayAuthor = post.frontmatter.postAuthor || author;

          return (
            <article
              className="card post"
              itemScope
              itemType="http://schema.org/Article"
              key={post.fields.slug}
            >
              {featuredImgFluid && (
                <div className="card-image">
                  <Link to={post.fields.slug} itemProp="url">
                    <figure className="image">
                      <Img fluid={featuredImgFluid} />
                    </figure>
                  </Link>
                </div>
              )}

              <div className="card-content">
                <h1 className="title is-3 mb-3 has-text-black" itemProp="headline">
                  <Link to={post.fields.slug} itemProp="url">
                    {post.frontmatter.title}
                  </Link>
                </h1>
                <h2 className="subtitle is-6 mb-3 mt-0 has-text-dark" itemProp="description">
                  {post.frontmatter.description || post.excerpt}
                </h2>
                <p className="is-size-7">
                  <em>
                    {displayAuthor &&
                      <>
                        By <Link to="/">{displayAuthor}</Link> on {` `}
                      </>
                    }
                    {post.frontmatter.date}
                  </em>
                </p>
              </div>
            </article>
          )
        })}
    </div>
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
          <div className="column is-10 mt-6">
            {content}
          </div>
        </div>
      </div>
    </section>
  )
}


export default BlogPosts;
