import type { APIGatewayProxyHandlerV2 } from "aws-lambda";

interface Response {
  message: string;
}

export const handler: APIGatewayProxyHandlerV2<Response> = async () => {
  return {
    message: "Hello world!",
  };
};
