import { APIGatewayProxyHandler } from 'aws-lambda';
import { document } from '../utils/dynamodbClient';
import { v4 as uuidv4 } from 'uuid';

interface TodoCreateParams {
  title: string;
  deadline: string;
}

export const handler: APIGatewayProxyHandler = async (event) => {
  const { userid } = event.pathParameters;
  const { title, deadline } = JSON.parse(event.body) as TodoCreateParams;

  const data = {
    id: uuidv4(), // id gerado para garantir um único todo com o mesmo id
    user_id: userid, // id do usuário recebido no pathParameters
    title,
    done: false, // inicie sempre como false
    deadline: new Date(deadline),
  };

  await document
    .put({
      TableName: 'todo',
      Item: data,
    })
    .promise();

  return {
    statusCode: 201,
    body: JSON.stringify({
      message: `Todo created! ID: ${data.id}`,
    }),
  };
};
