import { PutCommand } from '@aws-sdk/lib-dynamodb';
import type { APIGatewayProxyEventV2 } from 'aws-lambda';
import { randomUUID } from 'node:crypto';
import { dynamoClient } from '../libs/dynamoClient';

export async function handler(event: APIGatewayProxyEventV2) {
  const body =  JSON.parse(event.body as string);

  const id = randomUUID();

  const command = new PutCommand({
    TableName: 'ProductsTable',
    Item: {
      id: id,
      name: body.name,
      price: String(body.price),
      tags: body.tags,
      in_stock: body.inStock,
    }
  });

  const response = await dynamoClient.send(command);

  return {
    statusCode: 201,
    body: JSON.stringify({ response }),
  };
};
