'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.logList = async event => {
  try {
    const params = {
      TableName: process.env.DYNAMODB_TABLE,
    };

    const data = await dynamoDb.scan(params).promise();

    console.log(data);

    return {
      statusCode: 200,
      body: JSON.stringify(data.Items)
    };
  } catch (err) {
    console.log(err);

    return {
      statusCode: error.statusCode || 501,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Couldn\'t fetch the todos. Message: ' + err.message
    };
  }
};

module.exports.logDetails = async event => {

  try {

    console.log(event);

    const params = {
      TableName: process.env.DYNAMODB_TABLE,
      Key: {
        id: event.pathParameters.id,
      },
    };
    
    const data = await dynamoDb.get(params).promise();
    
    console.log(data);

    return {
      statusCode: 200,
      body: JSON.stringify(data.Item)
    }
  
  } 
  catch (err) {
    
    console.log(err);
    
    return {
      statusCode: error.statusCode || 501,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Couldn\'t fetch the todos.',
    };
  }

};

module.exports.logCreate = async event => {

  try {
    // Parsing data
    const data = JSON.parse(event.body);
    
    const params = {
      TableName: process.env.DYNAMODB_TABLE,
      Item: data
    };
    
    const result = await dynamoDb.put(params).promise();
    
    console.log('Item created: ', params.Item, ' Data response: ', result);
    
    
    // create a response
    return {
      statusCode: 200,
      body: JSON.stringify(params.Item)
    };
  }
  catch (err) {
    console.log(err);
      
    return {
      statusCode: error.statusCode || 501,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Couldn\'t fetch the todos.',
    };
  }

};

module.exports.logDelete = async event => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Not implemented yet. Do i need it?'
      }
    )
  };
};