## Schedule Meetings Using Zoom API Integration

### Getting Started

To get a local copy up and running follow these simple steps:

### Prerequisites

- [NodeJS](https://nodejs.org/en/)
- [npm](https://docs.npmjs.com/cli/v8/configuring-npm/install)

### Installation

1. Clone the repo

   ```sh
   git clone https://github.com/AchintyaSpeedlabs/API-Dashboard

   ```

2. In the `server` directory, install required NPM packages

   ```sh
   npm install
   ```

   ```
   npm run devStart
   ```

   This command runs the server at the port 3001. The server will reload if you make edits.

3. In the `client` directory, install required NPM packages
   ```sh
   npm install
   ```
4. In the `client` directory, run:

   ```sh
   npm start
   ```

   This command runs the react app in the development mode. Open http://localhost:3000 to view it in the browser. The server will reload if you make edits. You will also see any lint errors in the console.

### Application Functionalities

1. Create an Instant Zoom Meeting
2. Schedule a Zoom Meeting for later
3. Get a list of all the meetings for an account
4. Get details of any previous meeting using Meeting ID

### Configuration for Environment Variables

#### There are 3 environment variables that you need to configure:

- To use the Zoom API, create a JWT Application on [Zoom App Marketplace](https://marketplace.zoom.us/). Follow the steps mentioned [here](https://marketplace.zoom.us/docs/guides/build/jwt-app/)
- `API Key` and `API Secret` can be obtained from the 'App Credentials' tab

In the `server` directory, create a file named `.env` and set the values for following variables:

1.  **API_KEY**="<Your_API_Key>"
2.  **API_SECRET**="<Your_API_Secret>"
3.  **USER_ID**="<Your_email_Id>"

- Set the value of `USER_ID` to be the Email ID used for account creation on Zoom App Marketplace (Meetings will be scheduled using this Email ID)

### Built With

- [Node.js](https://nodejs.dev/)
- [Express](https://expressjs.com/)
- [Zoom Meeting API](https://marketplace.zoom.us/docs/api-reference/zoom-api/methods/)
- [React](https://reactjs.org/)
- [Material UI](https://mui.com/)
