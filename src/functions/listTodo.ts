import { APIGatewayProxyHandler } from 'aws-lambda';
import { document } from '../utils/dynamodbClient';

export const handler: APIGatewayProxyHandler = async (event) => {
  const { userid } = event.pathParameters;

  const response = await document
    .query({
      TableName: 'todo',
      KeyConditionExpression: 'user_id = :id',
      ExpressionAttributeValues: {
        ':id': userid,
      },
    })
    .promise();

  const todoUser = response.Items;

  return {
    statusCode: 200,
    body: JSON.stringify(todoUser),
  };
};
