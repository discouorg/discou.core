const express = require("express");
const ParseServer = require('parse-server').ParseServer;
const ParseDashboard = require('parse-dashboard');
const logger = require("morgan");
const config = require('dotenv').config();
const port = process.env.PORT || 3000;
const app = express();
app.use(logger("combined"));

const dashboard = new ParseDashboard({
  "apps": [
    {
      "serverURL": process.env.serverURL,
      "appId": process.env.appId,
      "appName": process.env.serverURL,
      "masterKey": process.env.masterKey
    }
  ],
  "users": [
  	{
      "user": process.env.dashboardLogin,
      "pass": process.env.dashboardPassword
  	} 	
  ]
}, { allowInsecureHTTP: true });


const api = new ParseServer({
  databaseURI: process.env.databaseURI,
  appId: process.env.appId,
  appName: process.env.appName,
    emailAdapter: {
      module: '@parse/simple-mailgun-adapter',
      options: {
        // The address that your emails come from
        fromAddress: process.env.fromEmailAddr,
        // Your domain from mailgun.com
        domain: process.env.EmailDomain,
        // Your API key from mailgun.com
        apiKey: process.env.mailgunApiKey,
      }
    },
  serverURL: process.env.serverURL,
  masterKey: process.env.masterKey
});
app.use('/parse', api);
app.use('/dashboard', dashboard);

app.listen(port);
