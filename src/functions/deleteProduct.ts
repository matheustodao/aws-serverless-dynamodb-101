import { DeleteCommand } from '@aws-sdk/lib-dynamodb'
import type { APIGatewayProxyEventV2 } from 'aws-lambda';
import { dynamoClient } from '../libs/dynamoClient';

export async function handler(event: APIGatewayProxyEventV2) {
  const productId = event.pathParameters?.productId;

  const command = new DeleteCommand({
    TableName: 'ProductsTable',
    Key: {
      id: productId
    }
  })

  await dynamoClient.send(command);

  return {
    statusCode: 204
  };
};
