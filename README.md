## API Dashboard

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
   npm start
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

---

#### Meetings Dashboard

1. Create an Instant Zoom Meeting
2. Schedule a Zoom Meeting for later
3. Get a list of all the meetings for an account
4. Get a list of all the cloud recordings for an account (Licensed Accounts)
5. Get cloud recordings of any previous meeting using Meeting ID (Licensed Accounts)

#### Mails Dashboard

1. Add the list of users to the mailing list (named `Audience` on Mailchimp) via uploading an Excel File in the following format:

- Columns Names: **First Name**, **Last Name**, **Email**.
- A Sample Example:

  | First Name | Last Name | Email                     |
  | ---------- | --------- | ------------------------- |
  | Sheldon    | Cooper    | sheldoncooper@caltech.com |
  | Ginevra    | Weasley   | ginerva@hogwarts.com      |
  | Arya       | Stark     | arya@amail.com            |
  | Harvey     | Specter   | harveyy@nyu.com           |
  | Andrew     | Bernard   | andy@cornell.com          |

2. Send an instant mail to the users in the mailing list (named `Audience` on Mailchimp)

### Configuration for Environment Variables

---

#### For Meetings Dashboard: There are 3 environment variables that you need to configure:

- To use the Zoom API, create a JWT Application on [Zoom App Marketplace](https://marketplace.zoom.us/). Follow the steps mentioned [here](https://marketplace.zoom.us/docs/guides/build/jwt-app/)
- `API Key` and `API Secret` can be obtained from the 'App Credentials' tab

In the `server` directory, create a file named `.env` and set the values for following variables:

1.  **ZOOM_API_KEY**="<Your_API_Key>"
2.  **ZOOM_API_SECRET**="<Your_API_Secret>"
3.  **ZOOM_USER_ID**="<Your_email_Id>"

- Set the value of `USER_ID` to be the Email ID used for account creation on Zoom App Marketplace (Meetings will be scheduled using this Email ID)

#### For Mails Dashboard: There are 5 environment variables that you need to configure:

In the project root directory, create a file named `.env` and set the values for following variables:

1.  #### **MAILCHIMP_AUDIENCE_ID**="<Your_Audience_ID>"

    You can find the `List ID` (Now named as `Audience ID`) where you wish to import the email IDs of the users from the excel sheet on Mailchimp as shown [here](https://mailchimp.com/help/find-audience-id/)

2.  #### **MAILCHIMP_SERVER_PREFIX**="usX"

    The server prefix (In the format of us1, us2, us16 etc) can be determined from the URL shown at your Mailchimp Dashboard.
    For example, if the URL is as follows: `https://us6.admin.mailchimp.com/` In this case, the server prefix would be `us6`

3.  #### **MAILCHIMP_API_KEY**="<Your_API_Key>"

    You can create an API Key for your account following the steps shown [here](https://mailchimp.com/help/about-api-keys/)

4.  #### **MAILCHIMP_EMAIL**="<Your_Email_Id>"

    Set the value of `EMAIL` to be the same as used for Mailchimp Account creation (Mails will be sent using this Email ID)

5.  #### **MAILCHIMP_FROM_NAME**="<Your_Name>"
    Set the value of `FROM_NAME` to a name that would be displayed to the email receivers

### Built With

- [Node.js](https://nodejs.dev/)
- [Express](https://expressjs.com/)
- [Zoom Meeting API](https://marketplace.zoom.us/docs/api-reference/zoom-api/methods/)
- [Mailchimp API](https://mailchimp.com/developer/)
- [React](https://reactjs.org/)
- [Material UI](https://mui.com/)
