# focustube

YouTube is a fantastic learning resource, but ads and recommendations via the algorithm get in the way of productivity on the main site. Focustube uses the YouTube API from a React site with the intention of watching what you want and moving on with your life.

> Note: Ads still exist in the IFrame objects of the videos when being watched, this is part of what the API injects when you use it to embed videos; may be mitigated by local ad blockers.

## Tools

Focustube is pretty much built on vanilla React. A few utility libraries like react-bootstrap and gh-pages help with some visuals and posting it publically, but overall the project is uncomplicated and easy to build.

Clone the project: `git clone https://github.com/wtraceyv/focustube.git`

Make sure you have `npm` installed and run `npm install` to install dependencies.

To test on localhost: `npm start` in the project directory

To deploy to GitHub Pages, replace the "homepage" parameter in `package.json` with your username and repo name on GitHub, then run `npm run deploy`

## API Key

This app uses a YouTube Data API v3 key to make searches and grab next/previous pages, and it is hardcoded in under the `apiSearch` function in `App.jsx`. If you want to generate your own key so you are not beholden to my quota, do so through google and replace the key parameter in the `const params` variable and voila.

<hr>

- [Now posted on my GitHub Pages](https://wtraceyv.github.io/focustube/)

- [Trello Issue Tracking](https://trello.com/b/gtto8Vpo/focustube)

- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

- Intended as practice/showcasing React, the quota limit for YouTube Data API searches is limited for my key. You may generate your own to extend the quota.
