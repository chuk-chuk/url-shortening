# URL shortening service

A simple full-stack application that provides URL shortening functionality.
The server is connecting the frontend, the database by providing a REST API using Express, and persisting to MongoDB using Mongoose.
The frontend part of the application is bootstrapped with Create React App and uses a Node driven REST API on the server side. The code is written in Typescript.

Functionality:

A user can enter a long URL (for example, www.google.com/games.com) and they will get an 8 character (lowercase-alphanumeric) shortened version of the URL (https://random.io/f3x2ab1c).
URLs are shortened and persisted into the database.
In the browser a list of previously shortened URLs is displayed.
By clicking the button "generate" new urls are added to the list.
The same 8-characters cannot be used twice i.e. each shortened URL needs to be unique. Neither the the same long URL can be used.
The shortened URL do not redirect, they are dummy.

Technology used:

- React
- Typescript
- Tailwind
- Node
- Express
- MongoDB
- Mongoose
- react-resting-library, Jest

## Project setup

Clone down this repository.
In the project directory, you can need:

### Setup local server

- Make sure that you have Node and npm installed globally on your machine
- Navigate to the server directory `cd server`
- Install all dependencies run `npm i`
- Create environment variables file at the root level `touch .env` and add the following using your own credentials.

```
PORT=8000,
MONGO_URI=mongodb+srv://name:password@clusterX.mongodb.net/test?retryWrites=true&w=majority,
MONGO_TEST_URI=mongodb+srv://name:password@clusterX.mongodb.net/develop?retryWrites=true&w=majority
```

- Start the server locally `npm run start`
- You can test the Mongoose model by running the server and sending requests to GET/POST endpoints using tools like Postman.

Testing can be run using the following command
`npm run test` or in the interactive mode `npm run test:watch`

- Tests are run against `develop` database.

### Setup local client

- Navigate to the front-end directory `cd front-end`
- Runs the app in the development mode `npm run start`
- Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Testing can be run using the following command `npm run test`

- Launches the test runner in the interactive watch mode.
