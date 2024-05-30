require("dotenv").config();
const { Route53Client } = require("@aws-sdk/client-route-53");

const client = new Route53Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  region: process.env.AWS_REGION,
});

module.exports = client;
