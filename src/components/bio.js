/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          fixed(width: 50, height: 50, quality: 95) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
          }
        }
      }
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author
  const social = data.site.siteMetadata?.social

  const avatar = data?.avatar?.childImageSharp?.fixed

  return (
    <section className="section">
      <div className="container">
        <div className="columns is-centered">
          {avatar && (
            <div className="column is-narrow">
              <Image
                fixed={avatar}
                alt={author?.name || ``}
                className="bio-avatar"
                imgStyle={{
                  borderRadius: `50%`,
                }}
              />
            </div>
          )}

          {author?.name && (
            <div className="column is-6">
              <p>
                Written by <strong>{author.name}</strong> {author?.summary || null}
                {` `}
                <a href={`https://twitter.com/${social?.twitter || ``}`}>
                  Follow us on Twitter
                </a>
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Bio
