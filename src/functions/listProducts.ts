import { ScanCommand } from '@aws-sdk/lib-dynamodb'
import type { APIGatewayProxyEventV2 } from 'aws-lambda';
import { dynamoClient } from '../libs/dynamoClient';

export async function handler(event: APIGatewayProxyEventV2) {
  const command = new ScanCommand({ TableName: 'ProductsTable' });

  const response = await dynamoClient.send(command);

  return {
    statusCode: 200,
    body: JSON.stringify({
      total: response.Count,
      products: response.Items,
    })
  };
};
