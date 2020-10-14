import React from "react"


const Footer = () => {
  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <p>
          Built with <a href="https://www.gatsbyjs.com/"><strong>Gatsby</strong></a>,
          {` `}<a href="https://bulma.io/"><strong>Bulma</strong></a>, and
          {` `}<a href="https://fontawesome.com/"><strong>FontAwesome</strong></a>.
          {` `}<a href="https://github.com/merit-network/merit-network.github.io">Source</a>
          {` `}is <a href="http://opensource.org/licenses/mit-license.php">MIT</a>.
          Content is <a href="http://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>.
        </p>
      </div>
    </footer>
  )
}


export default Footer
