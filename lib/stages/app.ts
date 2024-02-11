import { Construct } from "constructs";

import * as cdk from "aws-cdk-lib";

import { HelloWorldStack } from "#stacks/hello-world.js";

/**
 * Deploy app.
 */
export class AppStage extends cdk.Stage {
  constructor(scope: Construct, id: string, props?: cdk.StageProps) {
    super(scope, id, props);

    // Create hello world API.
    new HelloWorldStack(this, "hello-world");
  }
}
