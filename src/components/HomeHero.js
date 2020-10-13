import React from "react"


export default function HomeHero() {
  /*
  const inlineStyles = {
    backgroundColor: 'transparent',
    backgroundImage: 'url("https://www.merit.edu/wp-content/uploads/2018/01/about_header.png")',
    backgroundSize: 'cover',
  };
  */

  return (
    <section className="hero is-primary is-medium is-centered">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">
            Community + Open Source + Technology
          </h1>
          <h2 className="subtitle">
            Our commitment to paying it forward.
          </h2>
        </div>
      </div>
    </section>
  )
}
