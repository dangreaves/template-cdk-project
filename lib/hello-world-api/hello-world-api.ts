import { Construct } from "constructs";

import * as lambda from "aws-cdk-lib/aws-lambda";
import * as nodejs from "aws-cdk-lib/aws-lambda-nodejs";
import * as apigateway from "aws-cdk-lib/aws-apigatewayv2";
import * as integrations from "aws-cdk-lib/aws-apigatewayv2-integrations";

export interface HelloWorldApiProps {
  //
}

export class HelloWorldApi extends Construct {
  protected readonly handler: lambda.Function;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(scope: Construct, id: string, _props: HelloWorldApiProps) {
    super(scope, id);

    // Create lambda handler for hello world response.
    const handler = new nodejs.NodejsFunction(this, "Handler", {
      entry: "lib/hello-world-api/hello-world-handler.ts",
    });

    // Create integration to connect with lambda.
    const integration = new integrations.HttpLambdaIntegration(
      "HttpLambdaIntegration",
      handler,
    );

    // Create HTTP API.
    const api = new apigateway.HttpApi(this, "HttpApi");

    // Add hello world integration at root path.
    api.addRoutes({
      path: "/",
      integration,
      methods: [apigateway.HttpMethod.GET],
    });

    // Exports.
    this.handler = handler;
  }
}
