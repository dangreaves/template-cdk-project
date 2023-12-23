import * as cdk from "aws-cdk-lib";

import { HelloWorldApi } from "./hello-world-api/hello-world-api.js";

export class HelloWorldStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new HelloWorldApi(this, "HelloWorldApi", {});
  }
}
