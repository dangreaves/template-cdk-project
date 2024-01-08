#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";

// import { VpcStack } from "@/lib/stacks/vpc.js";
import { HelloWorldStack } from "@/lib/stacks/hello-world.js";

const app = new cdk.App();

// @todo Set your account ID and region here.
const env: cdk.Environment = {
  account: "123456789",
  region: "ap-southeast-2",
};

// Uncomment this if you need a VPC.
// const { vpc } = new VpcStack(app, "vpc", { env });

new HelloWorldStack(app, "hello-world", { env });
