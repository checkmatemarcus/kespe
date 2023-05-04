# Kespe.no
A webapp utilizing [riots league API](https://developer.riotgames.com/) in order to display game stats and facts. Built with [NextJS](https://nextjs.org/docs/), [Tailwind](https://tailwindui.com/) and [MongoDB](https://www.mongodb.com/atlas/database). 

![image](https://user-images.githubusercontent.com/22197324/236323700-66620622-570b-44e7-9cf6-e6364145f574.png)


## Quickstart

In order to start developing follow the below steps.

### Pre-requisites

You will need [Node (LTS)](https://nodejs.org/en/download) in order to install deps, and run the project locally. You also need to store credentials locally in an `.env.local` file, in order to communicate with riot games API and the Mongo database.


```js
// Example contents of your .env.local file. Contact repo owner for credentials.
API_KEY={riot games api key}
MONGO_URI={mongoDB connection string}
```

1. Clone the repo using `git clone git@github.com:checkmatemarcus/kespe.git`
2. Install deps. `npm i`
3. Run dev server `npm run dev`

..visit [http://localhost:3000](http://localhost:3000) to see the result and start developing.

## Deployment

When you push a new commit to any branch to this repo on, you initiate a deployment via Vercel to a test environment.

### Prod

In order to deploy directly to www.kespe.no (prod environment) you push have to merge a feature branch into main.
