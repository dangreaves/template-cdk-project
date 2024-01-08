import * as cdk from "aws-cdk-lib";

import { HelloWorldApi } from "@/lib/constructs/hello-world-api.js";

export class HelloWorldStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new HelloWorldApi(this, "HelloWorldApi", {});
  }
}
