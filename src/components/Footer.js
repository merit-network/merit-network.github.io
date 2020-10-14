import React from 'react'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { useStaticQuery, graphql } from 'gatsby'

import ButtonIcon from 'Components/ButtonIcon'


const Footer = () => {
  const data = useStaticQuery(graphql`
    query FooterQuery {
      site {
        siteMetadata {
          siteRepo
        }
      }
    }
  `)

  const siteRepo = data.site.siteMetadata?.siteRepo

  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <p>
          Built with <a href="https://www.gatsbyjs.com/"><strong>Gatsby</strong></a>,
          {` `}<a href="https://bulma.io/"><strong>Bulma</strong></a>, and
          {` `}<a href="https://fontawesome.com/"><strong>Font Awesome</strong></a>.
          {` `}<a href="https://github.com/merit-network/merit-network.github.io">Source</a>
          {` `}is <a href="http://opensource.org/licenses/mit-license.php">MIT</a>.
          Content is <a href="http://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>.
        </p>
        {siteRepo &&
          <p>
            <ButtonIcon href={siteRepo} icon={faGithub} />
          </p>
        }
      </div>
    </footer>
  )
}


export default Footer
