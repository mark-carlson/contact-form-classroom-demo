# Contact Form

Built with [create-react-app](https://github.com/facebookincubator/create-react-app) and [express](https://expressjs.com/) server for development.

## Features

- Uses Nodemailer to send email with a gmail account.
- React-materialize for UI elements and grid.
- React-sweetalert for email success/failure message.

## Prerequisites

- Must have gmail credentials.
- Enter your email credentials in a .env file:

```
GMAIL_USER=**your_email_address**@gmail.com
GMAIL_PASS=**secret_password_here**
# in PRODUCTION uncomment the line below:
#NODE_ENV=production
```

## Installing

```
npm install
```

To authorize gmail access from Heroku or some other host, visit this site after deployment: [http://www.google.com/accounts/DisplayUnlockCaptcha](http://www.google.com/accounts/DisplayUnlockCaptcha)

## Communication

### Dev

For Development, the webpack-dev-server is running on port 3000 serving react app, and the backend express server is running on port 3001. All of the requests sent by frontend app will be passed to express server via proxy.

Web App <--- Webpack-dev-server <---> Proxy <---> Express Server

### Production

For Production, all the frontend code will be compiled and moved into a static directory inside express server. Now there is just one express server running, which is serving both the frontend app and backend endpoints.

Endpoints <--- Express Server ---> Web App

Nginx proxy should point to `http://localhost:3001`

After deployment to Digital Ocean, email will fail initially.  Check `pm2 logs` to find a link to authorize access.

## Authors

- [**Mark Carlson**](https://mc.dev)

## License

This project is licensed under the MIT License.
