import { Construct } from "constructs";

import * as cdk from "aws-cdk-lib";

import { HelloWorldApi } from "#constructs/hello-world-api.js";

export class HelloWorldStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new HelloWorldApi(this, "HelloWorldApi", {});
  }
}
