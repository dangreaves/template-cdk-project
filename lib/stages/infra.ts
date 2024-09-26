import { Construct } from "constructs";

import * as cdk from "aws-cdk-lib";

import { VpcStack } from "#/stacks/vpc.js";

/**
 * Deploy infrastructure resources.
 */
export class InfraStage extends cdk.Stage {
  constructor(scope: Construct, id: string, props?: cdk.StageProps) {
    super(scope, id, props);

    // Create VPC.
    new VpcStack(this, "vpc");
  }
}
