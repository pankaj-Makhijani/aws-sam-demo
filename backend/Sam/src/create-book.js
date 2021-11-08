const AWS = require("aws-sdk");
const crypto = require("crypto");
var jwt = require('jsonwebtoken');
// Generate unique id with no external dependencies
const generateUUID = () => crypto.randomBytes(16).toString("hex");

// Initialising the DynamoDB SDK
const documentClient = new AWS.DynamoDB.DocumentClient();
require('dotenv').config('./.env');
const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "90d"
  });
};

exports.handler = async event => {
  const { title } = JSON.parse(event.body);
  const params = {
    TableName: "books", // The name of your DynamoDB table
    Item: { // Creating an Item with a unique id and with the passed title
      id: generateUUID(),
      title: title
    }
  };
  const token = await signToken(params.Item.id);
  try {
    // Utilising the put method to insert an item into the table (https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.NodeJs.03.html#GettingStarted.NodeJs.03.01)
    const data = await documentClient.put(params).promise();
    const response = {
      statusCode: 200,
      headers: { 
        "Access-Control-Allow-Origin" : "*",
        "Set-Cookie": token 
      },
      // "headers": { "Set-Cookie": params.Item.id },
      body: JSON.stringify(data)
    };
    return response; // Returning a 200 if the item has been inserted 
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify(e)
    };
  }
};