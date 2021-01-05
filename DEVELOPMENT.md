# Development

Getting started with creating and sharing content for the Merit Network, Inc. technology site

## Quick Start

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

## Windows 10

On Windows 10, we'll make use of GitHub Desktop to manage code and Ubuntu (app) to run our code via Node/NPM.

### Windows 10: Setup

One-time steps to get your Windows 10 environment setup.

1. **Fork Repository**
    1. Open <https://github.com/merit-network/merit-network.github.io>
    1. Near the top right, click "Fork"
        * Learn more at <https://guides.github.com/activities/forking/>
1. **Setup GitHub Desktop and clone code**
    1. Download/install GitHub Desktop from <https://desktop.github.com/>
        * Open, log in, confirm stuff.
    1. Click "Clone a Repository from the Internet..." and select "merit-network.github.io" under "Your Repositories"
        * For "Local path" select your desktop via "Choose..." and click Clone
    1. In "How are you planning to use this fork?" box select "To contribute to the parent project" and click Continue.
1. **Setup Ubuntu (app) and Node/NPM**
    1. Install Ubuntu (app)
        * Start > Microsoft Store > search "Ubuntu" > Click "Ubuntu" > Click "Get"
        * Launch "Ubuntu"
    1. Install NPM/Node (in Ubuntu)
        * Type/paste `sudo apt-get update && sudo apt-get upgrade`
        * Type/paste `curl -sL https://deb.nodesource.com/setup_14.x | sudo bash -`
          * You can copy/paste via normal copy and right-click in Ubuntu
        * Type/paste `sudo apt-get -y install gcc g++ make`
        * Type/paste `sudo apt-get -y install nodejs`
    1. Install NPM/Node packages
        1. Type/paste `cd /mnt/c/Users/<you>/Desktop/merit-network.github.io`
            * If you aren't sure of your user name (folder) enter `cd /mnt/c/Users` and hit TAB to see choices.
            * If you cloned the code to a different location, you'll need to use a different path.
        1. Type/paste `npm install`

### Windows 10: Edit, Run, Publish

1. **Run code**
    1. In Ubuntu (app), type/paste `cd /mnt/c/Users/<you>/Desktop`
        * If you aren't sure of your user name (folder) enter `cd /mnt/c/Users` and hit TAB to see choices.
        * If you cloned the code to a different location, you'll need to use a different path.
    1. Type/paste `npm run develop`
    1. In a web browser, open <http://localhost:8000>
1. **Edit code**
    1. In Windows Explorer, open Desktop > merit-network.github.io > content > blog
    1. Add a new folder for your blog post or copy/paste "hello-world" and rename things.
    1. Edit "index.md" in a text editor
        * We recommend VS Code from <https://code.visualstudio.com/>
    1. As you make changes, save the file(s) and <http://localhost:8000> will automatically refresh!
1. **Publish code**
    1. **WARNING**: in Windows, the "package-lock.json" gets modified and we do not want those changes!
        * Right-click on "package-lock.json" and select "Discard Changes"
    1. Select file(s), add a description (commit message) and click "Commit to main"
    1. Repository (menu) > Push
    1. Branch (menu) > Create Pull Request
        * Learn more at <https://guides.github.com/activities/forking/>
1. **Advanced**
    1. See additional (optional!) clean/build commands under **Quick Start** above.

## macOS 10/11

On macOS 10/11, we'll make use of GitHub Desktop to manage code and Terminal.app and Homebrew to run our code via Node/NPM.

### macOS 10/11: Setup

One-time steps to get your macOS 10/11 environment setup.

1. **Fork Repository**
    1. Open <https://github.com/merit-network/merit-network.github.io>
    1. Near the top right, click "Fork"
        * Learn more at <https://guides.github.com/activities/forking/>
1. **Setup GitHub Desktop and clone code**
    1. Download/install GitHub Desktop from <https://desktop.github.com/>
        * Open, log in, confirm stuff.
    1. Click "Clone a Repository from the Internet..." and select "merit-network.github.io" under "Your Repositories"
        * For "Local path" select your desktop via "Choose..." and click Clone
    1. In "How are you planning to use this fork?" box select "To contribute to the parent project" and click Continue.
1. **Setup Terminal.app and Node/NPM**
    1. Download and install <https://nodejs.org/dist/v14.15.1/node-v14.15.1.pkg>
    1. Install NPM/Node packages
        1. Open Applications > Terminal.app
        1. Type/paste `cd /Users/<you>/Desktop`
            * If you aren't sure of your user name (folder) enter `cd /Users` and hit TAB to see choices.
            * If you cloned the code to a different location, you'll need to use a different path.
        1. Type/paste `npm install`

### macOS 10/11: Edit, Run, Publish

1. **Run code**
    1. In Terminal, type/paste `cd /Users/<you>/Desktop`
        * If you aren't sure of your user name (folder) enter `cd /Users` and hit TAB to see choices.
        * If you cloned the code to a different location, you'll need to use a different path.
    1. Type/paste `npm run develop`
    1. In a web browser, open <http://localhost:8000>
1. **Edit code**
    1. In Finder, open Desktop > merit-network.github.io > content > blog
    1. Add a new folder for your blog post or copy/paste "hello-world" and rename things.
    1. Edit "index.md" in a text editor
        * We recommend VS Code from <https://code.visualstudio.com/>
    1. As you make changes, save the file(s) and <http://localhost:8000> will automatically refresh!
1. **Publish code**
    1. Select file(s), add a description (commit message) and click "Commit to main"
    1. Repository (menu) > Push
    1. Branch (menu) > Create Pull Request
        * Learn more at <https://guides.github.com/activities/forking/>
1. **Advanced**
    1. See additional (optional!) clean/build commands under **Quick Start** above.
