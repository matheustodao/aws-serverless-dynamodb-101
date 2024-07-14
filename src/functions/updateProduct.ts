import { UpdateCommand } from '@aws-sdk/lib-dynamodb';
import type { APIGatewayProxyEventV2 } from 'aws-lambda';
import { dynamoClient } from '../libs/dynamoClient';

export async function handler(event: APIGatewayProxyEventV2) {
  const body =  JSON.parse(event.body as string);
  const productId = event.pathParameters?.productId;

  if (!productId) {
    return {
      statusCode: 404,
      body: {
        error: 'Parameter "productId" must be provide'
      }
    }
  }


  const command = new UpdateCommand({
    TableName: 'ProductsTable',
    Key: {
      id: productId,
    },
    UpdateExpression: 'set #name = :name, #price = :price, #tags = :tags, #in_stock = :in_stock',
    ExpressionAttributeNames: {
      '#name': 'name',
      '#price': 'price',
      '#tags': 'tags',
      '#in_stock': 'in_stock',
    },
    ExpressionAttributeValues: {
      ':name': body.name,
      ':price': body.price,
      ':tags': body.tags,
      ':in_stock': body.inStock,
    }
  })

  await dynamoClient.send(command)

  return {
    statusCode: 204,
  };
};
