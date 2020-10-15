import Image from 'gatsby-image'
import React from 'react'
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faGlobeAmericas } from '@fortawesome/free-solid-svg-icons'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { useStaticQuery, graphql } from 'gatsby'

import ButtonIcon from 'Components/ButtonIcon'


const About = () => {
  const data = useStaticQuery(graphql`
    query AboutQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          fixed(width: 76, height: 76, quality: 95) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author {
            company
            name
            summary
            website
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

  const author = data.site.siteMetadata?.author
  const avatar = data?.avatar?.childImageSharp?.fixed
  const social = data.site.siteMetadata?.social

  return (
    <section className="section">
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-10">

            <div className="columns is-centered">
              <div className="column is-narrow pt-4 pr-4">
                {avatar && (
                  <a href={author.website}>
                    <Image
                      alt={author?.company || ``}
                      fixed={avatar}
                    />
                  </a>
                )}
              </div>
              <div className="column">
                <h4 className="title is-5 mb-2">
                  <a href={author.website}>
                    <strong>{author.company}</strong>
                  </a>
                </h4>
                <p>{author.summary}</p>
                <hr className="mt-4 mb-3" />
                <div className="level">
                  <div className="level-left">
                    <div className="level-item">
                      Connect with us:
                    </div>
                    <div className="level-item">
                      {author?.website &&
                        <ButtonIcon icon={faGlobeAmericas} href={author.website} />
                      }
                      {social.twitter &&
                        <ButtonIcon icon={faTwitter} href={`https://twitter.com/${social.twitter}`} />
                      }
                      {social.facebook &&
                        <ButtonIcon icon={faFacebookSquare} href={`https://facebook.com/${social.facebook}`} />
                      }
                      {social.linkedin &&
                        <ButtonIcon icon={faLinkedin} href={`https://linkedin.com/company/${social.linkedin}`} />
                      }
                      {social.github &&
                        <ButtonIcon icon={faGithub} href={`https://github.com/${social.github}`} />
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}


export default About
