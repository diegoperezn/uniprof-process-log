'use strict';

const uuid = require('uuid');

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.logList = async event => {

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
  };

  return dynamoDb.scan(params).promise()
    .then(data => {
      console.log(data);
      return {
        statusCode: 200,
        body: JSON.stringify(data.Items),
      };
    }).catch(err => {
      console.log(err);
      return {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t fetch the todos.',
      };
  });
};

module.exports.logDetails = async event => {

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
  };

  return dynamoDb.get(params).promise()
    .then(data => {
      console.log(data);
      return {
        statusCode: 200,
        body: JSON.stringify(data.Item),
      };
    }).catch(err => {
      console.log(err);
      return {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t fetch the todos.',
      };
  });
};

module.exports.logCreate = async event => {
  // creation Time
  const timestamp = new Date().getTime();

  // Parsing data
  const data = JSON.parse(event.body);
  
  // if (typeof data.text !== 'string') {
  //   console.error('Validation Failed');
  //   return {
  //     statusCode: 400,
  //     headers: { 'Content-Type': 'text/plain' },
  //     body: 'Couldn\'t create the todo item.',
  //   };
  // }

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: data
  };

  // write the todo to the database
  return dynamoDb.put(params).promise()
    .then(data => {
    
      console.log('Item created: ' + params.Item);

      // create a response
      return {
        statusCode: 200,
        body: JSON.stringify(params.Item),
      };
    }).catch(err => {
      console.error(err);
      
      return {
        statusCode: err.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t create the todo item.',
      };
    });
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