# Merit Network, Inc. Open Source and Technology

Open source and technology site for Merit Network, Inc.

# Development

_For detailed directions, please checkout out [DEVELOPMENT.md](DEVELOPMENT.md)._

Assuming you're comfortable with Git and have Node/NPM installed, clone/fork the repo then:

```bash
# Change into local copy
cd merit-network.github.io

# Install dependencies
npm install

# Run development
npm run develop

# (OPTIONAL) Clean local; helps if develop isn't "working"
npm run clean

# (OPTIONAL) Run a local build
npm run build
```

The site is now running at `http://localhost:8000`! Make changes locally, then push to your branch/fork and [open a PR](https://github.com/merit-network/merit-network.github.io/compare).

You can also browse GraphQL at `http://localhost:8000/__graphql`.

# Deployment

Deploys are handled automatically by GitHub Actions whenever a branch or PR is merged and visible at <https://merit-network.github.io/>. After a deploy runs, please allow a minute or two for GitHub Pages to catch up.

When you open a PR a preview will be automatically created and shared in as a PR comment.

# Upgrading

Follow directions at [Upgrade for Minor or Patch Releases](https://www.gatsbyjs.com/docs/upgrade-gatsby-and-dependencies/) and test your updates locally by running `npm run develop` and `npm run build`.

# Contributing

We accept community contributions! For details, please see [CONTRIBUTING.md](CONTRIBUTING.md)

# Acknowledgements

* [Bulma](https://bulma.io/)
* [FontAwesome](https://fontawesome.com/)
* [Gatsby Starter Blog](https://github.com/gatsbyjs/gatsby-starter-blog)
* [Gatsby](https://www.gatsbyjs.com/)
* [Source](https://github.com/merit-network/merit-network.github.io)

# License

[MIT License](LICENSE)
