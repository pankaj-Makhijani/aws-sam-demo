const AWS = require("aws-sdk");
const crypto = require("crypto");
const bodyParser=require('body-parser');
// var jwt = require('jsonwebtoken');
// Generate unique id with no external dependencies
const generateUUID = () => crypto.randomBytes(16).toString("hex");

// Initialising the DynamoDB SDK
const documentClient = new AWS.DynamoDB.DocumentClient();
// require('dotenv').config('./.env');
// const signToken = id => {
//   return jwt.sign({ id }, "secret", {
//     expiresIn: "30s"
//   });
// };

exports.handler = async event => {
  const id = event.queryStringParameters.id;
  
  console.log(event)
  const params = {
    TableName: "books", // The name of your DynamoDB table
    Key: {
        id:id
    },
  };
  // const token = await signToken(params.Item.id);
  try {
    const results = await documentClient.delete(params).promise();

    return {
      statusCode: 200,
      headers: { 
        "Access-Control-Allow-Origin": '*',
      },
      body: JSON.stringify(results.Attributes),
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify(e)
    };
  }
};