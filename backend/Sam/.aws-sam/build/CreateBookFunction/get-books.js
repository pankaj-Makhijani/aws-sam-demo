const AWS = require("aws-sdk");
const documentClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async event => {
  const params = {
    TableName: "books" // The name of your DynamoDB table
  };
  try {
    // Utilising the scan method to get all items in the table
    const data = await documentClient.scan(params).promise();
    const response = {
      statusCode: 200,
      headers: {
        "X-Requested-With": '*',
        "Access-Control-Allow-Headers": 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,x-requested-with',
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": 'POST,GET,OPTIONS'
      },
      body: JSON.stringify(data.Items)
    };
    return response;
  } catch (e) {
    return {
      statusCode: 500
    };
  }
};