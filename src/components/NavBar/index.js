import React from "react"
import { Link } from "gatsby"

import Logo from '../../../content/assets/logo.svg';



export default class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.burger = React.createRef();
    this.menu = React.createRef();
    this.toggle = this.toggle.bind(this);
  }

  toggle(evt) {
    evt.preventDefault();
    this.burger.current.classList.toggle('is-active');
    this.menu.current.classList.toggle('is-active');
  }

  render() {
    return (
      <nav className="navbar is-white is-spaced" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item">
            <Logo width="93" height="30" />
          </Link>

          <a
            aria-expanded="false"
            aria-label="menu"
            className="navbar-burger burger"
            href="/"
            onClick={this.toggle}
            ref={this.burger}
            role="button"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div className="navbar-menu" ref={this.menu}>
          <div className="navbar-start">
            <Link to="/" className="navbar-item">Open Source and Technology</Link>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <a className="button is-light is-small" href="https://github.com/merit-network">
                  GitHub
                </a>
                <a className="button is-primary is-small" href="https://www.merit.edu">
                  Main Site
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}
