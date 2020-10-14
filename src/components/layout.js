import React from "react"

import Footer from './Footer'
import NavBar from './NavBar'


const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <NavBar />
      <main role="main">{children}</main>
      <Footer />
    </div>
  )
}


export default Layout
