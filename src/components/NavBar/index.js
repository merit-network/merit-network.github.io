import React from "react"
import { useRef } from 'react';
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from "gatsby"

import Logo from '../../../content/assets/logo.svg';


const NavBar = () => {
  const burger = useRef();
  const menu = useRef();

  const menuToggle = (evt) => {
    evt.preventDefault();
    burger.current.classList.toggle('is-active');
    menu.current.classList.toggle('is-active');
  };

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
          onClick={menuToggle}
          ref={burger}
          role="button"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div className="navbar-menu" ref={menu}>
        <div className="navbar-start">
          <Link to="/" className="navbar-item">Open Source and Technology</Link>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <a className="button is-light is-small" href="https://github.com/merit-network">
                <FontAwesomeIcon icon={faGithub} className="mr-1" />
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


export default NavBar
