import Image from 'gatsby-image'
import React from 'react'
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useStaticQuery, graphql } from 'gatsby'


const About = () => {
  const data = useStaticQuery(graphql`
    query AboutQuery {
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
            facebook
            github
            linkedin
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
                className="about-avatar"
                imgStyle={{
                  borderRadius: `50%`,
                }}
              />
            </div>
          )}

          <div className="column is-6">
            {author?.name && (
              <p>
                <strong>{author.name}</strong> {author?.summary || null}
              </p>
            )}

            <p>
              {social.twitter &&
                <a href={`https://twitter.com/${social.twitter}`}>
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
              }
              {` `}
              {social.facebook &&
                <a href={`https://facebook.com/${social.facebook}`}>
                  <FontAwesomeIcon icon={faFacebookSquare} />
                </a>
              }
              {` `}
              {social.linkedin &&
                <a href={`https://linkedin.com/company/${social.linkedin}`}>
                  <FontAwesomeIcon icon={faLinkedin} />
                </a>
              }
              {` `}
              {social.github &&
                <a href={`https://github.com/${social.github}`}>
                  <FontAwesomeIcon icon={faGithub} />
                </a>
              }
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}


export default About
