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


const PostsList = ({ posts }) => {
  return (
    <>
      {posts.map(post => {
        const title = post.frontmatter.title || post.fields.slug

        return (
          <article
            itemScope
            itemType="http://schema.org/Article"
            key={post.fields.slug}
          >
            <header>
              <div className="tags">
                {post.frontmatter.tags.map((tag, index) => {
                  return <span className="tag" key={index}>{tag}</span>
                })}
              </div>
              <h1 className="title">
                <Link to={post.fields.slug} itemProp="url">
                  <span itemProp="headline">{title}</span>
                </Link>
              </h1>
              <h2 className="subtitle">
                {post.frontmatter.date}
              </h2>
            </header>
            <p
              dangerouslySetInnerHTML={{
                __html: post.frontmatter.description || post.excerpt,
              }}
              itemProp="description"
            />
          </article>
        )
      })}
    </>
  )
}


const BlogPosts = ({ posts }) => {
  let content;

  if (posts.length === 0) {
    content = <PostsEmpty />
  } else {
    content = <PostsList posts={posts} />
  }

  return (
    <section className="section">
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-8">
            {content}
          </div>
        </div>
      </div>
    </section>
  )
}


export default BlogPosts;
