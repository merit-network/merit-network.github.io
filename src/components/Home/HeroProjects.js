import React from "react"


export default function HeroProjects() {
  /*
  const inlineStyles = {
    backgroundColor: 'transparent',
    backgroundImage: 'url("https://www.merit.edu/wp-content/uploads/2018/01/about_header.png")',
    backgroundSize: 'cover',
  };
  */

  return (
    <section className="hero is-light">
      <div className="hero-body">
        <div className="container has-text-centered">
          <div className="columns">
            <div className="column">
              <h2 className="title is-3">Explore Projects</h2>
              <div className="field">
                <div className="control">
                  <a href="https://github.com/merit-network" className="button is-primary">
                    View All Projects
                  </a>
                </div>
              </div>
            </div>
            <div className="column">
              <h2 className="title is-3">Join Our Team</h2>
              <div className="field">
                <div className="control">
                  <a href="https://www.merit.edu/about/careers/" className="button is-primary">
                    View Careers
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
