# Tennis Club API 

Tech test where you are the president of the local Tennis Club. Your responsibilities include managing its players and their rankings. You’ve been asked to prepare a backend API in your preferred programming language that consists a series of endpoints.

- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  * [Setting up MongoDB](#setting-up-mongodb)
- [Endpoints](#endpoints)
    + [Registering a new player into the club](#registering-a-new-player-into-the-club)
    + [Registering a match that has been played](#registering-a-match-that-has-been-played)
    + [Listing all players in the club](#listing-all-players-in-the-club)
    + [Queries](#queries)
- [Tests](#tests)
- [My Approach](#my-approach)
  * [Design](#design)
  * [Errors](#errors)
  * [Endpoints](#endpoints-1)
  * [Code Quality](#code-quality)
  * [Workflow and Process](#workflow-and-process)
  * [Next Steps](#next-steps)

<small><i><a href='http://ecotrust-canada.github.io/markdown-toc/'>Table of contents generated with markdown-toc</a></i></small>


## Tech Stack

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)  ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white) ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)

Dependencies:
```
  "devDependencies": {
    "dotenv": "^16.0.0",
    "jest": "^27.5.1",
    "nodemon": "^2.0.15"
  },
  "dependencies": {
    "express": "^4.17.3",
    "mongoose": "^6.2.4"
  }
```

## Getting Started

Clone this repository:
```
git clone git@github.com:raf-swiderski/tennis-club-api.git
```
Navigate to the root of the project and install the dependencies:
```
cd tennis-club-api
npm i
```

### Setting up MongoDB

Next we need to set up the database locally. This project uses `mongoose`, a dependency which simplifies interacting with MongoDB for our project.
If you don't have MongoDB Community Edition set up (which is the free version), you can install it with Homebrew using the following command in your terminal:
```
brew install mongodb-community@5.0
```
If you're having trouble installing, visit the manual here: 
[docs.mongodb.com/manual/administration/install-community/](https://docs.mongodb.com/manual/administration/install-community/)

Next, we need to access MongoDB in the terminal:
```
mongosh
```
This fires up the MongoDB shell, an environment for interacting with MongoDB deployments.
Next, we need to create a `tennis-club` database:
```
use tennis-club
``` 

We're done with the shell for the moment, but here is more information if needed: 
[docs.mongodb.com/mongodb-shell/run-commands/](https://docs.mongodb.com/mongodb-shell/run-commands/)

Lastly, we need to create a `.env` file which will contain our environment variables. 
```
touch .env
```
In this file, we need to paste in a set of key-value pairs for our project to use:
```
DATABASE_URL=mongodb://localhost/tennis-club
PORT=3000
```
The database url value is telling our project where to establish a connection with MongoDB via Mongoose. 

Leave the mongoDB shell open in a separate terminal window, this is required for our project to access the database. 

Next, start the app by running this in your terminal:
```
npm run devStart
```

Next we can interact with our project at `localhost:3000`, by visiting the endpoints below in our browser: 


## Endpoints

These endpoints allow us create, update and read information on our `tennis-club` database.

#### Registering a new player into the club

Endpoint: `/players/register`

<img width="350" alt="Screenshot 2022-03-14 at 12 12 52" src="https://user-images.githubusercontent.com/76166627/158169736-7ccb38fb-bc1c-4056-8b1d-74ac73adb806.png">

This action creates the following document (entry) in the `players` collection of our `tennis-club` database:

<img width="350" alt="Screenshot 2022-03-14 at 12 15 01" src="https://user-images.githubusercontent.com/76166627/158170082-63aee3bc-0970-45fb-9d39-cab1f92c6164.png">

Please avoid any typos!

Players must be at least 16 to register.

Next, try creating a few more players so you can then register matches that have been played. 

#### Registering a match that has been played

Endpoint: `/matches/update`

<img width="526" alt="Screenshot 2022-03-14 at 12 35 19" src="https://user-images.githubusercontent.com/76166627/158173188-58900d77-9f02-40e2-ae68-7d6c5d7717c4.png">

This action updates the `points`, `rankName` and `gamesPlayed` properties of the specified players. 10% of the loser's points are transferred to the winner.  

The following data should be seen: 

<img width="500" alt="Screenshot 2022-03-14 at 12 39 10" src="https://user-images.githubusercontent.com/76166627/158173780-23de8fb6-2205-49b6-8394-565f2efffa03.png">

#### Listing all players in the club

Endpoint: `/players/all`

This endpoint lists all the players currently at the club, sorted by points (descending). The `Unranked` players (players who have played less than 3 games) appear at the bottom of the list, and are still arranged by points. 

<img width="250" alt="Screenshot 2022-03-14 at 12 46 40" src="https://user-images.githubusercontent.com/76166627/158174897-e9d347a8-d93a-451f-bfb8-9d502ba9b603.png">
  
The endpoint returns the age of each player, and their `seed`, which is their exact position in the points ranking. 


#### Queries:

For this endpoint, you can filter the data that is returned by the `nationality` and `rankName` properties, via the query string. 

For example, if you want to get a list of players with the `United States of America` nationality:

http://localhost:3000/players/all?nationality=United+States+of+America

And a list of players with the `United States of America` nationality who are `'Unranked'`:

http://localhost:3000/players/all?rankName=Unranked&nationality=United+States+of+America


## Tests

This project uses the `jest` testing framework for the unit tests.

To run the tests:
```
npm test
```

## My Approach

### Design

I chose to build this API using Node.js, vanilla JS and HTML.

The endpoints also serve static html files in order to manually test the functionality by posting the player's information, but a frontend dev could just as easily make requests by adding the player names in body of the `req` object in their POST request.  

### Errors

The API sends back an error in the form of a JSON object when the following happens at these routes:

`players/register`: 
- The entered name already exists in the database. 
- The age entered means the player is under the age of 16

`matches/update`:
- One or both of the players entered don't exist on the database. 

### Endpoints

For scalability, the `players/register`&`/all` and `matches/update` endpoints are in separate routing modules. 
The reason is because these endpoints deal with separate concerns - players and matches. Also, because it enables the `matches/update` route to add match details to a separate database collection `matches` if this collection is needed, on top of updating the `players` collection. 
This also would make room for a `matches/all` route, where all matches played are returned. This could then be sorted by queries, to filter the results returned, such as the players involved. 

### Code Quality

- Used OOP principles to ensure my code stayed readable and maintainable.
- Applied the Single Responsibility Principle in keeping functions short and with a clear purpose, e.g. I used a single function to access each `player` from the database, using it multiple times, instead of creating a separate function if I had wanted to retrieve several players.
- Made use of Express middleware to edit the `req` and `res` objects, which made it clear what I was editing and sending back to the frontend.
- While I used the express framework, I manually created routing modules, separating them into `players` and `matches`. 
- I also created a project structure that is easy to understand, for example I separated out my JS functions into a separate `business-logic` file, keeping my `routes` and `model` files separate as well, so that each folders have separate purposes. 

### Workflow and Process

- Made regular git commits to track my project progress.
- Methodically worked through the given criteria: 
    - I started by setting up the routes, html files and database. 
    - Created a mongoose schema / model to add players. 
    - Then moved on to all of the functionality such as `calculatePoints`.
    - Iterating over my code at all of these steps to make sure it was concise and followed OOP principles.
    - Ticking off each requirement to make sure I had them in my app. 
- Used clear commit messages for easy use of the git log.

### Next Steps


- Write tests for the routes, so that I wouldn't have to manually test the app each time. I would use the `chai` test framework for this. 
- Unit test the rest of the business logic with `jest`.
- Add a `matches` collection, to store the details of each match. 
- Set up CI/CD using travis and deploy the app online so people can use it. 


