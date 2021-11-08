const AWS = require("aws-sdk");
const crypto = require("crypto");
// var jwt = require('jsonwebtoken');
// Generate unique id with no external dependencies
const generateUUID = () => crypto.randomBytes(16).toString("hex");

// Initialising the DynamoDB SDK
const documentClient = new AWS.DynamoDB.DocumentClient();
// require('dotenv').config();
// const signToken = id => {
//   return jwt.sign({ id }, "secret", {
//     expiresIn: "30s"
//   });
// };

exports.handler = async event => {
  const { id, title } = JSON.parse(event.body);
  const params = {
    TableName: "books", // The name of your DynamoDB table
    Key: {
        id:id
    },
    UpdateExpression: "SET title = :title",
    ExpressionAttributeValues: {
        ":title": title || null,
      },
      ReturnValues: "ALL_NEW",
  };
  // const token = await signToken(params.Item.id);
  try {
    const results = await documentClient.update(params).promise();

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