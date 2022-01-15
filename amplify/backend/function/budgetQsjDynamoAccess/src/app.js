/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_BUDGETQSJDYNAMO_ARN
	STORAGE_BUDGETQSJDYNAMO_NAME
Amplify Params - DO NOT EDIT */

const express = require("express");
const bodyParser = require("body-parser");
const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
const getPhotos = require("./getPhotos");
const mailchimp = require("@mailchimp/mailchimp_marketing");

// declare a new express app
const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

/**********************
 * Example get method *
 **********************/

app.get("/photos", function (req, res) {
  getPhotos()
    .then((photos) => {
      res.json({ photos });
    })
    .catch((e) => {
      res.status(500);
      res.send();
    });
  // Add your code here
});

app.get("/photos/:albumId", function (req, res) {
  const { albumId } = req.params;
  getPhotos(albumId)
    .then((photos) => {
      res.json({ photos });
    })
    .catch((e) => {
      res.status(500);
      res.send();
    });
});

/****************************
 * Example post method *
 ****************************/

function id() {
  return Date.now().toString();
}

app.post("/photos", async function (req, res) {
  var params = {
    TableName: process.env.STORAGE_BUDGETQSJDYNAMO_NAME,
    Item: {
      id: id(),
      ...req.body,
    },
  };
  mailchimp.setConfig({
    apiKey: process.env.MAILCHIMP_API,
    server: process.env.MAILCHIMP_SERVER,
  });
  const listId = process.env.MAILCHIMP_LISTID;
  const subscribingUser = {
    firstName: req.body.name,
    email: req.body.email,
    eventType: req.body.eventType,
    phone: req.body.phone,
    quantity: req.body.quantity,
  };

  try {
    await mailchimp.lists.addListMember(listId, {
      email_address: subscribingUser.email,
      status: "subscribed",
      merge_fields: {
        FNAME: subscribingUser.firstName,
        PHONE: subscribingUser.phone,
        EVENT: subscribingUser.eventType,
        QUANTITY: subscribingUser.quantity,
      },
    });
  } catch (error) {
    console.error;
  }

  docClient.put(params, function (err, data) {
    if (err) res.json({ err });
    else res.json({ success: "Solicitud creada exitosamente!", data });
  });
});

app.post("/photos/*", function (req, res) {
  // Add your code here
  res.json({ success: "post call succeed!", url: req.url, body: req.body });
});

/****************************
 * Example put method *
 ****************************/

app.put("/photos", function (req, res) {
  // Add your code here
  res.json({ success: "put call succeed!", url: req.url, body: req.body });
});

app.put("/photos/*", function (req, res) {
  // Add your code here
  res.json({ success: "put call succeed!", url: req.url, body: req.body });
});

/****************************
 * Example delete method *
 ****************************/

app.delete("/photos", function (req, res) {
  // Add your code here
  res.json({ success: "delete call succeed!", url: req.url });
});

app.delete("/photos/*", function (req, res) {
  // Add your code here
  res.json({ success: "delete call succeed!", url: req.url });
});

app.listen(3000, function () {
  console.log("App started");
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
