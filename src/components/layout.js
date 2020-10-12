import React from "react"

import Footer from './Footer'
import NavBar from './NavBar'


const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <NavBar />
      <section class="section">
        <div class="container">
          <main>{children}</main>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default Layout
