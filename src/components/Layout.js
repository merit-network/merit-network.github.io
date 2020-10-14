import React from 'react'

import Footer from 'Components/Footer'
import NavBar from 'Components/NavBar'


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
